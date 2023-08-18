document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate");
    const saveButton = document.getElementById("save");
    const qrCodeContainer = document.getElementById("qrcode");
    const urlInput = document.getElementById("url");
    const sizeSelect = document.getElementById("size");
    const colorDarkInput = document.getElementById("colorDark");
    const colorLightInput = document.getElementById("colorLight");

    generateButton.addEventListener("click", function() {
        const url = urlInput.value;
        const size = sizeSelect.value;
        const colorDark = colorDarkInput.value;
        const colorLight = colorLightInput.value;

        const qrCodeText = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=${size}&color=${colorDark}&bgcolor=${colorLight}`;
        qrCodeContainer.innerHTML = `<img src="${qrCodeText}" alt="Generated QR Code">`;
    });

    saveButton.addEventListener("click", function() {
        const qrImage = qrCodeContainer.querySelector("img");
        if (qrImage) {
            const canvas = document.createElement("canvas");
            canvas.width = qrImage.width;
            canvas.height = qrImage.height;
            const context = canvas.getContext("2d");
            context.drawImage(qrImage, 0, 0);

            const link = document.createElement("a");
            canvas.toBlob(function(blob) {
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                link.click();
            });
        }
    });
});
