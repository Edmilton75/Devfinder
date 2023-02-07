const form = document.querySelector("#campo");
async function fetchUserGithub(event) {
  event.preventDefault();
  console.log(event.target.value);
  const value = event.target.value;

  console.log(value);

  const userResponse = await fetch(`https://api.github.com/users/${value}`);
  const userJson = await userResponse.json();

  const divContainer = document.querySelector(".container");
  console.log(userJson);

  const sectionUser = document.createElement("section");
  sectionUser.classList.add("card-container");
  divContainer.appendChild(sectionUser);

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
  let dataFormatada =
    data.getDate() + " " + meses[data.getMonth()] + " " + data.getFullYear();

  sectionUser.innerHTML = `
  <div class="perfil">
          <img class="avatar" src="${userJson.avatar_url}" alt="" href="" />
          <div class="info">
            <div class="name-sub">
              <h1 class="perfil-name">${userJson.name}</h1>
              <p class="perfil-sub">@${userJson.login}</p>
              <p class="perfil-bio">${userJson.bio}</p>
            </div>
            <div class="perfil-date">
              <p>joined ${dataFormatada}</p>
            </div>
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
            <div class="cont-loc-git">
              <img src="./assets/mapPin.svg" alt="icone de localização" />
              <p class="user-location">${userJson.location || "not found"}</p>
            </div>

            <div class="cont-loc-git">
              <img src="./assets/link.svg" alt="icone do github" />
              <p class="user-github">${userJson.html_url}</p>
            </div>
          </div>

          <div class="container-twitter-building">
            <div class="cont-twit-build">
              <img src="./assets/twitterlogo.svg" alt="icone do twitter" />
              <p class="user-twitter">${
                userJson.twitter_username || "not found"
              }</p>
            </div>

            <div class="cont-twit-build">
              <img src="./assets/buildings.svg" alt="icone do portifolio" />
              <p class="user-portifolio">${userJson.blog || "not found"}</p>
            </div>
          </div>
        </div>
  `;
}

form.addEventListener("change", fetchUserGithub);

//saída: 31 Dez 2019
