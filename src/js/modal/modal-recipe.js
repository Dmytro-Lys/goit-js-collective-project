import { getRecipe } from '../service/api.js';
import { addFavorit, loadFavorit } from '../service/localstorage';
import {
  addFavorit,
  loadFavorit,
  removeFromFavorite,
  findFavorit,
} from '../service/localstorage';

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
  rateButton: document.getElementById('rate'),
  list: document.querySelector('.cards-list'),
};

async function getReciepeById(id) {
  const reciepe = await getRecipe(id);
  refs.addButton.setAttribute('data-recipe-id', id);
  refs.name.textContent = reciepe.title;
  refs.rating.textContent = reciepe.rating;
  refs.time.textContent = `${reciepe.time} min`;
  refs.media.innerHTML = createIngredientMedia(
    reciepe.youtube,
    reciepe.thumb,
    reciepe.title
  );
  refs.ingredients.innerHTML = createIngredientList(reciepe.ingredients);
  refs.tags.innerHTML = createTagList(reciepe.tags);
  refs.instructions.textContent = reciepe.instructions;
  toggleModal();
}

function createIngredientList(ingredientsArray) {
  let markup = '';
  for (const ingredient of ingredientsArray) {
    markup += `<li class="ingredient">
    <div class="ingredient-list">
    <span class="ingredient-name">${ingredient.name}</span><span class="ingredient-measure">${ingredient.measure}</span>
    </div></li>`;
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

function keyDown(e) {
  if (e.key === 'Escape' && e.target !== refs.rateButton) {
    document.removeEventListener('keydown', keyDown);
    toggleModal();
  }
}

refs.list.addEventListener('click', openModal);
function openModal(event) {
  if (event.target.hasAttribute('data-id')) {
    document.addEventListener('keydown', keyDown);

    getReciepeById(event.target.getAttribute('data-id'));
    checkFavorit(event.target.getAttribute('data-id'));
    refs.modal.addEventListener('click', closeModal);
  }
}

refs.closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  toggleBodyScroll();
  refs.modal.classList.toggle('is-hidden');
}

refs.addButton.addEventListener('click', onFavorit);
async function fetchRecipes() {
  try {
    const id = refs.addButton.getAttribute('data-recipe-id');
    const reciepe = await getRecipe(id);
    const recipeData = getDataRecipe(reciepe);
    addFavorit(recipeData);
  } catch (err) {
    console.log(err);
  }
}

function getDataRecipe(data) {
  const { _id, category, preview, title, description, rating } = data;
  return { _id, category, preview, title, description, rating };
}

function toggleBodyScroll() {
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = 'visible';
  } else {
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(event) {
  if (event.target.classList.contains('backdrop')) {
    event.target.removeEventListener('click', closeModal);
    toggleModal();
  }
}

function checkFavorit(id) {
  console.log(findFavorit(id));
  if (findFavorit(id)) {
    refs.addButton.textContent = 'Remove from favorite';
  } else {
    refs.addButton.textContent = 'Add to favorite';
  }
}

function onFavorit() {
  if (refs.addButton.textContent === 'Add to favorite') {
    fetchRecipes();
    refs.addButton.textContent = 'Remove from favorite';
  } else {
    const id = refs.addButton.getAttribute('data-recipe-id');
    removeFromFavorite(id);
    console.log(loadFavorit());
    refs.addButton.textContent = 'Add to favorite';
  }
}
