import { getRecipe } from '../service/api.js';
const refs = {
  name: document.getElementById('name-reciepe'),
  rating: document.getElementById('rating'),
  time: document.getElementById('time'),
  //   img: document.getElementById('image'),
  ingredients: document.getElementById('ingredients'),
  tags: document.getElementById('tags'),
  instructions: document.getElementById('instructions'),
};
async function getReciepeById(id) {
  const reciepe = await getRecipe(id);
  refs.name.textContent = reciepe.title;
  refs.rating.textContent = reciepe.rating;
  refs.time.textContent = reciepe.time;
  //   refs.img.textContent = reciepe.thumb;
  refs.ingredients.textContent = reciepe.ingredients;
  refs.tags.textContent = reciepe.tags;
  refs.instructions.textContent = reciepe.instructions;
  console.log(reciepe);
}
getReciepeById('6462a8f74c3d0ddd28897fbc');
