(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
  function toggleModal(e) {
    e.preventDefault();
    toggleBodyScroll();
      refs.modal.classList.toggle("is-hidden");
  }
  function toggleBodyScroll() {
     if (document.body.style.overflow === "hidden")
    { document.body.style.overflow = "visible" }
    else { document.body.style.overflow = "hidden" };
  }
  })();
  