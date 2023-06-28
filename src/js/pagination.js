import { event } from "jquery"
import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import { renderCards } from "./recipes";
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
    rightBtns: document.querySelector('.right-btns')
}

blockLeftBtns();


refs.midBtns.addEventListener('click', _.throttle(pageIncrease, 500))
refs.leftBtns.addEventListener('click', returnToStart)
refs.rightBtns.addEventListener('click', switchToNextPage)

let maxPages = null;

function pageIncrease(event) {
    if (event.target.textContent == refs.currentPage.textContent || event.target.textContent === '...' || event.target.textContent === ' ') {
        return
    }
    refs.currentPage.textContent = event.target.textContent;


    getFilterRecipes({
        page: Number.parseInt(`${refs.currentPage.textContent}`),
        limit: '9'
    }).then(respone => {
        // console.log(respone)
        renderCards(respone.results)
    })
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

        getFilterRecipes({
            page: '1',
            limit: '9'
        }).then(respone => {
            // console.log(respone)
            renderCards(respone.results)
        })

        blockLeftBtns();
        blockRightClear()
        setOptions();
        return
    }
    if (event.target.getAttribute('data-skip') === 'lil') {
        if (refs.currentPage.textContent !== '1') {
            refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) - 1;

            getFilterRecipes({
                page: Number.parseInt(`${refs.currentPage.textContent}`),
                limit: '9'
            }).then(respone => {
                // console.log(respone)
                renderCards(respone.results)
            })

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

        getFilterRecipes({
            page: maxPages,
            limit: '9'
        }).then(respone => {
            // console.log(respone)
            renderCards(respone.results)
        })

        blockRightBtns();
        setOptions();
        checkMaxPage();
        return
    }
    if (event.target.getAttribute('data-skip') === 'lil') {
        if (refs.currentPage.textContent < maxPages) {
            refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) + 1;
            blockLeftClear()
            getFilterRecipes({
                page: Number.parseInt(`${refs.currentPage.textContent}`),
                limit: '9'
            }).then(respone => {
                // console.log(respone)
                renderCards(respone.results)
            })
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
 


getFilterRecipes({
    page: '1',
    limit: '9'
}).then(respone => {
    // console.log(respone)
    maxPages = respone.totalPages;
    renderCards(respone.results)
})