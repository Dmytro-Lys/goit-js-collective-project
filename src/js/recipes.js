import { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder } from './service/api'
import cardTpl from '../partials/tpls/recipes-card.hbs'
import {
   findFavorit
} from './service/localstorage';


const refs = {
    list: document.querySelector('.cards-list'),
    li: document.querySelector('.card-info'),
    stars: document.querySelectorAll('.star-svg')
}

let stars = '';
function renderCards(recipesArray) {
    
    recipesArray.map(res => {
        if (res.rating >= 5) {
            res.rating = 5;
        }
    })
    refs.list.innerHTML = "";
    // console.log(recipesArray)
    refs.list.insertAdjacentHTML('beforeend', cardTpl(recipesArray))
    stars = document.querySelectorAll('.star-svg')
    // console.log(stars)
    paintStarts(recipesArray)
    paintHearts(recipesArray)
}

// function paintStarts(rating) {
//     for (let i = 0; i < rating ; index++) {
//         console.log(refs.stars[i])
        
//     }
// }
// console.log(refs.stars)



function paintStarts(recipes) {
    let counter = 0;
    recipes.map(recipe => {
        for (let i = 0; i < 5; i++) {
            if (i < recipe.rating) {
                // console.log(counter)
                stars[counter].classList.add('gold-star')
            }
            counter += 1;
        }
    })

}

function paintHearts(reciepes) {
    const hearts = document.querySelectorAll(".heart-svg")
    reciepes.map((recipe, index) => {
        if (findFavorit(recipe._id)) hearts[index].classList.add("heart-svg-fav");
    })
}




// getFilterRecipes({
//     page: '1',
//     limit: '9'
// }).then(respone => {
//     console.log(respone)
//     renderCards(respone.results)
// })

export { renderCards, paintStarts};

// window.alert("Your screen resolution is: " + screen.height + 'x' + screen.width);


// function openModal(event) {
//     if (event.target.hasAttribute('data-id')) {
//         console.log(event.target)
//         // getReciepeById(event.target.getAttribute('data-id'))
//     }
// }
// refs.list.addEventListener('click', openModal)