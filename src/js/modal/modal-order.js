(() => {
    const refs = {
      openModalBtn: document.querySelectorAll("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
  
    refs.openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
  refs.closeModalBtn.addEventListener("click", toggleModal);
  
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
  
  })();
  