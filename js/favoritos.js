//MOSTRAR SECCION FAVORITOS
function showFavorite() {
  document.getElementById("favoritos").classList.remove("disabled-fav");
  document.getElementById("favoritos").classList.add("enabled-fav");
  document.getElementById("section-1").classList.add("section-1-hide");
  document.getElementById("section-2").classList.add("section-2-hide");
  document.getElementById("opcs-menu").classList.add("disabled-menu");
  document.getElementById("container").style.display = "none";
  document.getElementById("results-more").style.display = "none";
  document.getElementById("div-line-grey").style.display = "none";
  document.getElementById("h2").style.display = "none";
  document.getElementById("gifos").style.display = "none";
  document.getElementById("results-more-favoritos").style.display = "none";
  document.getElementById("favoritos").style.display = "grid";
  document.getElementById("see-more").style.display = "none";
  document.getElementById("grabargif").style.display = "none";
  if (arregloFavoritos.length == 0) {
    document.getElementById("see-more3").style.display = "block";
    document.getElementById("h3-fav").style.display = "block";
    document.getElementById("fav-sin-contenido").style.display = "block";
  } else{
    document.getElementById("see-more3").style.display = "block";
    document.getElementById("fav-sin-contenido").style.display = "none";
    document.getElementById("h3-fav").style.display = "none";
  }
  fav()
}

document.getElementById("button-fav").addEventListener('click', showFavorite);


// GET LOCALSTORAGE Y  GIF FAV

let sectionFav = document.getElementById("gif-fav");

if (localStorage.getItem("arregloFav") != null) {
  arregloFavoritos = JSON.parse(localStorage.getItem("arregloFav"));
}

