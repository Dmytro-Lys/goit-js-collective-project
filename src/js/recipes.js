import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import cardTpl from '../partials/tpls/recipes-card.hbs'



const refs = {
    list: document.querySelector('.cards-list'),
    li: document.querySelector('.card-info')
}
function renderCards(recipesArray) {
    
    refs.list.innerHTML = "";
    refs.list.insertAdjacentHTML('beforeend', cardTpl(recipesArray))
}

// getFilterRecipes({
//     page: '1',
//     limit: '9'
// }).then(respone => {
//     console.log(respone)
//     renderCards(respone.results)
// })

export { renderCards };

// window.alert("Your screen resolution is: " + screen.height + 'x' + screen.width);


// function openModal(event) {
//     if (event.target.hasAttribute('data-id')) {
//         console.log(event.target)
//         // getReciepeById(event.target.getAttribute('data-id'))
//     }
// }
// refs.list.addEventListener('click', openModal)