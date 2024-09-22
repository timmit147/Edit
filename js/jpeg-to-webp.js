// Function to handle image processing (JPEG to WebP conversion and download)
function processImage(file) {
    // Only process image files
    if (file && file.type === 'image/jpeg') {
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

                // Convert the canvas to WebP format
                canvas.toBlob(function(blob) {
                    // Create a download link for the WebP image
                    let link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = file.name.replace('.jpeg', '.webp').replace('.jpg', '.webp');
                    link.click();
                }, 'image/webp');
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a JPEG image.');
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
