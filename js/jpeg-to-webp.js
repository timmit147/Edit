function processImage(file) {
    if (file && file.type === 'image/jpeg') {
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
                canvas.toBlob(function(blob) {
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