import { getRecipe } from '../service/api.js';
import { addFavorit, loadFavorit } from '../service/localstorage';

const refs = {
  modal: document.querySelector('[data-modal-reciepe]'),
  name: document.getElementById('name-reciepe'),
  rating: document.getElementById('rating'),
  time: document.getElementById('time'),
  media: document.getElementById('media'),
  ingredients: document.getElementById('ingredients'),
  tags: document.getElementById('tags'),
  instructions: document.getElementById('instructions'),
  closeModalBtn: document.querySelector('[data-modal-close-btn]'),
  addButton: document.getElementById('add-favorite'),
  list: document.querySelector('.cards-list'),
};

async function getReciepeById(id) {
  const reciepe = await getRecipe(id);

  refs.name.textContent = reciepe.title;
  refs.rating.textContent = reciepe.rating;
  refs.time.textContent = `${reciepe.time} min`;
  refs.addButton.setAttribute('data-recipe-id', id);
  refs.media.innerHTML = createIngredientMedia(reciepe.youtube, reciepe.thumb, reciepe.title);
  refs.ingredients.innerHTML =  createIngredientList(reciepe.ingredients);
  refs.tags.innerHTML = createTagList(reciepe.tags);
  refs.instructions.textContent = reciepe.instructions;
  toggleModal()
  console.log(reciepe);
}


function createIngredientList(ingredientsArray) {
  let markup = '';
  for (const ingredient of ingredientsArray) {
    markup += `<li class="ingredient">
    <div class="ingredient-list">
    <span class="ingredient-name">${ingredient.name}</span> <span class="ingredient-measure">${ingredient.measure}</span>
    </div>
     
    </li>`;
  }
  return markup;
}

function createTagList(tagsArray) {
  let markup = '';
  for (const tag of tagsArray) {
    markup += `<li><span class="tags-name">#${tag}</span>
     
    </li>`;
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
refs.list.addEventListener('click', openModal);
function openModal(event) {
  if (event.target.hasAttribute('data-id')) {
    console.log(event.target);
    getReciepeById(event.target.getAttribute('data-id'));
  }
}


  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }


refs.addButton.addEventListener('click', fetchRecipes);
async function fetchRecipes() {
  try {
    const id = refs.addButton.getAttribute('data-recipe-id');
    const reciepe = await getRecipe(id);
    const recipeData = await getDataRecipe(reciepe);
    addFavorit(recipeData);
    console.log(loadFavorit());
  } catch (err) {
    console.log(err);
  }
}

function getDataRecipe(data) {
  const { _id, category, preview, title, description, rating } = data;
  return { _id, category, preview, title, description, rating };
}
