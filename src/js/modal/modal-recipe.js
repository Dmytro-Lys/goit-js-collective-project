import { getRecipe } from '../service/api.js';
import {
  addFavorit,
  removeFromFavorite,
  findFavorit,
} from '../service/localstorage';
import { renderFavoritCards } from '../pagination-favorit.js';
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
const isFavorit = refs.list.classList.contains('cards-list-favorit');
refs.addButton.addEventListener('click', onFavorit);
refs.list.addEventListener('click', onList);
refs.closeModalBtn.addEventListener('click', closeModal);

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

function onList(e) {
  if (e.target.hasAttribute('data-id')) openModal(e.target);
  if (e.target.parentNode.classList.contains("heart-svg")) onHeart(e.target.parentNode);
  if (e.target.classList.contains("heart-svg")) onHeart(e.target);
}

function openModal(target) {
    document.addEventListener('keydown', keyDown);
    getReciepeById(target.getAttribute('data-id'));
    checkFavorit(target.getAttribute('data-id'));
    refs.modal.addEventListener('click', closeBackdrop);
 }

function onHeart(target) {
  const id = target.getAttribute('data-id-heart');
  if (target.classList.contains("heart-svg-fav")) {
    removeFromFavorite(id); 
    if (isFavorit) renderFavoritCards();
  } else {
    fetchRecipes(id);
  }
  target.classList.toggle("heart-svg-fav");
}

async function fetchRecipes(id) {
  try {
    const reciepe = await getRecipe(id);
    const recipeData = getDataRecipe(reciepe);
    addFavorit(recipeData);
    if (isFavorit) renderFavoritCards();
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
  const id = refs.addButton.getAttribute('data-recipe-id');
  if (refs.addButton.textContent === 'Add to favorite') {
    fetchRecipes(id);
    refs.addButton.textContent = 'Remove from favorite';
  } else {
    removeFromFavorite(id);
    if (isFavorit) renderFavoritCards();
    refs.addButton.textContent = 'Add to favorite';
  }
   toggleHeart(id);
}

function toggleHeart(id) {
  const heart = document.querySelector(`[data-id-heart = "${id}"]`);
  if (heart) heart.classList.toggle("heart-svg-fav");
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