function getColorCategory(r, g, b) {
    if (r > g && r > b) return 'Red';
    if (g > r && g > b) return 'Green';
    if (b > r && b > g) return 'Blue';
    if (r > 200 && g > 200 && b < 100) return 'Yellow'; 
    if (r > 200 && b < 100 && g < 100) return 'Orange'; 
    if (r < 100 && g < 100 && b > 200) return 'Purple'; 
    if (r > 200 && g > 200 && b > 200) return 'White'; 
    return 'Other'; 
}
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
                    if (alpha > 0 && (r + g + b) > 150) {
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
                    .sort((a, b) => b.category.localeCompare(a.category)); 
                if (sortedColors.length === 0) {
                    sortedColors.push({ color: '#000000', category: 'Black' }); 
                }
                displayColors(sortedColors.slice(0, 5));
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}
function displayColors(colors) {
    const colorContainer = document.getElementById('colorContainer');
    colorContainer.innerHTML = '';
    colors.forEach(entry => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = entry.color;
        colorDiv.style.height = '20px';
        colorDiv.style.width = '100%';
        colorDiv.style.margin = '5px 0';
        colorDiv.textContent = `Color: ${entry.color}`;
        colorDiv.style.cursor = 'default'; 
        colorDiv.addEventListener('click', function(event) {
            event.stopPropagation(); 
        });
        colorContainer.appendChild(colorDiv);
    });
}
document.body.addEventListener('click', function() {
    document.getElementById('uploadImage').click();
});
document.getElementById('uploadImage').addEventListener('change', function(event) {
    let file = event.target.files[0];
    processImage(file);
});
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
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        window.location.href = 'index.html';
    }
});