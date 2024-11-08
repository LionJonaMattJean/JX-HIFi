const mainPicture = document.querySelector('.mainPicture img');
const carousselImage = document.querySelectorAll('.pictureCollection img');

carousselImage.forEach(image => {
    image.addEventListener('click', function () {
        // Change l'image principale pour correspondre à celle de l'image cliquée
        mainPicture.src = this.src;
        mainPicture.alt = this.alt;
    });
});