function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("hidden");
}

function initModals() {
  const modals = [
    { el: document.getElementById("cartModal"), close: closeCart },
    { el: document.getElementById("checkoutModal"), close: closeCheckout },
  ];

  modals.forEach(({ el, close }) => {
    if (!el) return;
    el.addEventListener("click", (e) => {
      if (e.target === el) close();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeCheckout();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  updateCart();
  initModals();
});
