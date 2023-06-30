import { setRecipeRating } from '../service/api.js';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

    const refs = {
      openModalBtn: document.querySelectorAll("[rating-modal-open]"),
      closeModalBtn: document.querySelector("[rating-modal-close]"),
      modal: document.querySelector("[rating-modal]"),
      form: document.querySelector("#ratingForm"),
       idButton: document.getElementById('add-favorite')
    };
  
   refs.openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
  refs.closeModalBtn.addEventListener("click", toggleModal);
refs.form.addEventListener("submit", sendForm)
  
  function openModal(e) {
    e.preventDefault();
    document.addEventListener('keydown', keyDownRate);
    toggleModal()
    refs.modal.addEventListener('click', closeModal);
  }

   function closeModal(event) {
  if (event.target.classList.contains('backdrop')) {
    event.target.removeEventListener('click', closeModal);
    toggleModal();
  }
  }

  function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
  }


   function keyDownRate  (e) {
     if (e.key === 'Escape') {
       document.removeEventListener('keydown', keyDownRate);
       e.target.blur(); 
    toggleModal();
     }
  };
  
  async function sendForm(e) {
  try {
    e.preventDefault();
    const id = refs.idButton.getAttribute('data-recipe-id');
    console.log(id);
    const result = await setRecipeRating(id, getArgs(e.currentTarget.elements))
    console.log(result);
    if (!result) return Notiflix.Notify.failure("Send rating failure");
    Notiflix.Notify.success(result);
    refs.form.removeEventListener("submit", sendForm)
    refs.form.reset();
    toggleModal();
   } catch (err) {
    onError(err);
  }
}

function getArgs({ user_email, ratingValue }) {
  if (user_email.value.trim() === "" || ratingValue.value < 1) return Notiflix.Notify.failure('Please fill in all the fields!');
  return {
        rate: ratingValue.value,
       email: user_email.value
  }
}


function onError(error) {
  Notiflix.Notify.failure(error.message);
}