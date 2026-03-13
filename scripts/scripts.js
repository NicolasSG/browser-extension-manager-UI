let currentTheme = document.documentElement.getAttribute("data-theme");
const currentThemeIcon = document.querySelector(".header__theme_icon");

let themeButton = document.querySelector(".header__theme_icon");
themeButton.addEventListener("click", () => {
  if (currentTheme === "light") {
    announcer.textContent = "Dark theme activated";
    currentTheme = "dark";
    currentThemeIcon.src = "./assets/images/icon-sun.svg";
  } else {
    announcer.textContent = "Light theme activated";
    currentTheme = "light";
    currentThemeIcon.src = "./assets/images/icon-moon.svg";
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.setAttribute("header__theme_icon", currentThemeIcon);
});

let allExtensions = [];

async function loadExtensions() {
  try {
    const response = await fetch("./data.json");
    allExtensions = await response.json();
    renderCards(allExtensions);
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        buttons.forEach((b) => b.classList.remove("active"));
        buttons.forEach((b) => (b.ariaPressed = "false"));
        event.target.classList.add("active");
        event.target.ariaPressed = "true";

        const filterValue = event.target.textContent.toLowerCase().trim();
        filterExtensions(filterValue);
      });
    });
  } catch (error) {
    const container = document.querySelector(".cards");
    container.innerHTML = "<p>Falha ao carregar dados</p>";
    announcer.textContent = "Falha ao carregar dados";
    console.error("Erro ao carregar extensões:", error);
  }
}

function filterExtensions(filterValue) {
  let filtered;

  if (filterValue === "active") {
    filtered = allExtensions.filter((ext) => ext.isActive === true);
  } else if (filterValue === "inactive") {
    filtered = allExtensions.filter((ext) => ext.isActive === false);
  } else {
    filtered = allExtensions;
  }

  announcer.textContent = filtered.length + " extensions found";
  renderCards(filtered);
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

    card
      .querySelector(".card__remove")
      .setAttribute("aria-label", "Remove " + ext.name);

    card.querySelector(".sr-only").textContent = "Toggle " + ext.name;
    const article = card.querySelector(".card");
    card.querySelector(".card__remove").addEventListener("click", () => {
      announcer.textContent = ext.name + " card removed";
      allExtensions = allExtensions.filter((e) => e.name !== ext.name);
      article.remove();
    });

    card.querySelector("input").addEventListener("change", (event) => {
      const ext_found = allExtensions.find((e) => e.name === ext.name);
      if (ext_found) {
        ext_found.isActive = event.target.checked;
      }

      if (event.target.checked) {
        announcer.textContent = ext.name + " toggle activated";
      } else {
        announcer.textContent = ext.name + " toggle deactivated";
      }
    });
    // 3. Insere na página
    container.appendChild(card);
  });
}

loadExtensions();
