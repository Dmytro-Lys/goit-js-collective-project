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
  refs.closeModalBtn.addEventListener("click", closeModal);
refs.form.addEventListener("submit", sendForm)
  
  function openModal(e) {
    e.preventDefault();
    document.addEventListener('keydown', keyDownRate);
    refs.modal.classList.remove("is-hidden");
    refs.modal.addEventListener('click', closeBackdrop);
  }

function closeModal() {
     document.removeEventListener('keydown', keyDownRate);
     refs.modal.removeEventListener('click', closeBackdrop);
     refs.modal.classList.add("is-hidden");
  }
  
  function closeBackdrop(e) {
  if (e.target === refs.modal) {
     closeModal()
   }
}
  
function clearRating() {
  const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
  ratingIcons.forEach(icon => icon.classList.remove('active'));
}
  
function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
  }


   function keyDownRate  (e) {
     if (e.key === 'Escape') {
       closeModal();
       e.target.blur(); 

     }
  };
  
  async function sendForm(e) {
  try {
    e.preventDefault();
    const id = refs.idButton.getAttribute('data-recipe-id');
    const result = await setRecipeRating(id, getArgs(e.currentTarget.elements))
    if (!result) return Notiflix.Notify.failure("Send rating failure");
    Notiflix.Notify.success("Thank you for your rating");
    clearRating()
    refs.form.reset();
    toggleModal();
   } catch (err) {
    onError(err);
  }
}

function getArgs({ user_email, ratingValue }) {
  if (user_email.value.trim() === "" || ratingValue.value < 1) return Notiflix.Notify.failure('Please fill in all the fields!');
  return {
        rate: Number(ratingValue.value),
       email: user_email.value
  }
}


function onError(error) {
  Notiflix.Notify.failure(error.message);
}