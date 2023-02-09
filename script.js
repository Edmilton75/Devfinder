const form = document.querySelector("form");
const searchBtn = document.querySelector(".btn-search");
const searchInput = document.querySelector(".input-search");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  cardGereration(searchInput.value);
});

async function cardGereration(userJson1) {
  const userResponse = await fetch(`https://api.github.com/users/${userJson1}`);

  const userJson = await userResponse.json();

  if (userResponse.status === 200) {
    const container = document.querySelector(".container");

    const section = document.querySelector("section");

    if (section) {
      container.removeChild(section);
    }

    const sectionUser = document.createElement("section");

    sectionUser.classList.add("card-container");

    container.appendChild(sectionUser);

    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    let data = new Date(userJson.created_at);
    let dataFormatada = `
      ${data.getDate()} ${meses[data.getMonth()]} ${data.getFullYear()}`;

    sectionUser.innerHTML = `
        <div class="perfil">
          <img
            class="avatar"
            src="${userJson.avatar_url}"
            alt="Avatar usuario"
          />
        </div>
        <div class="user-info">
          <div class="info">
            <div class="name-sub">
              <h1 class="perfil-name">${userJson.name}</h1>
              <p class="perfil-sub">${userJson.login}</p>
              <p class="perfil-bio ${userJson.bio ? "" : "disabled"}">${
      userJson.bio || "This profile has no bio"
    }</p>
            </div>
            <div class="perfil-date">
              <p>Joined ${dataFormatada}</p>
            </div>
          </div>
          <div class="card-status">
            <div class="profile-status-container">
              <div class="repos">
                <p class="repos-sub">repos</p>
                <p class="repos-number">${userJson.public_repos}</p>
              </div>
              <div class="followers">
                <p class="repos-sub">followers</p>
                <p class="repos-number">${userJson.followers}</p>
              </div>
              <div class="following">
                <p class="repos-sub">following</p>
                <p class="repos-number">${userJson.following}</p>
              </div>
            </div>
          </div>
          <div class="social-network">
            <div class="container-location-github">
              <div class="cont-loc-git ${userJson.location ? "" : "disabled"}">
                <img src="./assets/mapPin.svg" alt="icone de localização" />
                <p class="user-location">${
                  userJson.location || "Not available"
                }</p>
              </div>

              <div class="cont-loc-git ${userJson.html_url ? "" : "disabled"}">
                <a href=${userJson.html_url}>
                  <img src="./assets/link.svg" alt="icone do github" />
                  <p class="user-github">${
                    userJson.html_url || "Not available"
                  }</p>
                </a>
              </div>
            </div>

            <div class="container-twitter-building">
              <div class="cont-twit-build ${
                userJson.twitter_username ? "" : "disabled"
              }">
                <a href="https://${userJson.twitter_username}">
                  <img src="./assets/twitterlogo.svg" alt="icone do twitter" />
                  <p class="user-twitter">${
                    userJson.twitter_username || "Not available"
                  }</p>
                </a>
              </div>

              <div class="cont-twit-build ${userJson.blog ? "" : "disabled"}">
                <a href="http://www.${userJson.blog}">
                  <img src="./assets/buildings.svg" alt="icone do portifolio" />
                  <p class="user-portifolio">${
                    userJson.blog || "Not available"
                  }</p>
                </a>
              </div>
            </div>
          </div>
        </div>
    `;
  } else if (searchInput.value === "") {
    alert("Usuario não preenchido");
  } else {
    alert("Usuario não encontrado");
  }
}
