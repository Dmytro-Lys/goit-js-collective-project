import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import cardTpl from '../partials/tpls/recipes-card.hbs'



const refs = {
    list: document.querySelector('.cards-list')
}
function renderCards(recipesArray) {
    
    refs.list.innerHTML = "";
    refs.list.insertAdjacentHTML('beforeend', cardTpl(recipesArray))
}

getFilterRecipes({
    page: '1',
    limit: '9'
}).then(respone => {
    console.log(respone)
    renderCards(respone.results)
})

export { renderCards };

