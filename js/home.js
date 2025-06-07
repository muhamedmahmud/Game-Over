const mode = document.getElementById("mode");
if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme"); //    Or dark

  if (themeData === " ") {
    mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
  } else {
    mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
  }

  document.querySelector("html").setAttribute("data-theme", themeData); //   Or dark
}
document.querySelectorAll(".menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
    const category = link.getAttribute("data-category");
    getGames(category);
  });
});
document.querySelector(".logout-btn").addEventListener("click", function () {
  localStorage.setItem("uToken", null);
  localStorage.removeItem("uToken");
  location.href = "./index.html";
});

const loader = document.querySelector(".loading");
getGames("mmorpg");
async function getGames(categoryName) {
  loader.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c99536ae2cmsh35f0d5b620c99f8p164af7jsn355365871eb3",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
    options
  );
  const response = await api.json();
  console.log(response);
  displayData(response);
  loader.classList.add("d-none");
}
function displayData(data) {
  console.log("sdfsf");
  let games = ``;
  for (let i = 0; i < data.length; i++) {
    let vidPath = data[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    games += `
       <div class="holder col-sm-6 col-md-4 col-lg-3 p-3">
      <div class="card" onmouseleave="stopVid(event)"  onmouseenter="startVid(event)">
        <div class="p-2 overflow-hidden">
          <div class="position-relative " onclick="showDetails(${data[i].id})">
            <img
              src="${data[i].thumbnail}"
              class="img-fluid"
              alt="${data[i].title}"
            />
            <video
              muted="true"
              preload="none"
              loop
              class="w-100 d-none h-100 position-absolute top-0 start-0 z-3"
            >
              <source src="${vidPath}" />
            </video>
          </div>
        </div>
        <div class="card-body d-flex justify-content-between flex-column">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text small">${data[i].short_description}</p>
          <span class="small">release date: ${data[i].release_date}</span>
          <div
            class="py-3 position-relative bottom-0 start-0 align-items-center w-100 d-flex justify-content-between border-top"
          >
            <a href="${data[i].game_url}" target="blanke" class="border-2"
              >download game</a
            >
            <a onclick="showDetails(${data[i].id})" class="btn btn-primary border-2" id="e"
               >open game</a
            >
          </div>
        </div>
      </div>
    </div>

    `;
  }
  document.getElementById("gamesData").innerHTML = games;
}
function startVid(event) {
  const vid = event.target.querySelector("video");
  vid.muted = true;
  vid.play();
  vid.classList.remove("d-none");
}
function stopVid(event) {
  const vid = event.target.querySelector("video");
  vid.pause();
  vid.classList.add("d-none");
}
function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
mode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", " ");
    mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

    localStorage.setItem("theme", " ");
  } else {
    mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
    document.querySelector("html").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

});
let f = document.getElementById("f");
f.addEventListener('click', function() {
    if (f.classList.contains("fa-bars")) {
        f.classList.remove("fa-bars");
        f.classList.add("fa-xmark");
    } else {
        f.classList.remove("fa-xmark");
        f.classList.add("fa-bars");
    }
});

