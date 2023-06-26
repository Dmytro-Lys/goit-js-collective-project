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


export { saveData, loadData,  addFavorit, loadFavorit };