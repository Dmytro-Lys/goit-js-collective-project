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
    leftBtns: document.querySelector('.left-btns')
}

blockLeftBtns();


refs.midBtns.addEventListener('click', _.throttle(pageIncrease, 500))
refs.leftBtns.addEventListener('click', returnToStart)

function pageIncrease(event) {
    if (event.target.textContent == refs.currentPage.textContent || event.target.textContent === '...') {
        return
    }
    refs.currentPage.textContent = event.target.textContent;


    getFilterRecipes({
        page: Number.parseInt(`${refs.currentPage.textContent}`),
        limit: '9'
    }).then(respone => {
        console.log(respone)
        renderCards(respone.results)
    })

    blockClear();
    setOptions();
}

function returnToStart(event) {
    if (event.target.getAttribute('data-skip') === 'big') {
        refs.currentPage.textContent = 1;

        getFilterRecipes({
            page: '1',
            limit: '9'
        }).then(respone => {
            console.log(respone)
            renderCards(respone.results)
        })

        blockLeftBtns();
        setOptions();
        return
    }
    if (refs.currentPage.textContent !== '1') {
        refs.currentPage.textContent = Number.parseInt(`${refs.currentPage.textContent}`) - 1;

        getFilterRecipes({
            page: Number.parseInt(`${refs.currentPage.textContent}`),
            limit: '9'
        }).then(respone => {
            console.log(respone)
            renderCards(respone.results)
        })

        if (refs.currentPage.textContent === '1') {
            setOptions();
            blockLeftBtns();
            return
        }
        setOptions();
        return
    }
}

function switchToNextPage(event) {

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

function blockRigthBtns() {
    refs.bigRightBtn.setAttribute('disabled', true)
    refs.lilRightBtn.setAttribute('disabled', true)
    refs.bigLeftBtn.removeAttribute("disabled");
    refs.lilLeftBtn.removeAttribute("disabled");
}

function blockClear() {
    refs.bigLeftBtn.removeAttribute("disabled");
    refs.lilLeftBtn.removeAttribute("disabled");  
    refs.bigRightBtn.removeAttribute("disabled");
    refs.lilRightBtn.removeAttribute("disabled");
}