import Notiflix from 'notiflix';
import "notiflix/src/notiflix.css";

const FAVORIT_KEY = "favorit-recipes";

const saveData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const loadData = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const addFavorit = recipeData => {
    let recipes = loadData(FAVORIT_KEY) || [];
    recipes.push(recipeData);
    saveData(FAVORIT_KEY, recipes);
}

const loadFavorit = () => loadData(FAVORIT_KEY) || [];

async function loadFavoritCategories() {
  try {
    const favorits = await loadFavorit();
    return favorits ? await favorits.map(item => item.category)
      .filter(
        (category, index, array) => array.indexOf(category) === index
      ) : favorits;
  } catch (err) {
    onError(err);
  }
}

async function loadFavoritFilter({ category, page = 1, limit = 6 }) {
  try {
    let result = await loadFavorit();
    if (result && category) result = await result.filter(item => item.category === category);
    const totalResult = result.length;
    const totalPages = Math.ceil(totalResult / limit);
    if (page > totalPages) page = totalPages || 1;
    if (result) result = result.filter((item, index) => index < (page * limit) && index > ((page - 1) * limit - 1));
    return {
      page: String(page),
      perPage: String(limit),
      result,
      totalPages
    }
  } catch (err) {
    onError(err);
  }
}

function onError(error) {
    Notiflix.Notify.failure(error.message);
}
export { saveData, loadData,  addFavorit, loadFavorit, loadFavoritCategories, loadFavoritFilter };