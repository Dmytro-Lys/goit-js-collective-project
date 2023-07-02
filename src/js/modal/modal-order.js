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
  refs.closeModalBtn.addEventListener("click", closeModal);
  refs.form.addEventListener("submit", sendForm);

  function openModal(e) {
    e.preventDefault();
    document.addEventListener('keydown', keyDown);
    toggleModal()
    refs.modal.addEventListener('click', closeBackdrop);
  }
  
function closeModal() {
    document.removeEventListener('keydown', keyDown);
    refs.modal.removeEventListener('click', closeBackdrop);
    toggleModal();
}
  
function closeBackdrop(e) {
  if (e.target === refs.modal) {
     closeModal()
   }
}
  
  function toggleModal() {
    toggleBodyScroll();
      refs.modal.classList.toggle("is-hidden");
  }

  function toggleBodyScroll() {
     if (document.body.style.overflow === "hidden")
    { document.body.style.overflow = "" }
    else { document.body.style.overflow = "hidden" };
  }


  function keyDown  (e) {
  if (e.key === 'Escape') {
    closeModal();
    e.target.blur();
  }
};
  
async function sendForm(e) {
  try {
    e.preventDefault();
    // console.log(getArgs(e.currentTarget.elements))
    const data = getArgs(e.currentTarget.elements);
    if (!data) return;
    const result = await createOrder(data);
    // console.log(result);
    if (!result) return Notiflix.Notify.failure("Send order failure");
    Notiflix.Notify.success("Thank you for your order");
    refs.form.reset();
    closeModal();
   } catch (err) {
    onError(err);
  }
}


function getArgs({ user_name, user_phone_number, user_email, user_comments }) {
  if (user_name.value.trim() === "" ||
    user_phone_number.value.trim() === "" ||
    user_email.value.trim() === "") return Notiflix.Notify.failure('Please fill in all the fields!');
  if (user_phone_number.value.length !== 10) return Notiflix.Notify.failure('Phone number must contain 10 digits!')
 return {
        name: user_name.value,
        phone: '+38'+ user_phone_number.value,
        email: user_email.value,
        comment: user_comments.value||" "
    }
}


function onError(error) {
  Notiflix.Notify.failure(error.message);
}
  
  