function fav(){
let offset = 0;
let cantidadGift = 12;

for (i = offset; i < cantidadGift + offset; i++) {
 

  let gifFav = document.createElement("img");
  let div = document.createElement("div");
  div.setAttribute("class", "div-container");

  gifFav.setAttribute("class", "img-fav");
  gifFav.src =  arregloFavoritos[i].src;
  gifFav.id =  arregloFavoritos[i].id;
  gifFav.title =arregloFavoritos[i].title;
  gifFav.user = arregloFavoritos[i].username;
  div.appendChild(gifFav);
  sectionFav.appendChild(div);

  gifFav.addEventListener("click", () => {
    abrirGifosMaxFavoritos();
  });
  // DESKTOP VIEW

  if (screen.width >= 641) {
    let divCards = document.createElement("div");
    let downloadButton = document.createElement("img");
    let fullSize = document.createElement("img");
    let title = document.createElement("p");
    let userName = document.createElement("p");

    title.setAttribute("class", "title");
    userName.setAttribute("class", "user");

    let likeButton = document.createElement("i");
    likeButton.setAttribute("id", "like-fav");
    likeButton.setAttribute("class", "far fa-heart");

    downloadButton.setAttribute("class", "icono-download");
    downloadButton.setAttribute("id", "icono-download");
    downloadButton.setAttribute("src", "/assets/icon-download.svg");

    fullSize.setAttribute("class", "full-size");
    fullSize.setAttribute("src", "/assets/icon-max-normal.svg");

    divCards.appendChild(likeButton);
    divCards.appendChild(downloadButton);
    divCards.appendChild(fullSize);
    divCards.appendChild(title);
    divCards.appendChild(userName);
    divCards.style.visibility = "hidden";
    div.appendChild(divCards);
    ///////////////////////////////////////////////////////////
    div.addEventListener("mouseover", () => {
      divCards.style.visibility = "visible";
      title.textContent =   gifFav.title;
      userName.textContent =  gifFav.user;
    });
    div.addEventListener("mouseout", () => {
      divCards.style.visibility = "hidden";
    });

    likeButton.addEventListener("click", likeGif);
    likeButton.addEventListener(
      "click",
      precargaFav(arregloFavoritos[i].id, i)
    );

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

    ///////////////////////////////////////////////

    downloadButton.addEventListener("mouseover", () => {
      downloadButton.src = "/assets/icon-download-hover.svg";
    });

    downloadButton.addEventListener("mouseout", () => {
      downloadButton.src = "/assets/icon-download.svg";
    });
    downloadButton.addEventListener("click", async function () {
      let a = document.createElement("a");
      let response = await fetch(gifFav.src);
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
    /////////////////////////////////////

    fullSize.addEventListener("mouseover", () => {
      fullSize.src = "/assets/icon-max-hover.svg";
    });

    fullSize.addEventListener("mouseout", () => {
      fullSize.src = "/assets/icon-max-normal.svg";
    });

    fullSize.addEventListener("click", () => {
      gifFav.click();
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

      let ObjetoFav = new objetoFav(
        gifFav.src,
        gifFav.user,
        gifFav.title,
        gifFav.id
      );

      if (arregloFavoritos.length === 0) {
        arregloFavoritos.push(ObjetoFav);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      } else {
        if (
          JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(gifFav.id)) ==
          -1
        ) {
          arregloFavoritos.push(ObjetoFav);
          localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
        } else {
          for (i = 0; i < arregloFavoritos.length; i++) {
            if (
              JSON.stringify(arregloFavoritos[i].id) ===
              JSON.stringify(gifFav.id)
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
}
}



let resultsMore =document.getElementById("results-more-favoritos");

function favMore(){
  let offset =12;
  let cantidadGift = 24;
  
  for (i = offset; i < cantidadGift + offset; i++) {
    
      document.getElementById("see-more3").style.display = "block";
      document.getElementById("fav-sin-contenido").style.display = "none";
      document.getElementById("h3-fav").style.display = "none";
      
    
  
    let newId = arregloFavoritos[i].id;
    let newSrc = arregloFavoritos[i].src;
    let newTitle = arregloFavoritos[i].title;
    let newUserName = arregloFavoritos[i].username;
  
    let gifFav = document.createElement("img");
    let div = document.createElement("div");
    div.setAttribute("class", "div-container");
  
    gifFav.setAttribute("class", "img-fav");
    gifFav.src = newSrc;
    gifFav.id = newId;
    gifFav.title = newTitle;
    gifFav.user = newUserName;
    div.appendChild(gifFav);
    resultsMore.appendChild(div);
  
    gifFav.addEventListener("click", () => {
      abrirGifosMaxFavoritos();
    });
    // DESKTOP VIEW
  
    if (screen.width >= 641) {
      let divCards = document.createElement("div");
      let downloadButton = document.createElement("img");
      let fullSize = document.createElement("img");
      let title = document.createElement("p");
      let userName = document.createElement("p");
  
      title.setAttribute("class", "title");
      userName.setAttribute("class", "user");
  
      let likeButton = document.createElement("i");
      likeButton.setAttribute("id", "like-fav");
      likeButton.setAttribute("class", "far fa-heart");
  
      downloadButton.setAttribute("class", "icono-download");
      downloadButton.setAttribute("id", "icono-download");
      downloadButton.setAttribute("src", "/assets/icon-download.svg");
  
      fullSize.setAttribute("class", "full-size");
      fullSize.setAttribute("src", "/assets/icon-max-normal.svg");
  
      divCards.appendChild(likeButton);
      divCards.appendChild(downloadButton);
      divCards.appendChild(fullSize);
      divCards.appendChild(title);
      divCards.appendChild(userName);
      divCards.style.visibility = "hidden";
      div.appendChild(divCards);
      ///////////////////////////////////////////////////////////
      div.addEventListener("mouseover", () => {
        divCards.style.visibility = "visible";
        title.textContent = gifFav.title;
        userName.textContent =  gifFav.user;
      });
      div.addEventListener("mouseout", () => {
        divCards.style.visibility = "hidden";
      });
  
      likeButton.addEventListener("click", likeGif);
      likeButton.addEventListener(
        "click",
        precargaFav(arregloFavoritos[i].id, i)
      );
  
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
  
      ///////////////////////////////////////////////
  
      downloadButton.addEventListener("mouseover", () => {
        downloadButton.src = "/assets/icon-download-hover.svg";
      });
  
      downloadButton.addEventListener("mouseout", () => {
        downloadButton.src = "/assets/icon-download.svg";
      });
      downloadButton.addEventListener("click", async function () {
        let a = document.createElement("a");
        let response = await fetch(gifFav.src);
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
      /////////////////////////////////////
  
      fullSize.addEventListener("mouseover", () => {
        fullSize.src = "/assets/icon-max-hover.svg";
      });
  
      fullSize.addEventListener("mouseout", () => {
        fullSize.src = "/assets/icon-max-normal.svg";
      });
  
      fullSize.addEventListener("click", () => {
        gifFav.click();
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
  
        let ObjetoFav = new objetoFav(
          gifFav.src,
          gifFav.user,
          gifFav.title,
          gifFav.id
        );
  
        if (arregloFavoritos.length === 0) {
          arregloFavoritos.push(ObjetoFav);
          localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
        } else {
          if (
            JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(gifFav.id)) ==
            -1
          ) {
            arregloFavoritos.push(ObjetoFav);
            localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
          } else {
            for (i = 0; i < arregloFavoritos.length; i++) {
              if (
                JSON.stringify(arregloFavoritos[i].id) ===
                JSON.stringify(gifFav.id)
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
  }
  }
  document.getElementById('see-more3').addEventListener('click',()=>{
    resultsMore.style.display= 'grid'
    resultsMore.setAttribute('class','container-gifos-more ')
    favMore()
  })

// PRECARGA FAVORITOS
function precargaFav(id, posicion) {
  if (arregloFavoritos.length != 0) {
    if (localStorage.getItem("arregloFav").includes(JSON.stringify(id))) {
      // likeButton.removeAttribute("class", "far fa-heart");
      // likeButton.setAttribute("class", "fas fa-heart");
    } else {
      // likeButton.removeAttribute("class", "fas fa-heart");
      // likeButton.setAttribute("class", "far fa-heart");
    }
  }
}
