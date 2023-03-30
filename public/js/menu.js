//Menu hamburguesa


const buttonMenu = document.getElementById('button-menu');
const mainNav = document.getElementById('nav');
buttonMenu.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    buttonMenu.classList.toggle('close');
});