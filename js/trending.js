let containerTrending = document.getElementById("container-trending");
let scrollLeft = document.getElementById("scroll-left");
let scrollRight = document.getElementById("scroll-right");
let eventoMaxFav;
let h3Trending = document.getElementById("h3-trending");

arrayTrending = [];

function trending() {
  const APIKEY = "jAO1bZbtzM7A4mao2KGShgEF2qW9Ath0";
  const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      arrayTrending = [];
      class gifTrendings {
        constructor(src, username, title, id) {
          this.src = src;
          this.username = username;
          this.title = title;
          this.id = id;
        }
      }
      for (i = 0; i < 24; i++) {
        var newId = json.data[i].id;
        var newSrc = json.data[i].images.original.url;
        var newTitle = json.data[i].title;
        var newUserName = json.data[i].username;
        // console.log(json.data[i].title);
        let giftTrendings = new gifTrendings(
          newSrc,
          newUserName,
          newTitle,
          newUserName
        );
        arrayTrending.push(giftTrendings);

        let div = document.createElement("div");
        div.setAttribute("class", "div-container");
        let img = document.createElement("img");
        img.setAttribute("class", "img");
        img.src = newSrc;
        img.id = newId;
        img.title = newTitle;
        img.user = newUserName;
        div.appendChild(img);
        containerTrending.appendChild(div);

        //MOBILE VIEW

        if (imgMax.classList.contains("container-imgMax")) {
          imgMax.classList.remove("container-imgMax");
        }
        img.addEventListener("click", () => {
          if (
            document
              .getElementById("hide-section")
              .classList.contains("disabled-section")
          ) {
            document
              .getElementById("hide-section")
              .classList.remove("disabled-section");
            document
              .getElementById("hide-section")
              .classList.add("enabled-section");
          }
          abrirGifosMaxTrending();
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

          let likeButton = document.createElement("img");
          likeButton.setAttribute("id", "like-fav");
          likeButton.setAttribute("src", "/assets/icon-fav.svg");
          likeButton.setAttribute("class", "fa-heart");

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
            title.textContent = img.title;
            userName.textContent = img.user;
          });
          div.addEventListener("mouseout", () => {
            divCards.style.visibility = "hidden";
          });

          likeButton.addEventListener("click", () => {
            let source = likeButton.src;
            if (
              source.slice(source.indexOf("/assets"), source.length) ==
              "/assets/icon-fav-active.svg"
            ) {
              likeButton.src = "/assets/icon-fav.svg";
            } else {
              likeButton.src = "/assets/icon-fav-active.svg";
            }

            likeGif();
          });

          ///////////////////////////////////////////////

          downloadButton.addEventListener("mouseover", () => {
            downloadButton.src = "/assets/icon-download-hover.svg";
          });

          downloadButton.addEventListener("mouseout", () => {
            downloadButton.src = "/assets/icon-download.svg";
          });
          downloadButton.addEventListener("click", async function () {
            let a = document.createElement("a");
            let response = await fetch(img.src);
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
            img.click();
          });

          function likeGif() {
            function objetoFav(src, username, title, id) {
              this.src = src;
              this.username = username;
              this.title = title;
              this.id = id;
            }

            let ObjetoFav = new objetoFav(img.src, img.user, img.title, img.id);

            if (arregloFavoritos.length === 0) {
              arregloFavoritos.push(ObjetoFav);
              localStorage.setItem(
                "arregloFav",
                JSON.stringify(arregloFavoritos)
              );
            } else {
              if (
                JSON.stringify(arregloFavoritos).indexOf(
                  JSON.stringify(img.id)
                ) == -1
              ) {
                arregloFavoritos.push(ObjetoFav);
                localStorage.setItem(
                  "arregloFav",
                  JSON.stringify(arregloFavoritos)
                );
              } else {
                for (i = 0; i < arregloFavoritos.length; i++) {
                  if (
                    JSON.stringify(arregloFavoritos[i].id) ===
                    JSON.stringify(img.id)
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
    });
}

trending();
arrayTitle = [];
function trendingTittle() {
  const APIKEY = "jAO1bZbtzM7A4mao2KGShgEF2qW9Ath0";
  const URL = `https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);

      // for (i = 0; i < 5; i++) {
      let titleTrending1 = json.data[0];
      let titleTrending2 = json.data[1];
      let titleTrending3 = json.data[2];
      let titleTrending4 = json.data[3];
      let titleTrending5 = json.data[4];
      // console.log(titleTrending)
      arrayTitle.push(titleTrending1);
      arrayTitle.push(titleTrending2);
      arrayTitle.push(titleTrending3);
      arrayTitle.push(titleTrending4);
      arrayTitle.push(titleTrending5);

      let primerTrending = document.createElement("h4");
      let segundoTrending = document.createElement("h4");
      let tercerTrending = document.createElement("h4");
      let cuartoTrending = document.createElement("h4");
      let quintoTrending = document.createElement("h4");

      primerTrending.innerHTML = titleTrending1;
      segundoTrending.innerHTML = titleTrending2;
      tercerTrending.innerHTML = titleTrending3;
      cuartoTrending.innerHTML = titleTrending4;
      quintoTrending.innerHTML = titleTrending5;

      h3Trending.appendChild(primerTrending);
      h3Trending.appendChild(segundoTrending);
      h3Trending.appendChild(tercerTrending);
      h3Trending.appendChild(cuartoTrending);
      h3Trending.appendChild(quintoTrending);

      primerTrending.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        searchInput.textContent = titleTrending1;
        let hideSection = document.getElementById("hide-section");
        if (hideSection.classList.contains("disabled-section")) {
          hideSection.classList.remove("disabled-section");
          hideSection.classList.add("enabled-section");
        }

        let h1Hide = document.getElementById("h1");
        if (h1Hide.classList.contains("h1")) {
          h1Hide.classList.remove("h1");
          h1Hide.classList.add("disabled-h1");
        } else {
          h1Hide.classList.remove("disabled-h1");
          h1Hide.classList.add("h1");
        }
        let ilustraHide = document.getElementById("ilustra");
        if (ilustraHide.classList.contains("ilustra")) {
          ilustraHide.classList.remove("ilustra");
          ilustraHide.classList.add("disabled-ilustra");
        } else {
          ilustraHide.classList.remove("disabled-ilustra");
          ilustraHide.classList.add("ilustra");
        }
        document.getElementById("search-icon").style.position = "relative";
        document.getElementById("search-icon").style.left = "-247px";
        if (document.getElementById("close-icon").classList.contains("hide")) {
          document.getElementById("close-icon").classList.remove("hide");
        }
        search(json.data[0]);
        seeMoreGif(json.data[0]);
      });
      segundoTrending.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        searchInput.textContent = titleTrending2;
        let hideSection = document.getElementById("hide-section");
        if (hideSection.classList.contains("disabled-section")) {
          hideSection.classList.remove("disabled-section");
          hideSection.classList.add("enabled-section");
        }

        let h1Hide = document.getElementById("h1");
        if (h1Hide.classList.contains("h1")) {
          h1Hide.classList.remove("h1");
          h1Hide.classList.add("disabled-h1");
        } else {
          h1Hide.classList.remove("disabled-h1");
          h1Hide.classList.add("h1");
        }
        let ilustraHide = document.getElementById("ilustra");
        if (ilustraHide.classList.contains("ilustra")) {
          ilustraHide.classList.remove("ilustra");
          ilustraHide.classList.add("disabled-ilustra");
        } else {
          ilustraHide.classList.remove("disabled-ilustra");
          ilustraHide.classList.add("ilustra");
        }
        document.getElementById("search-icon").style.position = "relative";
        document.getElementById("search-icon").style.left = "-247px";
        if (document.getElementById("close-icon").classList.contains("hide")) {
          document.getElementById("close-icon").classList.remove("hide");
        }
        search(json.data[1]);
        seeMoreGif(json.data[1]);
      });
      tercerTrending.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        searchInput.textContent = titleTrending3;
        let hideSection = document.getElementById("hide-section");
        if (hideSection.classList.contains("disabled-section")) {
          hideSection.classList.remove("disabled-section");
          hideSection.classList.add("enabled-section");
        }

        let h1Hide = document.getElementById("h1");
        if (h1Hide.classList.contains("h1")) {
          h1Hide.classList.remove("h1");
          h1Hide.classList.add("disabled-h1");
        } else {
          h1Hide.classList.remove("disabled-h1");
          h1Hide.classList.add("h1");
        }
        let ilustraHide = document.getElementById("ilustra");
        if (ilustraHide.classList.contains("ilustra")) {
          ilustraHide.classList.remove("ilustra");
          ilustraHide.classList.add("disabled-ilustra");
        } else {
          ilustraHide.classList.remove("disabled-ilustra");
          ilustraHide.classList.add("ilustra");
        }
        document.getElementById("search-icon").style.position = "relative";
        document.getElementById("search-icon").style.left = "-247px";
        if (document.getElementById("close-icon").classList.contains("hide")) {
          document.getElementById("close-icon").classList.remove("hide");
        }
        search(json.data[2]);
        seeMoreGif(json.data[2]);
      });
      cuartoTrending.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        searchInput.textContent = titleTrending4;
        let hideSection = document.getElementById("hide-section");
        if (hideSection.classList.contains("disabled-section")) {
          hideSection.classList.remove("disabled-section");
          hideSection.classList.add("enabled-section");
        }

        let h1Hide = document.getElementById("h1");
        if (h1Hide.classList.contains("h1")) {
          h1Hide.classList.remove("h1");
          h1Hide.classList.add("disabled-h1");
        } else {
          h1Hide.classList.remove("disabled-h1");
          h1Hide.classList.add("h1");
        }
        let ilustraHide = document.getElementById("ilustra");
        if (ilustraHide.classList.contains("ilustra")) {
          ilustraHide.classList.remove("ilustra");
          ilustraHide.classList.add("disabled-ilustra");
        } else {
          ilustraHide.classList.remove("disabled-ilustra");
          ilustraHide.classList.add("ilustra");
        }
        document.getElementById("search-icon").style.position = "relative";
        document.getElementById("search-icon").style.left = "-247px";
        if (document.getElementById("close-icon").classList.contains("hide")) {
          document.getElementById("close-icon").classList.remove("hide");
        }
        search(json.data[3]);
        seeMoreGif(json.data[3]);
      });
      quintoTrending.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        searchInput.textContent = titleTrending5;
        let hideSection = document.getElementById("hide-section");
        if (hideSection.classList.contains("disabled-section")) {
          hideSection.classList.remove("disabled-section");
          hideSection.classList.add("enabled-section");
        }

        let h1Hide = document.getElementById("h1");
        if (h1Hide.classList.contains("h1")) {
          h1Hide.classList.remove("h1");
          h1Hide.classList.add("disabled-h1");
        } else {
          h1Hide.classList.remove("disabled-h1");
          h1Hide.classList.add("h1");
        }
        let ilustraHide = document.getElementById("ilustra");
        if (ilustraHide.classList.contains("ilustra")) {
          ilustraHide.classList.remove("ilustra");
          ilustraHide.classList.add("disabled-ilustra");
        } else {
          ilustraHide.classList.remove("disabled-ilustra");
          ilustraHide.classList.add("ilustra");
        }
        search(json.data[4]);
        seeMoreGif(json.data[4]);
      });

      // }
    });
}
trendingTittle();

// DESPLAZAMIENTO TRENDING
document.getElementById("scroll-right").addEventListener("click", function () {
  if (screen.width >= 1280) {
    document.getElementById("container-trending").scrollLeft += 1158;
  }
});
document.getElementById("scroll-left").addEventListener("click", function () {
  if (screen.width >= 1280) {
    document.getElementById("container-trending").scrollLeft -= 1158;
  }
});

//HOVER TRENDING

document
  .getElementById("scroll-left")
  .addEventListener("mouseover", function () {
    if (screen.width >= 1280) {
      document.getElementById("chevron-left").style.color = "#ffffff";
    }
  });
document
  .getElementById("scroll-left")
  .addEventListener("mouseout", function () {
    if (screen.width >= 1280) {
      document.getElementById("chevron-left").style.color = " #572ee5";
    }
  });

document
  .getElementById("scroll-right")
  .addEventListener("mouseover", function () {
    if (screen.width >= 1280) {
      document.getElementById("chevron-right").style.color = "#ffffff";
    }
  });
document
  .getElementById("scroll-right")
  .addEventListener("mouseout", function () {
    if (screen.width >= 1280) {
      document.getElementById("chevron-right").style.color = " #572ee5";
    }
  });
