let currentTheme = document.documentElement.getAttribute("data-theme");
let currentThemeIcon = document.querySelector(".header__theme_icon");

let themeButton = document.querySelector(".header__theme_icon");
themeButton.addEventListener("click", (event) => {
  if (currentTheme === "light") {
    currentTheme = "dark";
    currentThemeIcon.src = "./assets/images/icon-sun.svg";
  } else {
    currentTheme = "light";
    currentThemeIcon.src = "./assets/images/icon-moon.svg";
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.setAttribute("header__theme_icon", currentThemeIcon);
});

let allExtensions = [];

async function loadExtensions() {
  const response = await fetch("./data.json");
  allExtensions = await response.json();
  renderCards(allExtensions);
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      buttons.forEach((b) => b.classList.remove("active"));
      event.target.classList.add("active");

      const filterValue = event.target.textContent.toLowerCase();
      filterExtensions(filterValue);
    });
  });
}

function filterExtensions(filterValue) {
  if (filterValue === "active") {
    const ativos = allExtensions.filter((ext) => ext.isActive === true);
    renderCards(ativos);
  } else if (filterValue === "inactive") {
    const inativos = allExtensions.filter((ext) => ext.isActive === false);
    renderCards(inativos);
  } else {
    renderCards(allExtensions);
  }
}

function renderCards(extensions) {
  const container = document.querySelector(".cards");
  const template = document.querySelector("#card-template");
  container.innerHTML = "";

  extensions.forEach((ext) => {
    // 1. Clona o template
    const card = template.content.cloneNode(true);

    // 2. Preenche só os dados
    card.querySelector(".card__logo").src = ext.logo;
    card.querySelector(".card__logo").alt = ext.name;
    card.querySelector(".card__title").textContent = ext.name;
    card.querySelector(".card__description").textContent = ext.description;
    card.querySelector("input").checked = ext.isActive;

    const article = card.querySelector(".card");
    card.querySelector(".card__remove").addEventListener("click", () => {
      article.remove();
    });
    // 3. Insere na página
    container.appendChild(card);
  });
}

loadExtensions();
