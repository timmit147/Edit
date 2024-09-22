// Function to determine color category based on RGB values
function getColorCategory(r, g, b) {
    if (r > g && r > b) return 'Red';
    if (g > r && g > b) return 'Green';
    if (b > r && b > g) return 'Blue';
    if (r > 200 && g > 200 && b < 100) return 'Yellow'; // Bright yellow
    if (r > 200 && b < 100 && g < 100) return 'Orange'; // Bright orange
    if (r < 100 && g < 100 && b > 200) return 'Purple'; // Bright purple
    if (r > 200 && g > 200 && b > 200) return 'White'; // White
    if (r < 100 && g < 100 && b < 100) return 'Black'; // Black
    return 'Other'; // Catch-all for anything else
}

// Function to handle image processing (extracting top color categories)
function processImage(file) {
    if (file && (file.type.startsWith('image/'))) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;

                let colorData = {};

                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];
                    let alpha = data[i + 3];

                    if (alpha > 0 && (r + g + b) > 300) { // Filter darker colors
                        let category = getColorCategory(r, g, b);

                        if (!colorData[category]) {
                            colorData[category] = { count: 0, rSum: 0, gSum: 0, bSum: 0 };
                        }

                        colorData[category].count++;
                        colorData[category].rSum += r;
                        colorData[category].gSum += g;
                        colorData[category].bSum += b;
                    }
                }

                let sortedColors = Object.entries(colorData)
                    .map(([key, value]) => {
                        let avgR = Math.round(value.rSum / value.count);
                        let avgG = Math.round(value.gSum / value.count);
                        let avgB = Math.round(value.bSum / value.count);
                        let avgHex = `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`;
                        return { color: avgHex, category: key };
                    })
                    .sort((a, b) => b.category.localeCompare(a.category)) // Sort by category name
                    .slice(0, 5); // Get top 5 color categories

                displayColors(sortedColors);
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}

// Function to display colors below the h2 element
function displayColors(colors) {
    const colorContainer = document.getElementById('colorContainer');
    
    // Clear previous colors
    colorContainer.innerHTML = '';

    colors.forEach(entry => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = entry.color;
        colorDiv.style.padding = '10px';
        colorDiv.style.width = '100%';
        colorDiv.style.margin = '5px 0';
        colorDiv.textContent = `Color: ${entry.color}`;
        colorDiv.style.cursor = 'default'; // Prevent pointer cursor

        // Prevent opening file dialog when clicking on color blocks
        colorDiv.addEventListener('click', function(event) {
            event.stopPropagation(); // Stop the event from bubbling up
        });

        colorContainer.appendChild(colorDiv);
    });
}

// Handle click-to-upload
document.body.addEventListener('click', function() {
    document.getElementById('uploadImage').click();
});

document.getElementById('uploadImage').addEventListener('change', function(event) {
    let file = event.target.files[0];
    processImage(file);
});

// Handle drag-and-drop
document.body.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.body.addEventListener('drop', function(event) {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    processImage(file);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const popup = document.getElementById('colorPopup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
});


