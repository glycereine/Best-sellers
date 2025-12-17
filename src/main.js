import './styles/source.scss';

const classes = {
  productCardVisible: "product-card--visible",
  navItemActive: 'category-nav__item--active',
  modalOpen: 'modal--open',
  bodyModalOpen: 'modal-open',
}

function initCategoryNavigation() {
  const categoryList = document.getElementById('category-list');

  function handleCategoryClick(event) {
    event.preventDefault();

    const categoryItem = event.target.closest('.category-nav__item');
    const targetCategory = categoryItem?.dataset?.category;
    const isCategoryItemActive = categoryItem.classList.contains(classes.navItemActive);

    if (!categoryItem || isCategoryItemActive || !targetCategory) {
      return;
    }

    updateActiveCategory(categoryItem);
    updateActiveProductCards(targetCategory);
  }

  function updateActiveCategory(activeItem) {
    const oldActiveItem = document.querySelector(`.${classes.navItemActive}`);
    if (oldActiveItem) {
      oldActiveItem.classList.remove(classes.navItemActive);
    }

    activeItem.classList.add(classes.navItemActive);
  }

  function updateActiveProductCards(categoryId) {
    const oldActiveItem = document.querySelector(`.${classes.productCardVisible}`);
    const newActiveItem = document.querySelector(`.product-card[data-product-id="${categoryId}"]`);

    if (oldActiveItem) {
      oldActiveItem.classList.remove(classes.productCardVisible);
    }

    if (newActiveItem) {
      newActiveItem.classList.add(classes.productCardVisible);
    }
  }

  categoryList.addEventListener('click', handleCategoryClick);
}

function initNotificationModal() {
  const productContentArea = document.getElementById('product-content-area');
  const notificationModal = document.getElementById('notification-modal');
  const modalMessageText = document.getElementById('modal-message');

  function handleModalOpen(event) {
    const button = event.target.closest('.js-open-modal');
    if (!button) return;

    event.stopPropagation();
    event.preventDefault();

    const activeCard = button.closest('.product-card');
    if (!activeCard) return;

    const productName = activeCard.querySelector('.product-card__name').textContent.trim();
    if (!productName) return;

    modalMessageText.textContent = `${productName} has been added to the your cart.`;

    openModal();
  }

  function handleModalClose(event) {
   if (event.target.closest('.js-close-modal') || event.target === notificationModal) {
      closeModal();
    }
  }

  function handleModalEscapeKey(event) {
    if (event.key === 'Escape' && notificationModal.classList.contains(classes.modalOpen)) {
      closeModal();
    }
  }

  function openModal() {
    notificationModal.classList.add(classes.modalOpen);
    document.body.classList.add(classes.bodyModalOpen);
  }
  
  function closeModal() {
    notificationModal.classList.remove(classes.modalOpen);
    document.body.classList.remove(classes.bodyModalOpen);
  }

  productContentArea.addEventListener('click', handleModalOpen);
  notificationModal.addEventListener('click', handleModalClose);
  document.addEventListener('keydown', handleModalEscapeKey);
}

function init() {
  initCategoryNavigation();
  initNotificationModal();
}

document.addEventListener('DOMContentLoaded', init);