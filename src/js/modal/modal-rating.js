(() => {
    const refs = {
      openModalBtn: document.querySelectorAll("[rating-modal-open]"),
      closeModalBtn: document.querySelector("[rating-modal-close]"),
      modal: document.querySelector("[rating-modal]"),
    };
  
   refs.openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
  refs.closeModalBtn.addEventListener("click", toggleModal);
  
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
  })();