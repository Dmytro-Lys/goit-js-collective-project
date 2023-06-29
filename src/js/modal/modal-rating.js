(() => {
    const refs = {
      openModalBtn: document.querySelector("[rating-modal-open]"),
      closeModalBtn: document.querySelector("[rating-modal-close]"),
      modal: document.querySelector("[rating-modal]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
  function toggleModal(e) {
    e.preventDefault();
      refs.modal.classList.toggle("is-hidden");
    }
  })();