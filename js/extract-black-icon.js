// Function to handle image processing (extracting black pixels)
function processImage(file) {
    // Only process image files
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
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

                // Get image data
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;

                // Loop through each pixel
                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];

                    // Check if the pixel is black or near-black
                    if (r < 50 && g < 50 && b < 50) { // Adjust thresholds as needed
                        // Keep black pixels as is
                    } else {
                        // Make other pixels transparent
                        data[i + 3] = 0; // Set alpha to 0 (transparent)
                    }
                }

                // Put modified data back to canvas
                ctx.putImageData(imageData, 0, 0);

                // Create a download link for the processed image
                canvas.toBlob(function(blob) {
                    let link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = file.name.replace('.jpeg', '_black_pixels.png').replace('.jpg', '_black_pixels.png');
                    link.click();
                }, 'image/png');
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a JPEG or PNG image.');
    }
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
