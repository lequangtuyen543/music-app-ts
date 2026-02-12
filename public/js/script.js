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