//MENU HAMBURGUESA//
let boton = document.getElementById("button");

function showMenu() {
  let menu = document.getElementById("opcs-menu");

  if (menu.classList.contains("disabled-menu")) {
    menu.classList.remove("disabled-menu");
    menu.classList.add("enabled-menu");
    boton.classList.remove("fa-bars");
    boton.classList.add("fa-times");
  } else {
    menu.classList.remove("enabled-menu");
    menu.classList.add("disabled-menu");
    boton.classList.remove("fa-times");
    boton.classList.add("fa-bars");
  }
}

boton.addEventListener("click", showMenu);
//MENU HAMBURGUESA//

//MODO DARK//

const btnDark = document.getElementById("mode-dark");

btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark"))
    btnDark.textContent = "Modo Diurno";
  else {
    btnDark.textContent = "Modo Nocturno";
  }
});

//CAMBIO LOGO GIFOS//

let cuantosClicks = 0;
function logoDark() {
  cuantosClicks++;
  if (cuantosClicks % 2 == 0) {
    return document
      .getElementById("logo")
      .setAttribute("src", "/assets/logo-mobile.svg");
  } else {
    return document
      .getElementById("logo")
      .setAttribute("src", "/assets/logo-mobile-modo-noct.svg");
  }
}
let cuantosClicks2 = 0;
function dark() {
  cuantosClicks2++;
  if (cuantosClicks % 2 == 0) {
    return (
      document
        .getElementById("camara")
        .setAttribute("src", "/assets/camara.svg"),
      document
        .getElementById("pelicula")
        .setAttribute("src", "/assets/pelicula.svg")
    );
  } else {
    return (
      document
        .getElementById("camara")
        .setAttribute("src", "/assets/camara-modo-noc.svg"),
      document
        .getElementById("pelicula")
        .setAttribute("src", "/assets/pelicula-modo-noc.svg")
    );
  }
}

document.getElementById("mode-dark").onclick = function () {
  logoDark();
  dark();
  document.getElementById("create-gifo").addEventListener("mouseover", () => {
    document
      .getElementById("create-gifo")
      .setAttribute("src", "/assets/button-crear-gifo.svg");
    
  });

  //   // HOVER TRENDING

  document.getElementById("chevron-left").style.color = "#ffffff";
  document.getElementById("chevron-right").style.color = "#ffffff";

  document
    .getElementById("scroll-left")
    .addEventListener("mouseover", function () {
      if (screen.width >= 1280) {
        document.getElementById("chevron-left").style.color = "#000000";
      }
    });
  document
    .getElementById("scroll-left")
    .addEventListener("mouseout", function () {
      if (screen.width >= 1280) {
        document.getElementById("chevron-left").style.color = " #ffffff";
      }
    });
  document
    .getElementById("scroll-right")
    .addEventListener("mouseover", function () {
      if (screen.width >= 1280) {
        document.getElementById("chevron-right").style.color = "#000000";
      }
    });
  document
    .getElementById("scroll-right")
    .addEventListener("mouseout", function () {
      if (screen.width >= 1280) {
        document.getElementById("chevron-right").style.color = " #ffffff";
      }
    });
};
