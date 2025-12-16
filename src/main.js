import './styles/source.scss';

// Category Navigation Logic
function initCategoryNavigation() {
  const categoryList = document.getElementById('category-list');

  function handleCategoryClick(event) {
    event.preventDefault();

    const categoryItem = event.target.closest('.category-nav__item');

    if (
      categoryItem &&
      !categoryItem.classList.contains('category-nav__item--active')
    ) {
      const targetCategory = categoryItem.getAttribute('data-category');
      updateActiveCategory(categoryItem);
      filterProductCards(targetCategory);
    }
  }

  function updateActiveCategory(activeItem) {
    document.querySelectorAll('.category-nav__item--active').forEach((item) => {
      item.classList.remove('category-nav__item--active');
    });
    activeItem.classList.add('category-nav__item--active');
  }

  function filterProductCards(categoryId) {

    document.querySelectorAll('.product-card--visible').forEach((card) => {
      card.classList.remove('product-card--visible');
    });

    document.querySelectorAll(`.product-card[data-product-id="${categoryId}"]`).forEach((card) => {
      card.classList.add('product-card--visible');
    });

  }

  categoryList.addEventListener('click', handleCategoryClick);
}

// Modal Logic
function initializeNotificationModal() {
  const productContentArea = document.getElementById('product-content-area');
  const notificationModal = document.getElementById('notification-modal');
  const modalMessageText = document.getElementById('modal-message');

  function openModal(productName) {
    if (!productName) return;
    const message = `${productName} has been added to the your cart.`;
    modalMessageText.textContent = message;

    notificationModal.style.display = 'flex';
    requestAnimationFrame(() => {
      notificationModal.classList.add('modal--open');
    });

    document.body.classList.add('modal-open');
  }

  function initModalHandlers(event) {
    const button = event.target.closest('.js-open-modal');

    if (button) {
      event.stopPropagation();
      event.preventDefault();

      const activeCard = button.closest('.product-card');

      if (activeCard) {
        const productName = activeCard
          .querySelector('.product-card__name')
          .textContent.trim();
        openModal(productName);
      }
    }
  }

  function closeModal() {
    notificationModal.classList.remove('modal--open');
    document.body.classList.remove('modal-open');
  }

  function handleModalClose(event) {
   if (event.target.closest('.js-close-modal') || event.target === notificationModal) {
      closeModal();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && notificationModal.classList.contains('modal--open')) {
      closeModal();
    }
  }

  productContentArea.addEventListener('click', initModalHandlers);
  notificationModal.addEventListener('click', handleModalClose);
  document.addEventListener('keydown', handleKeydown);
  // window.onload = () =>
  //   notificationModal &&
  //   notificationModal.classList.remove('modal--init-hidden');
}

function init() {
  initCategoryNavigation();
  initializeNotificationModal();
}

document.addEventListener('DOMContentLoaded', init);
