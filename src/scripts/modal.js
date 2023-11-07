function closePopupByEsc(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
  }
  
  function closePopupByOverlay(event) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (event.target.classList.contains('popup_is-opened')) {
      closePopup(openedPopup);
    }
  }
  
  function openPopup(popupElement) {
    popupElement.classList.add("popup_is-opened");
    document.addEventListener('keydown', closePopupByEsc);
    popupElement.addEventListener('click', closePopupByOverlay);
  }
  
  function closePopup(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closePopupByEsc);
    popupElement.removeEventListener('click', closePopupByOverlay);
  }

  export {openPopup, closePopup, closePopupByEsc, closePopupByOverlay}