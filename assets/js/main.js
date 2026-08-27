function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  updateCart();
});
