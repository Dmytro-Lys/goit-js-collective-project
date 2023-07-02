import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
import { getAllData,getFilterRecipes } from './service/api.js';
import { allCategoriesSearch } from './pagination.js';

const refs = {
  container: document.getElementById('all-categories'),
  toClearBtn: document.getElementById('all-ctg-btn'),
  list: document.getElementById('list'),

};
refs.toClearBtn.addEventListener("click", onAllCategories);

fetchCategories();

async function fetchCategories() {
  try {
      const data = await getAllData("categories");
      const markup = await generateCategoryItems(data);
      await renderCategory(markup);
      refs.list.addEventListener("click", onCategory);
  } catch (err) {
    onError(err);
  }
}


function generateCategoryItems(data) {
    return data.reduce((markup, currentEl) => markup + createCategoryItem(currentEl), "");
}

function createCategoryItem({name}) {
    return `<li class="li-element">
        <button class="dishes">${name}</button>
      </li>`
}
function renderCategory(markup) {
  refs.list.innerHTML = markup;
}

function onCategory(e) {
    if (e.target.classList.contains("dishes")) {
        refs.toClearBtn.classList.remove("all-ctg-btn-active"); 
       const oldActive = refs.list.querySelector(".dishes-active");
       if (oldActive) oldActive.classList.remove("dishes-active");
      e.target.classList.add("dishes-active");
      allCategoriesSearch({
        category: e.target.textContent
      })
    }
}

function onAllCategories() {
    const oldActive = refs.list.querySelector(".dishes-active");
    if (oldActive) oldActive.classList.remove("dishes-active");
  refs.toClearBtn.classList.add("all-ctg-btn-active");
  allCategoriesSearch({});
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}