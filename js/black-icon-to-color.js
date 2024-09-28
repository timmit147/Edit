function processImage(file) {
    if (file && file.type.startsWith('image/')) {
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
                let color = prompt("Enter a color to change the image to (e.g., 'red', 'green', 'blue', '#FFFFFF', 'black'):", 'black') || 'black';
                let rgbColor = getColorRGB(color);
                if (rgbColor) {
                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = rgbColor.r;     
                        data[i + 1] = rgbColor.g; 
                        data[i + 2] = rgbColor.b; 
                    }
                    ctx.putImageData(imageData, 0, 0);
                    let link = document.createElement('a');
                    link.href = canvas.toDataURL(file.type); 
                    link.download = file.name.replace(/\.(jpeg|jpg|png|gif)$/i, '_colored$&'); 
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
function getColorRGB(color) {
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
    };
    return colors[color.toLowerCase()] || null; 
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
        window.location.href = 'index.html';
    }
});