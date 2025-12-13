import "./styles/source.scss";

const categoryList = document.getElementById("category-list");
const productCards = document.querySelectorAll(".product-card");
const notificationModal = document.getElementById("notification-modal");
const modalMessageText = document.getElementById("modal-message");
const productContentArea = document.getElementById("product-content-area");
const closeModalButton = document.querySelector(".js-close-modal");

function initCategoryNavigation() {
  categoryList.addEventListener("click", (event) => {
    event.preventDefault();

    const categoryItem = event.target.closest(".category-nav__item");

    if (
      categoryItem &&
      !categoryItem.classList.contains("category-nav__item--active")
    ) {
      const targetCategory = categoryItem.getAttribute("data-category");

      document.querySelectorAll(".category-nav__item").forEach((item) => {
        item.classList.remove("category-nav__item--active");
      });
      categoryItem.classList.add("category-nav__item--active");

      productCards.forEach((card) => {
        if (card.getAttribute("data-product-id") === targetCategory) {
          card.classList.add("product-card--visible");
        } else {
          card.classList.remove("product-card--visible");
        }
      });
    }
  });
}

function openModal(productName) {
  if (!productName) return;

  const message = `${productName} has been added to the your cart.`;

  modalMessageText.textContent = message;
  notificationModal.classList.add("modal--open");

  document.body.classList.add("modal-open");
}

function closeModal() {
  notificationModal.classList.remove("modal--open");
  document.body.classList.remove("modal-open");
}

function initModalHandlers() {
  productContentArea.addEventListener("click", (event) => {
    const button = event.target.closest(".js-open-modal");

    if (button) {
      event.stopPropagation();
      event.preventDefault();

      const activeCard = button.closest(".product-card");

      if (activeCard) {
        const productNameElement = activeCard.querySelector(
          ".product-card__name"
        );
        const productName = productNameElement
          ? productNameElement.textContent.trim()
          : "Неизвестный продукт";

        openModal(productName);
      }
    }
  });

  closeModalButton.addEventListener("click", closeModal);

  notificationModal.addEventListener("click", (event) => {
    if (event.target === notificationModal) {
      closeModal();
    }
  });
}

function init() {
  if (notificationModal) {
    notificationModal.classList.remove("modal--init-hidden");
  }

  initCategoryNavigation();
  initModalHandlers();
}

document.addEventListener("DOMContentLoaded", init);