//Menu hamburguesa


const buttonMenu = document.getElementById('button-menu');
const mainNav = document.getElementById('nav');
buttonMenu.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    buttonMenu.classList.toggle('close');
});



//funcion boton si y no 
var botonesEliminar = document.querySelectorAll("#boton1");

botonesEliminar.forEach(function(boton) {
  boton.addEventListener("click", function() {
    var ventana = boton.nextElementSibling;
    ventana.style.display = "block";
  });
});

var botonesSI = document.querySelectorAll("#BotonEliminar");

botonesSI.forEach(function(boton) {
  boton.addEventListener("click", function() {
    var ventana = boton.parentElement.parentElement;
    ventana.style.display = "none";
  });
});

var ventanas = document.querySelectorAll("#ventana");

ventanas.forEach(function(ventana) {
  ventana.addEventListener("click", function(event) {
    if (event.target === ventana) {
      ventana.style.display = "none";
    }
  });
});


