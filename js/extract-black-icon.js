function processImage(file) {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
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
                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];
                    if (r < 50 && g < 50 && b < 50) { 
                    } else {
                        data[i + 3] = 0; 
                    }
                }
                ctx.putImageData(imageData, 0, 0);
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