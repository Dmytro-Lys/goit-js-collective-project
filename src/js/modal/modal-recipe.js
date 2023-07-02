import { getRecipe } from '../service/api.js';
import { addFavorit, loadFavorit } from '../service/localstorage';
import {
  addFavorit,
  loadFavorit,
  removeFromFavorite,
  findFavorit,
} from '../service/localstorage';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const refs = {
  modal: document.querySelector('[data-modal-reciepe]'),
  ratingForm: document.querySelector("#ratingForm"),
  name: document.getElementById('name-reciepe'),
  rating: document.getElementById('rating'),
  time: document.getElementById('modal-time'),
  media: document.getElementById('media'),
  ingredients: document.getElementById('modal-ingredients'),
  tags: document.getElementById('tags'),
  instructions: document.getElementById('instructions'),
  closeModalBtn: document.querySelector('[data-modal-close-btn]'),
  addButton: document.getElementById('add-favorite'),
  rateButton: document.getElementById('rate'),
  list: document.querySelector('.cards-list'),
  stars: document.querySelectorAll('.icon-star'),
};

refs.addButton.addEventListener('click', onFavorit);
refs.list.addEventListener('click', openModal);

async function getReciepeById(id) {
  try {
    const reciepe = await getRecipe(id);
    refs.addButton.setAttribute('data-recipe-id', id);
    refs.name.textContent = reciepe.title;
    if (reciepe.rating > 5) {
      reciepe.rating = 5;
    }
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
    goldStars(reciepe);
     toggleBodyScroll();
    refs.modal.classList.remove("is-hidden");
  } catch (err) {
    onError(err)
  }
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
    return `<img class="image" src="${imageLink}" alt="${alt}" width="295" height="295">`;
  } else {
    return `<iframe class="video" src="${youtubeLink.replace(
      'watch?v=',
      'embed/'
    )}"></iframe>`;
  }
}

function keyDown(e) {
  if (e.key === 'Escape' && e.target !== refs.rateButton
  && e.target.parentNode.parentNode !== refs.ratingForm) {
    closeModal();
     e.target.blur();
  }
}


function openModal(event) {
  if (event.target.hasAttribute('data-id')) {
    document.addEventListener('keydown', keyDown);
    getReciepeById(event.target.getAttribute('data-id'));
    checkFavorit(event.target.getAttribute('data-id'));
    refs.modal.addEventListener('click', closeBackdrop);
  }
}

refs.closeModalBtn.addEventListener('click', closeModal);


function toggleModal() {
  toggleBodyScroll();
  refs.modal.classList.toggle('is-hidden');
}

async function fetchRecipes() {
  try {
    const id = refs.addButton.getAttribute('data-recipe-id');
    const reciepe = await getRecipe(id);
    const recipeData = getDataRecipe(reciepe);
    addFavorit(recipeData);
  } catch (err) {
     onError(err);
  }
}

function getDataRecipe(data) {
  const { _id, category, preview, title, description, rating } = data;
  return { _id, category, preview, title, description, rating };
}

function toggleBodyScroll() {
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  } else {
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
    document.removeEventListener('keydown', keyDown);
    refs.modal.removeEventListener('click', closeBackdrop);
    toggleBodyScroll();
    refs.modal.classList.add("is-hidden");
}

function closeBackdrop(e) {
  if (e.target === refs.modal) {
     closeModal()
   }
}

function checkFavorit(id) {
  // console.log(findFavorit(id));
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
    // console.log(loadFavorit());
    refs.addButton.textContent = 'Add to favorite';
  }
}

function goldStars(recipe) {
  for (let i = 0; i < 5; i++) {
    if (i < recipe.rating) {
      refs.stars[i].classList.add('gold-star');
    } else {
      refs.stars[i].classList.remove('gold-star');
    }
  }
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}