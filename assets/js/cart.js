let cart = [];

function addToCart(id) {
  const product = products.find((item) => item.id === id);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCart();

  alert(product.name + " added to cart!");
}

function updateCart() {
  const cartCount = document.getElementById("cartCount");

  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");

  let count = 0;
  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    count += item.quantity;

    total += item.price * item.quantity;

    cartItems.innerHTML += `

          <div
              class="flex gap-4 bg-gray-950 p-4 rounded-lg">

              <img
                  src="${item.image}"
                  class="w-20 h-20 object-cover rounded-lg">

              <div class="flex-1">

                  <h3 class="font-bold">
                      ${item.name}
                  </h3>

                  <p class="text-purple-400 mt-1">
                      ₹${item.price}
                  </p>

                  <div class="flex items-center gap-3 mt-2">

                      <button
                          onclick="changeQuantity(${item.id}, -1)"
                          class="bg-gray-800 px-3 py-1 rounded">

                          -

                      </button>

                      <span>
                          ${item.quantity}
                      </span>

                      <button
                          onclick="changeQuantity(${item.id}, 1)"
                          class="bg-gray-800 px-3 py-1 rounded">

                          +

                      </button>

                  </div>

              </div>

          </div>

      `;
  });

  cartCount.textContent = count;

  cartTotal.textContent = "₹" + total.toLocaleString();
}

function changeQuantity(id, amount) {
  const item = cart.find((product) => product.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== id);
  }

  updateCart();
}

function openCart() {
  document.getElementById("cartModal").classList.remove("hidden");

  updateCart();
}

function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Checkout system will be connected here.");
}

function contactForm(event) {
  event.preventDefault();

  alert("Thank you! Your message has been sent.");

  event.target.reset();
}
