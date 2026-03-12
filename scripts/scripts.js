async function loadExtensions() {
  const response = await fetch("./data.json");
  const data = await response.json();
  renderCards(data);
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
