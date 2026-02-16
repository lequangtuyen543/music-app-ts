// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));

  const ap = new APlayer({
    container: aplayer,
    autoplay: true,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
  });

  const avatar = document.querySelector(".inner-avatar");

  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });
}
// End APlayer

// Button Like

const buttonLike = document.querySelector("[button-like]");

if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");

    console.log(isActive);

    const typeLike = isActive ? "no" : "yes";

    fetch(`/songs/like/${typeLike}/${idSong}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.code = 200)) {
          buttonLike.querySelector("span").innerHTML = `${data.like} thích`;

          buttonLike.classList.toggle("active");
        }
      });
  });
}

// End Button Like

// Button Favorite

const buttonFavorite = document.querySelector("[button-favorite]");

if (buttonFavorite) {
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active");

    const typeFavorite = isActive ? "unfavorite" : "favorite";

    fetch(`/songs/favorite/${typeFavorite}/${idSong}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          buttonFavorite.classList.toggle("active");
        }
      });
  });
}

// End Button Favorite

// Search Suggest

const boxSearch = document.querySelector(".box-search");

if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", (e) => {
    const keyword = e.target.value || "";

    fetch(`/search/suggest?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.songs.length > 0) {
          boxSuggest.classList.add("show");

          const htmls = data.songs.map((song) => {
            return `
              <a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image"><img src=${song.avatar}></div>
                <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                </div>
              </a>
            `;
          });

          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}

// End Search Suggest