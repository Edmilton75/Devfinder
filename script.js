const form = document.querySelector("form");
const btn = document.querySelector(".btn-search");
const input = document.querySelector(".input-search");
let valor = "";

async function fetchUserGithub(event) {
  event.preventDefault();
  valor = input.value;
  const userResponse = await fetch(`https://api.github.com/users/${valor}`);
  const userJson = await userResponse.json();

  const container = document.querySelector(".container");

  const section = document.querySelector("section");

  const card = document.querySelector(".card-container");

  if (section) {
    container.removeChild(card);
  }

  const sectionUser = document.createElement("section");

  sectionUser.classList.add("card-container");

  container.appendChild(sectionUser);

  // formatar data com mes
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
          <img class="avatar" src="${userJson.avatar_url}" alt="" href="" />
          <div class="info">
            <div class="name-sub">
              <h1 class="perfil-name">${userJson.name}</h1>
              <p class="perfil-sub">@${userJson.login}</p>
              <p class="perfil-bio">${userJson.bio || "Not found"}</p>
            </div>
            <div class="perfil-date">
              <p>joined ${dataFormatada}</p>
            </div>
          </div>
        </div>
        <div class="card-status">
          <div class="profile-status-container">
            <div class="repos">
              <p class="repos-sub ">repos</p>
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
            <p class="user-github">${userJson.html_url || "Not available"}</p>
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
            <a href=http://www.${userJson.blog}>
            
            <img src="./assets/buildings.svg" alt="icone do portifolio" />
            <p class="user-portifolio">${userJson.blog || "Not available"}</p>
            </a>
            </div>
          </div>
        </div>
  `;
}

btn.addEventListener("click", fetchUserGithub);
