import { getAllData } from "./service/api";
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const ulPopulation = document.querySelector('.ul-population');


  getAllData('recipes/popular')
    .then(response => {
      const recipes = response;
      renderPopularRecipes(recipes);
    })
    .catch(error => {
      onError(error);
    });


function renderPopularRecipes(recipes) {
  const recipeHTML = recipes.map((recipe, index) => {
    const isLastElement = index === recipes.length - 1;
    const liClass = isLastElement ? "li-population last-element" : "li-population";

    return `
      <li class="${liClass}">
        <div class="div-a-population">
          <img src="${recipe.preview}" alt="" class="img-population">
          <div class="text-container-population">
            <h3 class="title-dishes">${recipe.title}</h3>
            <p class="paragraph-title">${recipe.description}</p>
          </div>
        </div>
      </li>
    `;
  }).join('');

  ulPopulation.innerHTML = recipeHTML;
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}
