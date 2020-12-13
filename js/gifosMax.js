let eventoMax;
let img = document.createElement('img');
img.setAttribute('id','full-screen')
document.getElementById("container-img").appendChild(img)

function abrirGifosMax() {
  let full = document.getElementById("full-screen");
  full.src = event.target.src;
  eventoMax = event.target.id;
  fullTitle = event.target.title;
  fullUserName = event.target.user;
  container.style.display = "none";
  containerGifos.style.display = "none";
  imgMax.classList.add("container-imgMax");
  document.getElementById("container-img").style.display = "block";
  full.classList.add("imagen-max");
  document.getElementById("button").style.visibility = "hidden";
  document.getElementById("section-1").classList.add("hidden");
  document.getElementById("section-2").classList.add("hidden");
  document.getElementById("div-line-grey").style.display = "none  ";
  document.getElementById("h2").style.display = "none  ";
  document.getElementById("results-more").classList.add("hidden");
  document.getElementById("see-more").classList.add("hidden");
  document.getElementById("section-3").classList.add("hidden");
  document.getElementById("footer").classList.add("hidden");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  let userName = document.createElement("p");
  title.textContent = fullTitle;
  if (userName === null) {
    userName.textContent = "Usuario desconocido";
  } else {
    userName.textContent = fullUserName;
    userName.setAttribute("class", "user");
  }
  let closeButton = document.createElement("i");
  closeButton.setAttribute("class", "fas fa-times");

  let likeButton = document.createElement("i");
  likeButton.setAttribute("id", "like-fav");
  likeButton.setAttribute("class", "far fa-heart");

  let downloadButton = document.createElement("img");
  downloadButton.setAttribute("class", "icono-download");
  downloadButton.setAttribute("src", "/assets/icon-download.svg");
  downloadButton.setAttribute("id", "icono-download");

  document.getElementById("container-img").appendChild(closeButton);
  document.getElementById("container-img").appendChild(likeButton);
  document.getElementById("container-img").appendChild(title);
  document.getElementById("container-img").appendChild(userName);
  document.getElementById("container-img").appendChild(downloadButton);

  // DESCARGA GIFOS
  downloadButton.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(full.src);
    let gif = await response.blob();
    a.download = "Gif";
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = [
      "application/octet-stream",
      a.download,
      a.href,
    ].join(":");
    a.click();
  });

  // CLOSE BUTTON GIFOS MAX

  closeButton.addEventListener("click", function () {
    let full = document.getElementById("full-screen");
    container.style.display = "grid";
    containerGifos.style.display = "grid";
    imgMax.classList.remove("container-imgMax");
    document.getElementById("container-img").style.display = "none";
    full.classList.remove("imagen-max");
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("section-1").classList.remove("hidden");
    document.getElementById("section-2").classList.remove("hidden");
    document.getElementById("div-line-grey").style.display = "block ";
    document.getElementById("h2").style.display = "block";
    document.getElementById("results-more").classList.remove("hidden");
    document.getElementById("see-more").classList.remove("hidden");
    document.getElementById("section-3").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
    downloadButton.style.display = "none";
    likeButton.style.display = "none";
    closeButton.style.display = "none";
    title.style.display = "none";
    userName.style.display = "none";
  });
  // LIKE GIFOS

  likeButton.addEventListener("click", () => {
    likeGif();
  });

  function likeGif() {
    if (
      likeButton.classList[0] == "fas" ||
      likeButton.classList[1] == "fas"
    ) {
      likeButton.classList.remove("fas");
      likeButton.classList.add("far");
    } else {
      likeButton.classList.remove("far");
      likeButton.classList.add("fas");
    }
    function objetoFav(src, username, title, id) {
      this.src = src;
      this.username = username;
      this.title = title;
      this.id = id;
    }
    let imgEvento = document.getElementById(eventoMax);

    let ObjetoFav = new objetoFav(
      imgEvento.src,
      imgEvento.user,
      imgEvento.title,
      imgEvento.id
    );

    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(ObjetoFav);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
    } else {
      if (
        JSON.stringify(arregloFavoritos).indexOf(
          JSON.stringify(ObjetoFav.id)
        ) == -1
      ) {
        arregloFavoritos.push(ObjetoFav);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (
            JSON.stringify(arregloFavoritos[i].id) ===
            JSON.stringify(ObjetoFav.id)
          ) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem(
              "arregloFav",
              JSON.stringify(arregloFavoritos)
            );
          }
        }
      }
    }
  }
}

