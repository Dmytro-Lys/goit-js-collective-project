import { saveData, loadData,  addFavorit, loadFavorit } from './service/localstorage.js'

const categoryBtns = document.querySelectorAll('.category-btn');
const heroImage = document.querySelector('.favorites-hero');
const categoriesDiv = document.querySelector('.categories');
const favBtnList = document.querySelector('.categories-list');
const noFavoritesEl = document.querySelector('.no-favorites');
const savedData = loadData('cardData');

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



function markup() {
    const noFavoritesEl = document.querySelector('.no-favorites'); 
    const savedData = localStorage.getItem('cardData');
    if (savedData) {
           noFavoritesEl.style.display = "none" 
    }
    else {
        noFavoritesEl.style.display = "flex" 
    }
}
markup();