import axios from 'axios';


async function getAllData(querry) {
  const url = `https://tasty-treats-backend.p.goit.global/api/${querry}`;
  const res = await axios.get(url);
  return res.data;
}

async function getFilterRecipes(filter) {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes${getFilterArguments(filter)}`
    const res = await axios.get(url);
    return res.data;
}

function getFilterArguments({ category, title, time, area, ingredients, page, limit }) {
  return `?page=${page||1}&limit=${limit||6}`.concat(
    category ? `&category=${category}` : "",
    title ? `&title=${title}` : "",
    time ? `&time=${time}` : "",
    area ? `&area=${area}` : "",
    ingredients ? `&ingredients=${ingredients}` : "")
}

async function getRecipe(recipeId) {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`
  const res = await axios.get(url);
  return res.data;
}

async function setRecipeRating(recipeId, data) {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}/rating`
     // example data
    
    // const data = {
    //     rate: 5,
    //     email: "test@gmail.com"
    // }
  const res = await axios.patch(url, data);
  return res.data;
}

async function createOrder(data) {
    const url = `https://tasty-treats-backend.p.goit.global/api/orders/add`
   
    // example data

    // const data = {
    //     name: "Ivetta",
    //     phone: "+380730000000",
    //     email: "test@gmail.com",
    //     comment: "So delicious"
    // }
  const res = await axios.post(url, data);
  return res.data;
}

export { getAllData, getFilterRecipes, getRecipe, setRecipeRating, createOrder };