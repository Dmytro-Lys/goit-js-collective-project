import { getFilterRecipes } from "./service/api";
import _ from 'lodash';

const searchInput = document.getElementById('search-input');
const debouncedHandleInput = _.debounce(handleInput, 300);

function handleInput() {
  const searchText = searchInput.value.toLowerCase();

  getFilterRecipes(searchText)
    .then(response => {
      const filteredRecipes = response.results.filter(result => result.title.toLowerCase().includes(searchText));
      console.log(filteredRecipes);
    })
    .catch(error => {
      console.error('Помилка:', error);
    });
}

searchInput.addEventListener('input', debouncedHandleInput);


