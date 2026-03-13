# Frontend Mentor - Browser Extensions Manager UI

## Visão Geral

Este projeto foi desenvolvido como parte de um desafio do [Frontend Mentor](https://www.frontendmentor.io), com o objetivo de construir uma interface de gerenciamento de extensões de navegador usando HTML, CSS e JavaScript puro.

---

## O Desafio

Os usuários são capazes de:

- Visualizar todas as extensões carregadas dinamicamente a partir de um arquivo `data.json`
- Alternar extensões entre os estados ativo e inativo
- Filtrar extensões por status: All, Active e Inactive
- Remover extensões da lista
- Alternar entre tema claro e escuro
- Visualizar o layout otimizado de acordo com o tamanho da tela do dispositivo

---

### CSS com Variáveis e Temas

Usei **CSS Custom Properties** (variáveis) para gerenciar cores de forma centralizada. Isso tornou a troca de tema claro/escuro muito simples — só é necessário mudar o atributo `data-theme` no HTML.

```css
[data-theme="dark"] {
  --color-bg: linear-gradient(180deg, #040918 0%, #091540 100%);
  --color-accent: hsl(3, 87%, 64%);
}

[data-theme="light"] {
  --color-bg: linear-gradient(180deg, #ebf2fc 0%, #eef8f9 100%);
  --color-accent: hsl(3, 77%, 44%);
}
```

### Toggle com CSS Puro

Construí um toggle switch customizado usando apenas CSS, aproveitando o truque do `input:checked` com o seletor de irmão adjacente (`+`):

```css
input:checked + .toggle__slider {
  background-color: var(--color-accent);
}
```

### CSS Grid e Flexbox

Usei **Flexbox** para alinhar elementos dentro de componentes (header, controls, cards internamente) e **CSS Grid** para organizar a grade de cards:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

### JavaScript — Carregamento Dinâmico de Dados

Usei `fetch` com `async/await` para carregar dados de um arquivo JSON e renderizá-los na página dinamicamente:

```js
async function loadExtensions() {
  const response = await fetch("./data.json");
  allExtensions = await response.json();
  renderCards(allExtensions);
}
```

### JavaScript — Template Cloning

Em vez de escrever HTML dentro do JavaScript com `innerHTML`, aprendi a clonar o `<template>` do HTML e apenas preencher os dados. Isso mantém o código mais organizado:

```js
const card = template.content.cloneNode(true);
card.querySelector(".card__title").textContent = ext.name;
```

### JavaScript — Filtros e Estado

Mantive os dados originais em uma variável global (`allExtensions`) e usar o método `.filter()` dos arrays para filtrar sem perder os dados originais:

```js
const ativos = allExtensions.filter((ext) => ext.isActive === true);
renderCards(ativos);
```

### JavaScript — Troca de Tema

Alternei atributos HTML via JavaScript para ativar diferentes temas CSS:

```js
const currentTheme = document.documentElement.getAttribute("data-theme");
const newTheme = currentTheme === "dark" ? "light" : "dark";
document.documentElement.setAttribute("data-theme", newTheme);
```

---

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 (Custom Properties, Flexbox, Grid, Transitions)
- JavaScript (ES6+, Fetch API, async/await, DOM manipulation)

---

## Autor

- Frontend Mentor - [@NicolasSG](https://www.frontendmentor.io/profile/NicolasSG)
