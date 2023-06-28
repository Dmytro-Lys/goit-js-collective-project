import { saveData, loadData,  addFavorit, loadFavorit, loadFavoritCategories, loadFavoritFilter } from './service/localstorage.js'

const categoryBtns = document.querySelectorAll('.category-btn');
const heroImage = document.querySelector('.favorites-hero');
const categoriesDiv = document.querySelector('.categories');
const favBtnList = document.querySelector('.categories-list');
const noFavoritesEl = document.querySelector('.no-favorites');
const favCardsList = document.querySelector('.favorites-cards');


window.addEventListener('DOMContentLoaded', hideCategories);

function hideCategories() {
    if (localStorage.length !== 0) {
        return;
    }
    else {
        categoryBtns.forEach(btn => {
            btn.classList.add('invisible');
        });
    }
}
// функция сверху не работает 

function hideHeroImageLess768() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 768) {
        heroImage.classList.add('invisible');
    }
    else {
        heroImage.classList.remove('invisible');
    }
}
hideCategories();
hideHeroImageLess768();

window.addEventListener("load", hideHeroImageLess768);
window.addEventListener("resize", hideHeroImageLess768);

function categoriesMarkup() {
    const favCategories = loadFavoritCategories();
    
    favCategories.forEach(function(name) {
        const buttonEls = '<li><button class="category-btn"> ' + name + '</button></li>';
      favBtnList.insertAdjacentHTML('beforeend', buttonEls);
    }); 
}

categoriesMarkup();

function hideDefaultPageContent() {
    const savedData = loadData();
    if (savedData) {
           noFavoritesEl.style.display = "none" 
    }
    else {
        noFavoritesEl.style.display = "flex" 
    }
}
hideDefaultPageContent();

const cardData = loadFavorit();


function cardsMarkup(card) {
  const { title, description, preview, rating } = card;

  return `
    <li class="card_favorites" style="background-image: url(${preview});">
      <svg class="heart-svg" width="22" height="22">
        <use href="/src/images/svg-sprite.svg#card-heart"></use>
      </svg>
      <h2 class="card-title">${title}</h2>
      <p class="card-text">${description}</p>
      <div class="rating-and-btn">
        <p class="rating">${rating}</p>
        <button class="see-recipe-btn">See recipe</button>
      </div>
    </li>
  `;
}

cardsMarkup();

const renderedCards = cardData.map(cardsMarkup).join('');
favCardsList.insertAdjacentHTML('beforeend', renderedCards);
