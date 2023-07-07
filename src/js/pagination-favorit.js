
import { event } from "jquery"
// import { loadFavoritCategories} from './service/api'
import { renderCards } from "./recipes";
import {
    loadFilterFavoritRecipes,
    saveFilterFavoritRecipes,
    addFavorit,
    loadFavorit,
    loadFavoritCategories,
    loadFavoritFilter
} from "./service/localstorage";
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
const _ = require('lodash');


const refs = {
    lilLeftBtn: document.querySelector('.lil-left-skip'),
    bigLeftBtn: document.querySelector('.big-left-skip'),
    currentPage: document.querySelector('.current-page'),
    nextPage: document.querySelector('.next-page'),
    lastOptionPage: document.querySelector('.last-option-page'),
    midSkip: document.querySelector('.mid-skip'),
    lilRightBtn: document.querySelector('.lil-rigth-skip'),
    bigRightBtn: document.querySelector('.big-rigth-skip'),
    midBtns: document.querySelector('.mid-btns'),
    leftBtns: document.querySelector('.left-btns'),
    rightBtns: document.querySelector('.right-btns'),
    pagination: document.querySelector('.pagination'),
    stars: document.querySelectorAll('.star-svg'),
    noFavorits: document.querySelector(".no-favorites"),
    btnAllCatagory: document.querySelector(".btn-all-categories"),
    favBtnList: document.querySelector('.categories-list'),
    categories: document.querySelector('.categories'),
    list: document.querySelector('.cards-list')
    
}

let limit = 0;
let maxPages = null;
const isFavorit = refs.list.classList.contains('cards-list-favorit');

if (isFavorit) {
    refs.midBtns.addEventListener('click', _.throttle(pageIncrease, 500))
    refs.leftBtns.addEventListener('click', returnToStart)
    refs.rightBtns.addEventListener('click', switchToNextPage)
}
 
if (refs.categories) refs.categories.addEventListener("click", onFavCategory);

function pageIncrease(event) {
    // console.log(event.target.classList.contains('mid-btn'))
    if (event.target.classList.contains('mid-btn') === false) {
        return
    }
    if (event.target.textContent == refs.currentPage.textContent || event.target.textContent === '...' || event.target.textContent === ' ') {
        return
    }
    refs.currentPage.textContent = event.target.textContent;

    pageChange(Number.parseInt(`${refs.currentPage.textContent}`))
    if (refs.currentPage.textContent == maxPages) {
        blockRightBtns()
    }
    blockLeftClear();
    setOptions();
    // checkMaxPage();
}

function returnToStart(event) {
    if (event.target.getAttribute('data-skip') === 'big') {
        refs.currentPage.textContent = 1;
        pageChange(refs.currentPage.textContent)
        blockLeftBtns();
        blockRightClear()
        setOptions();
        return
    }
    if (event.target.getAttribute('data-skip') === 'lil') {
        if (refs.currentPage.textContent !== '1') {
            refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) - 1;
            pageChange(Number.parseInt(`${refs.currentPage.textContent}`))

             if (refs.currentPage.textContent === '1') {
                setOptions();
                blockLeftBtns();
                return
            } 
            blockRightClear()
            setOptions();
            // checkMaxPage();
            return
        }
    }

}

function switchToNextPage(event) {
     if (event.target.getAttribute('data-skip') === 'big') {
        refs.currentPage.textContent = maxPages;
        pageChange(maxPages)

         blockRightBtns();
        setOptions();
         return
    }
    if (event.target.getAttribute('data-skip') === 'lil') {
        if (refs.currentPage.textContent < maxPages) {
            refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) + 1;
            blockLeftClear()
            pageChange(Number.parseInt(`${refs.currentPage.textContent}`))
             if (refs.currentPage.textContent == maxPages) {
                blockRightBtns()
            }
            setOptions()
        }
    }
}


function setOptions() {
    const currPage = Number.parseInt(refs.currentPage.textContent);
    refs.nextPage.textContent = currPage < maxPages ? `${currPage + 1}` : " ";
    refs.lastOptionPage.textContent = currPage < maxPages - 1 ? `${currPage + 2}` : " ";
}

function blockLeftBtns() {
    refs.bigLeftBtn.setAttribute('disabled', true)
    refs.lilLeftBtn.setAttribute('disabled', true)
    refs.bigRightBtn.removeAttribute("disabled");
    refs.lilRightBtn.removeAttribute("disabled");
}

