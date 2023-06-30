const Pagination = require('tui-pagination');
import {
  saveData,
  loadData,
  addFavorit,
  loadFavorit,
  loadFavoritCategories,
  loadFavoritFilter,
} from './service/localstorage.js';

const categoryBtns = document.querySelectorAll('.category-btn');
const heroImage = document.querySelector('.favorites-hero');
const categoriesDiv = document.querySelector('.categories');
const favBtnList = document.querySelector('.categories-list');
const noFavoritesEl = document.querySelector('.no-favorites');
const favCardsList = document.querySelector('.favorites-cards');
const pagination = document.querySelector('.pagination');

window.addEventListener('DOMContentLoaded', hideCategories);

function hideCategories() {
  if (localStorage.length !== 0) {
    return;
  } else {
    categoryBtns.forEach(btn => {
      btn.classList.add('invisible');
    });
  }
}
// функция сверху не работает

function hideHeroImageLess768() {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  if (viewportWidth < 768) {
    heroImage.classList.add('invisible');
  } else {
    heroImage.classList.remove('invisible');
  }
}
hideCategories();
hideHeroImageLess768();

window.addEventListener('load', hideHeroImageLess768);
window.addEventListener('resize', hideHeroImageLess768);

async function categoriesMarkup() {
  try {
    const favCategories = await loadFavoritCategories();
    if (favCategories) {
      favCategories.forEach(name => {
        const buttonEls =
          '<li><button class="category-btn"> ' + name + '</button></li>';
        favBtnList.insertAdjacentHTML('beforeend', buttonEls);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}
// console.log(loadFavoritCategories())
categoriesMarkup();

function hideDefaultPageContent() {
  const savedData = loadData();
  if (savedData) {
    noFavoritesEl.style.display = 'none';
  } else {
    noFavoritesEl.style.display = 'flex';
  }
}

hideDefaultPageContent();

const cardData = loadFavorit();

function cardsMarkup(card) {
  return `<li class="card" style="background-image: linear-gradient(
    rgba(5, 5, 5, 0.6),
    rgba(5, 5, 5, 0)
    ),
    url(${card.preview});">
    <div class="card-info">
        <svg class="heart-svg" width="22" height="22">
            <use href="/src/images/svg-sprite.svg#card-heart"></use>
        </svg>
        <div class="xzxzxz"> 
            <h2 class="card-title">${card.title}</h2>
            <p class="card-text">${card.description}</p>
            <div class="rating-and-btn">
                <div class="rating-section">
                    <p class="rating">${card.rating}</p>
                    <div class="stars-icons">
                        <svg class="star-svg" width="18" height="18">
                            <use href="/src/images/svg-sprite.svg#card-heart"></use>
                        </svg>
            
                        <svg class="star-svg" width="18" height="18">
                            <use href="/src/images/svg-sprite.svg#card-heart"></use>
                        </svg>
            
                        <svg class="star-svg" width="18" height="18">
                            <use href="/src/images/svg-sprite.svg#card-heart"></use>
                        </svg>
            
                        <svg class="star-svg" width="18" height="18">
                            <use href="/src/images/svg-sprite.svg#card-heart"></use>
                        </svg>
            
                        <svg class="star-svg" width="18" height="18">
                            <use href="/src/images/svg-sprite.svg#card-heart"></use>
                        </svg>
                    </div>
            
                </div>
                <button class="see-recipe-btn" data-id="${card._id}">See recipe</button>
            </div>
        </div>
    </div>
</li>`;
}
function checkResol() {
  if (cardData.length < 9 || cardData.length < 12) {
    cardRender(cardData.length);
    pagination.style.display = 'none';
    return;
  }
  if (screen.width >= 1280) {
    // console.log('1280')
    cardRender(12);
    pagination.style.display = 'flex';
    return;
  }
  if (screen.width >= 768 && screen.width < 1280) {
    // console.log('800')
    cardRender(12);
    pagination.style.display = 'flex';
    return;
  }
  if (screen.width >= 375 && screen.width < 768) {
    // console.log('400')
    cardRender(9);
    pagination.style.display = 'flex';
    return;
  }
}
// cardsMarkup();
let acum = '';
function cardRender(limit) {
  for (let i = 0; i < limit; i++) {
    acum += cardsMarkup(cardData[i]);
    console.log(acum);
  }
  favCardsList.insertAdjacentHTML('beforeend', acum);
  acum = '';
}
// checkResol();
