function displayProducts(list) {
  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  list.forEach((product) => {
    productList.innerHTML += `

          <div
              class="product-card bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg shadow-black/40">

              <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="w-full h-60 object-cover">

              <div class="p-5">

                  <p class="text-purple-400 text-sm">
                      ${product.category}
                  </p>

                  <h3
                      class="text-xl font-bold mt-2">

                      ${product.name}

                  </h3>

                  <p
                      class="text-2xl font-bold mt-3">

                      ₹${product.price}

                  </p>

                  <button
                      onclick="addToCart(${product.id})"
                      class="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg mt-5 font-semibold">

                      Add To Cart

                  </button>

              </div>

          </div>

      `;
  });
}

function searchProducts() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search),
  );

  displayProducts(filtered);
}
