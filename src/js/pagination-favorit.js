import { event } from "jquery"
import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import { loadFavoritFilter } from './service/localstorage'
import { renderCards, paintStarts } from "./recipes";
const _ = require('lodash');


const refs = {
    lilLeftBtn: document.querySelector('.lil-left-skip-fav'),
    bigLeftBtn: document.querySelector('.big-left-skip-fav'),
    currentPage: document.querySelector('.current-page-fav'),
    nextPage: document.querySelector('.next-page-fav'),
    lastOptionPage: document.querySelector('.last-option-page-fav'),
    midSkip: document.querySelector('.mid-skip-fav'),
    lilRightBtn: document.querySelector('.lil-rigth-skip-fav'),
    bigRightBtn: document.querySelector('.big-rigth-skip-fav'),
    midBtns: document.querySelector('.mid-btns-fav'),
    leftBtns: document.querySelector('.left-btns-fav'),
    rightBtns: document.querySelector('.right-btns-fav'),
    pagination: document.querySelector('.pagination-fav'),
    stars: document.querySelectorAll('.star-svg')
}

const OPTIONS = {
    category: null,
    title: null,
    page: 1,
    limit: 9
}
checkResol()
blockLeftBtns();


refs.midBtns.addEventListener('click', _.throttle(pageIncrease, 500))
refs.leftBtns.addEventListener('click', returnToStart)
refs.rightBtns.addEventListener('click', switchToNextPage)

let maxPages = null;

function pageIncrease(event) {
    if (event.target.classList.contains('mid-btn') === false) {
        return
    }
    if (event.target.textContent == refs.currentPage.textContent || event.target.textContent === '...' || event.target.textContent === ' ') {
        return
    }
    refs.currentPage.textContent = event.target.textContent;

    pageChange(Number.parseInt(`${refs.currentPage.textContent}`))
    // getFilterRecipes({
    //     page: Number.parseInt(`${refs.currentPage.textContent}`),
    //     limit: OPTIONS.limit
    // }).then(respone => {
    //     // console.log(respone)
    //     renderCards(respone.results)
    // })
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

        // getFilterRecipes({
        //     page: '1',
        //     limit: OPTIONS.limit
        // }).then(respone => {
        //     // console.log(respone)
        //     renderCards(respone.results)
        // })

        blockLeftBtns();
        blockRightClear()
        setOptions();
        return
    }
    if (event.target.getAttribute('data-skip') === 'lil') {
        if (refs.currentPage.textContent !== '1') {
            refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) - 1;
            pageChange(Number.parseInt(`${refs.currentPage.textContent}`))

            // getFilterRecipes({
            //     page: Number.parseInt(`${refs.currentPage.textContent}`),
            //     limit: OPTIONS.limit
            // }).then(respone => {
            //     // console.log(respone)
            //     renderCards(respone.results)
            // })

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

        // getFilterRecipes({
        //     page: maxPages,
        //     limit: OPTIONS.limit
        // }).then(respone => {
        //     // console.log(respone)
        //     renderCards(respone.results)
        // })

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
            // getFilterRecipes({
            //     page: Number.parseInt(`${refs.currentPage.textContent}`),
            //     limit: OPTIONS.limit
            // }).then(respone => {
            //     // console.log(respone)
            //     renderCards(respone.results)
            // })
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
        OPTIONS.limit = 12;
        return
    }
    if (screen.width >= 768 && screen.width < 1280) {
        // console.log('800')
        OPTIONS.limit = 12;
        return
    }
    if (screen.width >= 375 && screen.width < 768) {
        // console.log('400')
        OPTIONS.limit = 9;
        return
    }
}

function allCategoriesSearch({category}) {
    OPTIONS.category = category;
    // OPTIONS.title = title;
    refs.currentPage.textContent = '1';
    loadFavoritFilter(OPTIONS).then(respone => {
    // console.log(respone)
    maxPages = respone.totalPages;
        renderCards(respone.results)
        if (respone.totalPages == 1 || !respone.totalPages) {
            refs.pagination.style.display = 'none';
            return
        }
    })
    refs.pagination.style.display = 'flex';
    setOptions()
}
// console.log(refs.stars)

// function paintStarts(rating) {
//     for (let i = 0; i < rating; i++) {
//         const nigga = refs.stars;
//         console.log(nigga);
        
//     }
// }

function pageChange(page) {
    loadFavoritFilter({
    page: page,
    limit: OPTIONS.limit
}).then(respone => {
    // console.log(respone)
    // respone.results.map(res => {
    //     if (res.rating > 5) {
    //         res.rating = 5;
    //     } else {
    //         res.rating = Math.round(res.rating);
    //     }
    // })
    renderCards(respone.results);
    addClassFavorit()
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
    limit: OPTIONS.limit
}).then(respone => {
    // console.log(respone)
    // respone.results.map(res => {
    //     if (res.rating > 5) {
    //         res.rating = 5;
    //     }
    // })
    maxPages = respone.totalPages;
    renderCards(respone.results);
    addClassFavorit();
})

export {allCategoriesSearch}