function blockRightBtns() {
    refs.bigRightBtn.setAttribute('disabled', true)
    refs.lilRightBtn.setAttribute('disabled', true)
    refs.bigLeftBtn.removeAttribute("disabled");
    refs.lilLeftBtn.removeAttribute("disabled");
}

function blockRightClear() {
    refs.bigRightBtn.removeAttribute("disabled");
    refs.lilRightBtn.removeAttribute("disabled");
}

function blockLeftClear() {
    refs.bigLeftBtn.removeAttribute("disabled");
    refs.lilLeftBtn.removeAttribute("disabled"); 
}
 
function checkResol() {
    if (screen.width >= 1280) {
        // console.log('1280')
        limit = 12;
        return
    }
    if (screen.width >= 768 && screen.width < 1280) {
        // console.log('800')
        limit = 12;
        return
    }
    if (screen.width >= 375 && screen.width < 768) {
        // console.log('400')
        limit = 9;
        return
    }
}

function allFavCategoriesSearch(filter) {
    saveFilterFavoritRecipes({...loadFilterFavoritRecipes(), ...filter, limit});
    refs.currentPage.textContent = '1';
    blockLeftBtns();
    loadFavoritFilter(loadFilterFavoritRecipes()).then(respone => {
        maxPages = respone.totalPages;
        renderCards(respone.results);
        if (respone.results.length > 0) addClassFavorit();
        if (maxPages == 1 || !maxPages) return refs.pagination.style.display = 'none';
        refs.pagination.style.display = 'flex';
        setOptions();
    })
}

async function renderFavoritCards() {
    try {
        // if (!isFavorit) return;
        await categoriesMarkup();
        // console.log("renderFavoritCards on home")
        const respone = await loadFavoritFilter(loadFilterFavoritRecipes())

        if (respone.results.length === 0) {
              refs.btnAllCatagory.classList.add("category-btn-active");
              return   allFavCategoriesSearch({ category: "" });
        }
         maxPages = respone.totalPages;
         renderCards(respone.results);
        if (respone.results.length > 0) addClassFavorit();
        if (maxPages == 1 || !maxPages) return refs.pagination.style.display = 'none';
        refs.pagination.style.display = 'flex';
        setOptions();
        
    } catch (err) {
        onError(err)
    }
 }



function pageChange(page) {
    saveFilterFavoritRecipes({ ...loadFilterFavoritRecipes(),
     page,
    limit
})
    loadFavoritFilter(loadFilterFavoritRecipes()).then(respone => {
  
    renderCards(respone.results)
    addClassFavorit();  
})
}


function addClassFavorit() {
    const card = document.querySelectorAll(".card");
    const cardInfo = document.querySelectorAll(".card-info");
    const heart = document.querySelectorAll(".heart-svg");
    card.forEach(card => card.classList.add("card-favorit"));
    cardInfo.forEach(card => card.classList.add("card-info-favorit"));
    heart.forEach(card => card.classList.add("heart-svg-fav"));
}

// categories
async function categoriesMarkup() {
  try {
      const favCategories = await loadFavoritCategories();
    if (favCategories.length > 0) {
        refs.btnAllCatagory.classList.remove("invisible");
        
        refs.noFavorits.style.display = "none";
        refs.favBtnList.innerHTML = "";
        const { category } = loadFilterFavoritRecipes()
      favCategories.forEach(name => {
        const buttonEls =
          `<li><button class="category-btn${category === name ? " category-btn-active" : ""}">${name}</button></li>`;
          refs.favBtnList.insertAdjacentHTML('beforeend', buttonEls);
      });
       if (category !== undefined && !category) refs.btnAllCatagory.classList.add("category-btn-active");
    } else {
      refs.noFavorits.style.display = "flex";
      refs.favBtnList.innerHTML = "";
      refs.btnAllCatagory.classList.add("invisible");
    }
  } catch (error) {
   onError(error)
  }
}

function onFavCategory(e) {
    if (e.target.classList.contains("category-btn")) {
       const oldActive = refs.categories.querySelector(".category-btn-active");
       if (oldActive) oldActive.classList.remove("category-btn-active");
       e.target.classList.add("category-btn-active");
      allFavCategoriesSearch({
        category: !e.target.classList.contains("btn-all-categories") ? e.target.textContent : ""
      })
    }
}

if (isFavorit) {
    checkResol()
    blockLeftBtns();
    saveFilterFavoritRecipes({ limit });
    renderFavoritCards();
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}

 export {renderFavoritCards}