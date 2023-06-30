import { createOrder } from '../service/api.js';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const refs = {
      openModalBtn: document.querySelectorAll("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      form: document.querySelector("#orderForm")
    };
  
    refs.openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.form.addEventListener("submit", sendForm);

  function openModal(e) {
    e.preventDefault();
    document.addEventListener('keydown', keyDown);
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
    toggleBodyScroll();
      refs.modal.classList.toggle("is-hidden");
  }

  function toggleBodyScroll() {
     if (document.body.style.overflow === "hidden")
    { document.body.style.overflow = "visible" }
    else { document.body.style.overflow = "hidden" };
  }


  function keyDown  (e) {
  if (e.key === 'Escape') {
    document.removeEventListener('keydown', keyDown);
    toggleModal();
  }
};
  
async function sendForm(e) {
  try {
    e.preventDefault();

    const result = await createOrder(getArgs(e.currentTarget.elements))
    if (!result) return Notiflix.Notify.failure("Send order failure");
    Notiflix.Notify.success("Thank you for your rating");
    refs.form.removeEventListener("submit", sendForm)
    refs.form.reset();
    toggleModal();
   } catch (err) {
    onError(err);
  }
}

function getArgs({ user_name, user_phone_number, user_email, user_comments }) {
  if (user_name.value.trim() === "" ||
    user_phone_number.value.trim() === "" ||
    user_email.value.trim() === "") return Notiflix.Notify.failure('Please fill in all the fields!');
 return {
        name: user_name.value,
        phone: user_phone_number.value,
        email: user_email.value,
        comment: user_comments.value||""
    }
}


function onError(error) {
  Notiflix.Notify.failure(error.message);
}
  
  