function abrirGifosMaxFavoritos() {
  let full = document.getElementById("full-screen");
  full.src = event.target.src;
  eventoMax = event.target.id;
  fullTitle = event.target.title;
  fullUserName = event.target.user;
  container.style.display = "none";
  containerGifos.style.display = "none";
  imgMax.classList.add("container-imgMax");
  document.getElementById("container-img").style.display = "block";
  full.classList.add("imagen-max");
  document.getElementById("button").style.visibility = "hidden";
  document.getElementById("gif-fav").style.visibility = "hidden";
  document.getElementById("results-more-favoritos").style.visibility = "hidden";
  document.getElementById("section-1").classList.add("hidden");
  document.getElementById("section-2").classList.add("hidden");
  document.getElementById("div-line-grey").style.display = "none  ";
  document.getElementById("h2").style.display = "none  ";
  document.getElementById("results-more").classList.add("hidden");
  document.getElementById("see-more").classList.add("hidden");
  document.getElementById("see-more3").style.display = "none  ";
  document.getElementById("section-3").classList.add("hidden");
  document.getElementById("favoritos").classList.add("hidden");
  document.getElementById("footer").classList.add("hidden");
  document.getElementById("hide-section").style.display = "block";
  document.getElementById("hide-section").classList.add("enabled-section");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  let userName = document.createElement("p");
  title.textContent = fullTitle;
  if (userName === null) {
    userName.textContent = "Usuario desconocido";
  } else {
    userName.textContent = fullUserName;
    userName.setAttribute("class", "user");
  }
  let closeButton = document.createElement("i");
  closeButton.setAttribute("class", "fas fa-times");

  let likeButton = document.createElement("i");
  likeButton.setAttribute("id", "like-fav");
  likeButton.setAttribute("class", "far fa-heart");

  let downloadButton = document.createElement("img");
  downloadButton.setAttribute("class", "icono-download");
  downloadButton.setAttribute("src", "/assets/icon-download.svg");
  downloadButton.setAttribute("id", "icono-download");

  document.getElementById("container-img").appendChild(closeButton);
  document.getElementById("container-img").appendChild(likeButton);
  document.getElementById("container-img").appendChild(title);
  document.getElementById("container-img").appendChild(userName);
  document.getElementById("container-img").appendChild(downloadButton);

  // DESCARGA GIFOS
  downloadButton.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(full.src);
    let gif = await response.blob();
    a.download = "Gif";
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = [
      "application/octet-stream",
      a.download,
      a.href,
    ].join(":");
    a.click();
  });

  // CLOSE BUTTON GIFOS MAX

  closeButton.addEventListener("click", function () {
    let full = document.getElementById("full-screen");
    container.style.display = "grid";
    containerGifos.style.display = "grid";
    imgMax.classList.remove("container-imgMax");
    document.getElementById("container-img").style.display = "none";
    full.classList.remove("imagen-max");
    document.getElementById("gif-fav").style.visibility = "visible";
    document.getElementById("results-more-favoritos").style.visibility =
      "visible";
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("section-1").classList.remove("hidden");
    document.getElementById("section-2").classList.remove("hidden");
    document.getElementById("div-line-grey").style.display = "block ";
    document.getElementById("h2").style.display = "block";
    document.getElementById("results-more").classList.remove("hidden");
    document.getElementById("see-more").classList.remove("hidden");
    document.getElementById("section-3").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
    document.getElementById("hide-section").style.display = "none";
    document.getElementById("hide-section").classList.remove("enabled-section");
    document.getElementById("favoritos").classList.remove("hidden");
    document.getElementById("see-more3").style.display = "block ";

    downloadButton.style.display = "none";
    likeButton.style.display = "none";
    closeButton.style.display = "none";
    title.style.display = "none";
    userName.style.display = "none";
  });
  // LIKE GIFOS

  likeButton.addEventListener("click", likeGif);
  likeButton.addEventListener("click", precargaFav(arregloFavoritos[0].id, i));

  // PRECARGA FAVORITOS
  function precargaFav(id, posicion) {
    if (arregloFavoritos.length != 0) {
      if (localStorage.getItem("arregloFav").includes(JSON.stringify(id))) {
        likeButton.removeAttribute("class", "far fa-heart");
        likeButton.setAttribute("class", "fas fa-heart");
      } else {
        likeButton.removeAttribute("class", "fas fa-heart");
        likeButton.setAttribute("class", "far fa-heart");
      }
    }
  }

  function likeGif() {
    if (likeButton.classList[0] == "fas" || likeButton.classList[1] == "fas") {
      likeButton.classList.remove("fas");
      likeButton.classList.add("far");
    } else {
      likeButton.classList.remove("far");
      likeButton.classList.add("fas");
    }

    function objetoFav(src, username, title, id) {
      this.src = src;
      this.username = username;
      this.title = title;
      this.id = id;
    }
    let imgEvento = document.getElementById(eventoMax);

    let ObjetoFav = new objetoFav(
      imgEvento.src,
      imgEvento.user,
      imgEvento.title,
      imgEvento.id
    );

    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(ObjetoFav);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
    } else {
      if (
        JSON.stringify(arregloFavoritos).indexOf(
          JSON.stringify(ObjetoFav.id)
        ) == -1
      ) {
        arregloFavoritos.push(ObjetoFav);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (
            JSON.stringify(arregloFavoritos[i].id) ===
            JSON.stringify(ObjetoFav.id)
          ) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem(
              "arregloFav",
              JSON.stringify(arregloFavoritos)
            );
          }
        }
      }
    }
  }
}

