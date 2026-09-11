import { useState } from "react";
import { products } from "../data";

export default function Products({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section id="products" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-purple-400 font-semibold tracking-[0.3em] uppercase">
            OUR COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Popular Desk Mats
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search desk mats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-5 py-3 outline-none focus:border-purple-500"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full py-10">
              No desk mats found.
            </p>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="product-card bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg shadow-black/40"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  <p className="text-purple-400 text-sm">{product.category}</p>
                  <h3 className="text-xl font-bold mt-2">{product.name}</h3>
                  <p className="text-2xl font-bold mt-3">₹{product.price}</p>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg mt-5 font-semibold"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
