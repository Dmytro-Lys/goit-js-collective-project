import { getRecipe } from '../service/api.js';
const refs = {
  name: document.getElementById('name-reciepe'),
  rating: document.getElementById('rating'),
  time: document.getElementById('time'),
  media: document.getElementById('media'),
  ingredients: document.getElementById('ingredients'),
  tags: document.getElementById('tags'),
  instructions: document.getElementById('instructions'),
};

async function getReciepeById(id) {
  const reciepe = await getRecipe(id);
  refs.name.textContent = reciepe.title;
  refs.rating.textContent = reciepe.rating;
  refs.time.textContent = `${reciepe.time} min`;
  refs.media.insertAdjacentHTML(
    'beforeend',
    createIngredientMedia(reciepe.youtube, reciepe.thumb, reciepe.title)
  );
  refs.ingredients.insertAdjacentHTML(
    'beforeend',
    createIngredientList(reciepe.ingredients)
  );

  refs.tags.insertAdjacentHTML('beforeend', createTagList(reciepe.tags));

  refs.instructions.textContent = reciepe.instructions;
  console.log(reciepe);
}
getReciepeById('6462a8f74c3d0ddd28897fbc');

function createIngredientList(ingredientsArray) {
  let markup = '';
  for (const ingredient of ingredientsArray) {
    markup += `<li><span class="ingredient-name">${ingredient.name}</span> <span class="ingredient-measure">${ingredient.measure}</span></li>`;
  }
  return markup;
}

function createTagList(tagsArray) {
  let markup = '';
  for (const tag of tagsArray) {
    markup += `<li><span class="tags-name">#${tag}</span></li>`;
  }
  return markup;
}

function createIngredientMedia(youtubeLink, imageLink, alt) {
  if (!youtubeLink) {
    return `<img class="image" src="${imageLink}" alt="${alt}">`;
  } else {
    return `<iframe class="video" src="${youtubeLink.replace(
      'watch?v=',
      'embed/'
    )}"></iframe>`;
  }
}