function abrirGifosMaxTrending() {
  let full = document.getElementById("full-screen");
  full.src = event.target.src;
  eventoMaxFav = event.target.id;
  fullTitle = event.target.title;
  fullUserName = event.target.user;
  document.getElementById("container").style.height = "0px";
  document.getElementById("results-more").style.height = "0px";
  container.style.display = "grid";
  containerGifos.style.display = "grid";
  imgMax.classList.add("container-imgMax");
  document.getElementById("container-img").style.display = "block";
  full.classList.add("imagen-max");
  document.getElementById("button").style.visibility = "hidden";
  document.getElementById("favoritos").style.visibility = "hidden";
  document.getElementById("section-1").classList.add("hidden");
  document.getElementById("section-2").classList.add("hidden");
  document.getElementById("div-line-grey").style.display = "none  ";
  document.getElementById("h2").style.display = "none  ";
  document.getElementById("see-more").style.display = "none  ";
  document.getElementById("see-more3").style.display = "none";
  document.getElementById("results-more").classList.add("hidden");
  document.getElementById("see-more").classList.add("hidden");
  document.getElementById("section-3").classList.add("hidden");
  document.getElementById("footer").classList.add("hidden");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  let userName = document.createElement("p");
  title.textContent = fullTitle;
  if (userName === null) {
    userName.textContent = "Usuario desconocido";
  } else {
    userName.textContent = fullUserName;
    userName.setAttribute("class", "user");
  }
  let closeButton = document.createElement("i");
  closeButton.setAttribute("class", "fas fa-times");

  let likeButton = document.createElement("i");
  likeButton.setAttribute("id", "like-fav");
  likeButton.setAttribute("class", "far fa-heart");

  let downloadButton = document.createElement("img");
  downloadButton.setAttribute("class", "icono-download");
  downloadButton.setAttribute("src", "/assets/icon-download.svg");
  downloadButton.setAttribute("id", "icono-download");

  document.getElementById("container-img").appendChild(closeButton);
  document.getElementById("container-img").appendChild(likeButton);
  document.getElementById("container-img").appendChild(title);
  document.getElementById("container-img").appendChild(userName);
  document.getElementById("container-img").appendChild(downloadButton);

  // DESCARGA GIFOS
  downloadButton.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(full.src);
    let gif = await response.blob();
    a.download = "Gif";
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = [
      "application/octet-stream",
      a.download,
      a.href,
    ].join(":");
    a.click();
  });

  // CLOSE BUTTON GIFOS MAX

  closeButton.addEventListener("click", function () {
    let full = document.getElementById("full-screen");
    document.getElementById("container").style.display = "none";
    document.getElementById("results-more").style.display = "none";
    imgMax.classList.remove("container-imgMax");
    document.getElementById("container-img").style.display = "none";
    full.classList.remove("imagen-max");
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("see-more").style.display = "block";
    document.getElementById("favoritos").style.visibility = "visible";
    document.getElementById("section-1").classList.remove("hidden");
    document.getElementById("section-2").classList.remove("hidden");
    document.getElementById("div-line-grey").style.display = "none";
    document.getElementById("h2").style.display = "none";
    document.getElementById("results-more").classList.remove("hidden");
    document.getElementById("see-more").classList.remove("hidden");
    document.getElementById("see-more").style.display ='none'
    document.getElementById("section-3").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
    downloadButton.style.display = "none";
    likeButton.style.display = "none";
    closeButton.style.display = "none";
    title.style.display = "none";
    userName.style.display = "none";
  });

  // LIKE GIFOS

  likeButton.addEventListener("click", likeGif);

  function likeGif() {
    if (likeButton.classList[0] == "fas" || likeButton.classList[1] == "fas") {
      likeButton.classList.remove("fas");
      likeButton.classList.add("far");
    } else {
      likeButton.classList.remove("far");
      likeButton.classList.add("fas");
    }

    function objetoFav(src, username, title, id) {
      this.src = src;
      this.username = username;
      this.title = title;
      this.id = id;
    }
    let imgEvento = document.getElementById(eventoMaxFav);

    let ObjetoFav = new objetoFav(
      imgEvento.src,
      imgEvento.user,
      imgEvento.title,
      imgEvento.id
    );

    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(ObjetoFav);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
    } else {
      if (
        JSON.stringify(arregloFavoritos).indexOf(
          JSON.stringify(ObjetoFav.id)
        ) == -1
      ) {
        arregloFavoritos.push(ObjetoFav);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (
            JSON.stringify(arregloFavoritos[i].id) ===
            JSON.stringify(ObjetoFav.id)
          ) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem(
              "arregloFav",
              JSON.stringify(arregloFavoritos)
            );
          }
        }
      }
    }
  }
}

