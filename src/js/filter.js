import { getFilterRecipes } from "./service/api";
import { allCategoriesSearch }  from "./pagination"
import _ from 'lodash';

const searchInput = document.getElementById('search-input');
const debouncedHandleInput = _.debounce(handleInput, 300);

function handleInput() {
  const title = searchInput.value.toLowerCase();

  getFilterRecipes( {title} )
    .then(response => {
    
      const filteredRecipes = response.results.filter(result => result.title.toLowerCase().includes(title));
      console.log(filteredRecipes);
      allCategoriesSearch({title})
    })
    .catch(error => {
      console.error('Помилка:', error);
    });
}

searchInput.addEventListener('input', debouncedHandleInput);


