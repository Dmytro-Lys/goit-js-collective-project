import { event } from "jquery"
import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import { renderCards } from "./recipes";
import {
    loadFilterFavoritRecipes,
    saveFilterFavoritRecipes,
    addFavorit,
    loadFavorit,
    loadFavoritCategories,
    loadFavoritFilter
} from "./service/localstorage"
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
    stars: document.querySelectorAll('.star-svg')
}

let limit = 0;
let maxPages = null;


checkResol()
blockLeftBtns();


refs.midBtns.addEventListener('click', _.throttle(pageIncrease, 500))
refs.leftBtns.addEventListener('click', returnToStart)
refs.rightBtns.addEventListener('click', switchToNextPage)

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
    checkMaxPage();
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
            checkMaxPage();
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
        checkMaxPage();
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
            checkMaxPage()
        }
    }
}

function checkMaxPage() {
    if (refs.currentPage.textContent >= (maxPages - 1)) {
        refs.lastOptionPage.textContent = ' ';
    }
    if (refs.currentPage.textContent == maxPages) {
        refs.nextPage.textContent = ' ';
    }
    
}



function setOptions() {
    refs.nextPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) + 1;
    refs.lastOptionPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) + 2;
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

function allCategoriesSearch(filter) {
    saveFilterFavoritRecipes({...loadFilterFavoritRecipes(), ...filter, limit});
    refs.currentPage.textContent = '1';
    blockLeftBtns();
    loadFavoritFilter(loadFilterFavoritRecipes()).then(respone => {
        maxPages = respone.totalPages;
        renderCards(respone.results);
        addClassFavorit();
        if (maxPages == 1 || !maxPages) return refs.pagination.style.display = 'none';
    })
    refs.pagination.style.display = 'flex';
    setOptions();
}

async function renderFavoritCards() {
    const respone = await loadFavoritFilter(loadFilterFavoritRecipes())
        renderCards(respone.results);
        // .then(respone => {
        // renderCards(respone.results);
        addClassFavorit();
    //  })
}
// console.log(refs.stars)



function pageChange(page) {
    loadFavoritFilter({ ...loadFilterFavoritRecipes(),
     page,
    limit
}).then(respone => {
  
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

loadFavoritFilter({
    page: '1',
    limit
}).then(respone => {
    maxPages = respone.totalPages;
    renderCards(respone.results);
    addClassFavorit();
    if (maxPages == 1 || !maxPages) return refs.pagination.style.display = 'none';
    refs.pagination.style.display = 'flex';
    setOptions();
})

export {allCategoriesSearch, renderFavoritCards}