function abrirGifosMaxGifos() {
  let full = document.getElementById("full-screen");
  full.classList.add("imagen-max");
  full.src = event.target.src;
  eventoMaxGif = event.target.id;
  fullTitle = event.target.title;
  fullUserName = event.target.user;
  container.style.display = "none";
  containerGifos.style.display = "none";
  document.getElementById("container-img").classList.add("container-imgMax");
  document.getElementById("container-img").style.display = "block";
  full.classList.add("imagen-max");

  document.getElementById("hide-section").classList.add("enabled-section");
  document.getElementById("hide-section").classList.remove("disabled-section");
  document.getElementById("mis-gifos").style.display = "none";
  document.getElementById("button").style.visibility = "hidden";
  document.getElementById("section-1").classList.add("hidden");
  document.getElementById("section-2").classList.add("hidden");
  document.getElementById("div-line-grey").style.display = "none  ";
  document.getElementById("h2").style.display = "none  ";
  document.getElementById("results-more").classList.add("hidden");
  document.getElementById("see-more").classList.add("hidden");
  document.getElementById("section-3").classList.add("hidden");
  document.getElementById("footer").classList.add("hidden");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  let userName = document.createElement("p");
  title.textContent = fullTitle;
  if (userName === null) {
    userName.textContent = "Usuario desconocido";
  } else {
    userName.textContent = fullUserName;
    userName.setAttribute("class", "user");
  }
  let closeButton = document.createElement("i");
  closeButton.setAttribute("class", "fas fa-times");
  let likeButton = document.createElement("i");

  likeButton.setAttribute("class", "fas fa-trash");

  let downloadButton = document.createElement("img");
  downloadButton.setAttribute("class", "icono-download");
  downloadButton.setAttribute("src", "/assets/icon-download.svg");
  downloadButton.setAttribute("id", "icono-download");

  document.getElementById("container-img").appendChild(closeButton);
  document.getElementById("container-img").appendChild(likeButton);
  document.getElementById("container-img").appendChild(title);
  document.getElementById("container-img").appendChild(userName);
  document.getElementById("container-img").appendChild(downloadButton);

  // DESCARGA GIFOS
  downloadButton.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(full.src);
    let gif = await response.blob();
    a.download = "Gif";
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = [
      "application/octet-stream",
      a.download,
      a.href,
    ].join(":");
    a.click();
  });

  // CLOSE BUTTON GIFOS MAX

  closeButton.addEventListener("click", function () {
    let full = document.getElementById("full-screen");
    imgMax.classList.remove("container-imgMax");
    document.getElementById("container-img").style.display = "none";
    document.getElementById("see-more").style.display = "none";
    document.getElementById("ver-mas").style.display = "none";
    full.classList.remove("imagen-max");
    document.getElementById("mis-gifos").style.display = "grid";
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("section-1").classList.remove("hidden");
    document.getElementById("section-2").classList.remove("hidden");
    document.getElementById("results-more").classList.remove("hidden");
    document.getElementById("section-3").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
    downloadButton.style.display = "none";
    likeButton.style.display = "none";
    closeButton.style.display = "none";
    title.style.display = "none";
    userName.style.display = "none";
  });
  // LIKE GIFOS

  likeButton.addEventListener("click", likeGif);

  function likeGif() {
    for (i = 0; i < arregloMisGifos.length; i++) {
      if (JSON.stringify(arregloMisGifos[i]) === JSON.stringify(eventoMaxGif)) {
        arregloMisGifos.splice(i, 1);
        localStorage.setItem("misGifos", JSON.stringify(arregloMisGifos));
      }
    }
  }
}
