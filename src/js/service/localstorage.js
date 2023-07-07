import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const FAVORIT_KEY = 'favorit-recipes';
const FILTER_KEY = 'filter-recipes';
const FILTER_FAVORIT_KEY = 'filter-favorit-recipes';
const DEF_FILTER = { page: 1, limit: 6 }
const DEF_FAVORIT_FILTER = { page: 1, limit: 9 }

const saveData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadData = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const loadFavorit = () => loadData(FAVORIT_KEY) || [];

const addFavorit = recipeData => {
  let recipes = loadFavorit();
  recipes.push(recipeData);
  saveData(FAVORIT_KEY, recipes);
};

const removeFromFavorite = recipeId => {
  const recipes = loadFavorit();
  if (recipes)
    saveData(
      FAVORIT_KEY,
      recipes.filter(recipe => recipe._id !== recipeId)
    );
};

const findFavorit = recipeId => {
  const recipes = loadFavorit();
  if (!recipes) return false;
  return recipes.find(item => item._id === recipeId);
};

async function loadFavoritCategories() {
  try {
    const favorits = await loadFavorit();
    return favorits
      ? await favorits
          .map(item => item.category)
          .filter((category, index, array) => array.indexOf(category) === index)
      : favorits;
  } catch (err) {
    onError(err);
  }
}

async function loadFavoritFilter({ category, page = 1, limit = 9 }) {
  try {
    let results = await loadFavorit();
    if (results && category)
      results = results.filter(item => item.category === category);
    const totalResult = results.length;
    const totalPages = Math.ceil(totalResult / limit);
    if (page > totalPages) page = totalPages || 1;
    if (results)
      results = results.filter(
        (item, index) => index < page * limit && index > (page - 1) * limit - 1
      );
    return {
      page: String(page),
      perPage: String(limit),
      results,
      totalPages,
    };
  } catch (err) {
    onError(err);
  }
}

const loadFilterRecipes = () => loadData(FILTER_KEY) || DEF_FILTER;

const saveFilterRecipes = filter => saveData(FILTER_KEY, {...DEF_FAVORIT_FILTER, ...filter });

const loadFilterFavoritRecipes = () => loadData(FILTER_FAVORIT_KEY) || DEF_FAVORIT_FILTER;

const saveFilterFavoritRecipes = filter => saveData(FILTER_FAVORIT_KEY, { ...DEF_FAVORIT_FILTER, ...filter });


function onError(error) {
  Notiflix.Notify.failure(error.message);
}


export {
  saveData,
  loadData,
  addFavorit,
  loadFavorit,
  loadFavoritCategories,
  loadFavoritFilter,
  removeFromFavorite,
  findFavorit,
  loadFilterRecipes,
  saveFilterRecipes,
  loadFilterFavoritRecipes,
  saveFilterFavoritRecipes
};
