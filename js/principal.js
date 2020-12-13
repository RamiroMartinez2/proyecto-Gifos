let inputText = document.getElementById("input-text");
let btn = document.getElementById("search-icon");
let container = document.getElementById("container");
let containerGifos = document.getElementById("results-more");
let searchInput = document.getElementById("h2");
let containerSuggestions = document.getElementById("container-suggestions");
let seeMore = document.getElementById("see-more");
let form = document.getElementById("form");
let main = document.getElementById("main");
let footer = document.getElementById("footer");
let imgMax = document.getElementById("container-img");
let closeIcon = document.getElementById("close-icon");

let arregloFavoritos = [];

let arregloGift = [];

// BUSQUEDA GIFOS

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const q = inputText.value;
  search(q);
  seeMoreGif(q);
});



function search(q) {
  let offset = 0;
  let cantidadGift = 12;

  const APIKEY = "jAO1bZbtzM7A4mao2KGShgEF2qW9Ath0";
  const URL = `https://api.giphy.com/v1/gifs/search?&api_key=${APIKEY}&q=${q}&limit=${cantidadGift}&${offset}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // let arregloGift = [];
      container.innerHTML = "";
      // console.log(json);
      class gif {
        constructor(src, username, title, id) {
          this.src = src;
          this.username = username;
          this.title = title;
          this.id = id;
        }
      }
      for (i = offset; i < cantidadGift + offset; i++) {
        let newId = json.data[i].id;
        let newSrc = json.data[i].images.original.url;
        let newTitle = json.data[i].title;
        let newUserName = json.data[i].username;
        let gift = new gif(newSrc, newUserName, newTitle, newId);
        arregloGift.push(gift);

        let div = document.createElement("div");
        div.setAttribute("class", "div-container");
        let img = document.createElement("img");
        img.setAttribute("class", "img");
        img.src = newSrc;
        img.id = newId;
        img.title = newTitle;
        img.user = newUserName;
        div.appendChild(img);
        container.appendChild(div);

        // MOBILE VIEW
        if (imgMax.classList.contains("container-imgMax")) {
          imgMax.classList.remove("container-imgMax");
        }
        img.addEventListener("click", abrirGifosMax);

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
            title.textContent = img.title;
            userName.textContent = img.user;
          });
          div.addEventListener("mouseout", () => {
            divCards.style.visibility = "hidden";
          });

          likeButton.addEventListener("click", () => {
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

// VER MAS GIF

function seeMoreGif(q) {
  let offset = 12;
  let cantidadGift = 24;

  const APIKEY = "jAO1bZbtzM7A4mao2KGShgEF2qW9Ath0";
  const URL = `https://api.giphy.com/v1/gifs/search?&api_key=${APIKEY}&q=${q}&limit=${cantidadGift}&${offset}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // let arregloGift = [];
      containerGifos.innerHTML = "";
      // console.log(json);
      class gifMore {
        constructor(src, username, title, id) {
          this.src = src;
          this.username = username;
          this.title = title;
          this.id = id;
        }
      }
      for (i = offset; i < cantidadGift + offset; i++) {
        let newId = json.data[i].id;
        let newSrc = json.data[i].images.original.url;
        let newTitle = json.data[i].title;
        let newUserName = json.data[i].username;
        let gift = new gifMore(newSrc, newUserName, newTitle, newId);
        arregloGift.push(gift);

        let div = document.createElement("div");
        div.setAttribute("class", "div-container");
        let img = document.createElement("img");
        img.setAttribute("class", "img");
        img.src = newSrc;
        img.id = newId;
        img.title = newTitle;
        img.user = newUserName;
        div.appendChild(img);
        containerGifos.appendChild(div);

        if (imgMax.classList.contains("container-imgMax")) {
          imgMax.classList.remove("container-imgMax");
        }

        if (imgMax.classList.contains("container-imgMax")) {
          imgMax.classList.remove("container-imgMax");
        }
        img.addEventListener("click", abrirGifosMax);
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
            title.textContent = img.title;
            userName.textContent = img.username;
          });
          div.addEventListener("mouseout", () => {
            divCards.style.visibility = "hidden";
          });

          likeButton.addEventListener("click", () => {
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
            function objetoFav(id, src, title, user) {
              this._id = id;
              this._src = src;
              this._title = title;
              this._user = user;
            }

            let ObjetoFav = new objetoFav(img.id, img.src, img.title, img.user);

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

seeMore.addEventListener("click", () => {
  if (containerGifos.classList.contains("disabled-results-more")) {
    containerGifos.classList.remove("disabled-results-more");
    containerGifos.classList.add("container-gifos-more");
    seeMore.style.display = "none";
  }
});
document.getElementById("h3-trending").style.cursor = "pointer";



btn.addEventListener("click", () => {
  containerSuggestions.innerHTML = "";
  form.style.height = "50px";
  searchInput.textContent = inputText.value;
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
});

closeIcon.addEventListener("click", () => {
  form.style.height = "50px";
  document.getElementById("input-text").value = "";

  let hideSection = document.getElementById("hide-section");

  if (hideSection.classList.contains("enabled-section")) {
    hideSection.classList.remove("enabled-section");
    hideSection.classList.add("disabled-section");
  }
  let h1Hide = document.getElementById("h1");
  if (h1Hide.classList.contains("disabled-h1")) {
    h1Hide.classList.remove("disabled-h1");
    h1Hide.classList.add("h1");
  }
  let ilustraHide = document.getElementById("ilustra");
  if (ilustraHide.classList.contains("disabled-ilustra")) {
    ilustraHide.classList.remove("disabled-ilustra");
    ilustraHide.classList.add("ilustra");
  }
  if (containerGifos.classList.contains("container-gifos-more")) {
    containerGifos.classList.remove("container-gifos-more");
    containerGifos.classList.add("disabled-results-more");
    seeMore.style.display = "block";
  }
});
// AUTOCOMPLETE //
function autoComplete() {
  let inputText = document.getElementById("input-text").value;
  const APIKEY = "jAO1bZbtzM7A4mao2KGShgEF2qW9Ath0";
  const URL = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&q=${inputText}`;
  // console.log(URL);
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      containerSuggestions.innerHTML = "";
      arrayAutoComplete = [];
      let search1 = document.createElement("i");
      let search2 = document.createElement("i");
      let search3 = document.createElement("i");
      let search4 = document.createElement("i");

      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      let span3 = document.createElement("span");
      let span4 = document.createElement("span");
      let br1 = document.createElement("br");
      let br2 = document.createElement("br");
      let br3 = document.createElement("br");
      let br4 = document.createElement("br");
      let div = document.createElement("div");

      div.style.width = "325px";
      div.style.borderTop = "1px solid #9CAFC3";
      div.style.opacity = "0.5";
      div.style.marginLeft = "20px";
      div.style.marginTop = "10px";
      div.style.height = "0.5px";

      span1.textContent = json.data[0].name;

      search1.setAttribute("class", "fas fa-search primero");

      containerSuggestions.appendChild(search1);

      span1.style.overflow - "hidden";
      span1.style.cursor = "pointer";
      span1.style.width = "100%";
      span1.style.color = "#9CAFC3";
      span1.style.fontFamily = "Roboto-Regular";
      span1.style.fontSize = "16px";
      span1.style.textAlign = "left";
      span1.style.marginLeft = "-214px";
      span1.style.position = "relative";
      span1.style.top = "14px";

      span2.textContent = json.data[1].name;
      search2.setAttribute("class", "fas fa-search  segundo");
      containerSuggestions.appendChild(search2);

      span2.style.cursor = "pointer";
      span2.style.color = "#9CAFC3";
      span2.style.width = "100%";
      span2.style.fontFamily = "Roboto-Regular";
      span2.style.fontSize = "16px";
      span2.style.textAlign = "left";
      span2.style.marginLeft = "-217px";
      span2.style.position = "relative";
      span2.style.top = "25px";

      span3.textContent = json.data[2].name;
      search3.setAttribute("class", "fas fa-search tercero");
      containerSuggestions.appendChild(search3);

      span3.style.cursor = "pointer";
      span3.style.color = "#9CAFC3";
      span3.style.width = "100%";
      span3.style.fontFamily = "Roboto-Regular";
      span3.style.fontSize = "16px";
      span3.style.textAlign = "left";
      span3.style.marginLeft = "-199px";
      span3.style.position = "relative";
      span3.style.top = "32px";

      span4.textContent = json.data[3].name;
      search4.setAttribute("class", "fas fa-search cuarto");

      containerSuggestions.appendChild(search4);

      span4.style.cursor = "pointer";
      span4.style.color = "#9CAFC3";
      span4.style.width = "100%";
      span4.style.fontFamily = "Roboto-Regular";
      span4.style.fontSize = "16px";
      span4.style.textAlign = "left";
      span4.style.marginLeft = "-201px";
      span4.style.position = "relative";
      span4.style.top = "40px";
      span1.appendChild(br1);
      span2.appendChild(br2);
      span3.appendChild(br3);
      span4.appendChild(br4);
      div.appendChild(span1);
      div.appendChild(span2);
      div.appendChild(span3);
      div.appendChild(span4);
      containerSuggestions.appendChild(div);
      arrayAutoComplete.push(span1);
      arrayAutoComplete.push(span2);
      arrayAutoComplete.push(span3);
      arrayAutoComplete.push(span4);
      containerSuggestions.appendChild(div);
      search1.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        document.getElementById("input-text").value = json.data[0].name;
        document.getElementById("h2").textContent = json.data[0].name;
        document
          .getElementById("hide-section")
          .classList.remove("disabled-section");
        document
          .getElementById("hide-section")
          .classList.add("enabled-section");
        document;
        seeMoreGif(json.data[0].name);
        search(json.data[0].name);
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
      });
      search2.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        document.getElementById("input-text").value = json.data[1].name;
        document.getElementById("h2").textContent = json.data[1].name;
        document
          .getElementById("hide-section")
          .classList.remove("disabled-section");
        document
          .getElementById("hide-section")
          .classList.add("enabled-section");
        seeMoreGif(json.data[1].name);
        search(json.data[1].name);

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
      });
      search3.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        document.getElementById("input-text").value = json.data[2].name;
        document.getElementById("h2").textContent = json.data[2].name;
        document
          .getElementById("hide-section")
          .classList.remove("disabled-section");
        document
          .getElementById("hide-section")
          .classList.add("enabled-section");
        seeMoreGif(json.data[2].name);
        search(json.data[2].name);
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
      });
      search4.addEventListener("click", () => {
        containerSuggestions.innerHTML = "";
        form.style.height = "50px";
        document.getElementById("input-text").value = json.data[3].name;
        document.getElementById("h2").textContent = json.data[3].name;
        document
          .getElementById("hide-section")
          .classList.remove("disabled-section");
        document
          .getElementById("hide-section")
          .classList.add("enabled-section");
        seeMoreGif(json.data[3].name);
        search(json.data[3].name);
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
      });
      closeIcon.addEventListener("click", () => {
        div.style.visibility = "hidden";
      });
    });
}
inputText.addEventListener("input", () => {
  document.getElementById("search-icon").style.position = "relative";
  document.getElementById("search-icon").style.left = "-247px";
  if (document.getElementById("close-icon").classList.contains("hide")) {
    document.getElementById("close-icon").classList.remove("hide");
  }
  form.style.height = "200px";
  autoComplete();
});

inputText.addEventListener("keydown", (event) => {
  var key = event.key;
  if ((key = "Backspace")) {
    // event.stopPropagation();
    containerSuggestions.innerHTML = "";
    form.style.height = "50px";
  }
});

// TRENDING //

//SECTION MIS GIFOS//

function showGifos() {
  document.getElementById("gifos").classList.remove("disabled-gifos");
  document.getElementById("gifos").classList.add("enabled-gifos");
  document.getElementById("section-1").classList.add("section-1-hide");
  document.getElementById("section-2").classList.add("section-2-hide");
  document.getElementById("opcs-menu").classList.add("disabled-menu");
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("results-more").style.display = "none";
  document.getElementById("div-line-grey").style.display = "none";
  document.getElementById("h2").style.display = "none";
  document.getElementById("see-more").style.display = "none";
  document.getElementById("gifos").style.display = "grid";
}

document.getElementById("button-gif").onclick = function () {
  showGifos();
};
