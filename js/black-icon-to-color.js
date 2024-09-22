// Function to handle image processing (change color based on user input)
function processImage(file) {
    // Only process image files
    if (file && file.type.startsWith('image/')) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                // Create a canvas to draw the image
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Ask user for a color to change to, with black as the default
                let color = prompt("Enter a color to change the image to (e.g., 'red', 'green', 'blue', '#FFFFFF', 'black'):", 'black') || 'black';
                let rgbColor = getColorRGB(color);

                if (rgbColor) {
                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let data = imageData.data;

                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = rgbColor.r;     // Red
                        data[i + 1] = rgbColor.g; // Green
                        data[i + 2] = rgbColor.b; // Blue
                        // Alpha (data[i + 3]) remains unchanged
                    }

                    ctx.putImageData(imageData, 0, 0);

                    // Create a download link for the modified image, keeping the original format
                    let link = document.createElement('a');
                    link.href = canvas.toDataURL(file.type); // Keep the original format
                    link.download = file.name.replace(/\.(jpeg|jpg|png|gif)$/i, '_colored$&'); // Keep original extension
                    link.click();
                } else {
                    alert('Invalid color entered. Please try again.');
                }
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}

// Function to convert color name or hex to RGB
function getColorRGB(color) {
    // Check for hex color
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        if (hex.length === 6) {
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16)
            };
        }
    }

    const colors = {
        black: { r: 0, g: 0, b: 0 },
        red: { r: 255, g: 0, b: 0 },
        green: { r: 0, g: 255, b: 0 },
        blue: { r: 0, g: 0, b: 255 },
        // Add more named colors as needed
    };

    return colors[color.toLowerCase()] || null; // Return RGB or null if not found
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
    event.preventDefault(); // Prevent default behavior to allow drop
});

document.body.addEventListener('drop', function(event) {
    event.preventDefault(); // Prevent default browser behavior
    let file = event.dataTransfer.files[0]; // Get the dropped file
    processImage(file);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        window.location.href = 'index.html';
    }
});
