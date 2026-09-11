import { useState, useEffect } from "react";
import "./index.css";
import Hero from "./components/Hero";
import Products from "./components/Products";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("espada_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(
    () => localStorage.setItem("espada_cart", JSON.stringify(cart)),
    [cart],
  );

  useEffect(() => {
    document.body.style.overflow =
      isCartOpen || isCheckoutOpen ? "hidden" : "unset";
    const handleKeyDown = (e) =>
      e.key === "Escape" && (setIsCartOpen(false) || setIsCheckoutOpen(false));
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, isCheckoutOpen]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastMsg(product.name + " added to cart");
  };

  const changeQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const submitOrder = (e) => {
    e.preventDefault();
    setCart([]);
    setIsCheckoutOpen(false);
    setToastMsg("Order placed! We'll contact you to confirm.");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold text-purple-400">
              ESPA<span className="text-white">DA</span>
            </a>

            <div className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-purple-400">
                Home
              </a>
              <a href="#products" className="hover:text-purple-400">
                Products
              </a>
              <a href="#about" className="hover:text-purple-400">
                About
              </a>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden ml-3 text-2xl"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-5 space-y-4">
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-purple-400"
              >
                Home
              </a>
              <a
                href="#products"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-purple-400"
              >
                Products
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-purple-400"
              >
                About
              </a>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Hero />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Premium Quality",
                  desc: "High quality materials",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                },
                {
                  title: "Water Resistant",
                  desc: "Easy to clean",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
                    />
                  ),
                },
                {
                  title: "Fast Delivery",
                  desc: "Fast delivery across India",
                  icon: (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M1 3h15v13H1z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 8h4l3 3v5h-7V8z"
                      />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </>
                  ),
                },
                {
                  title: "Easy Returns",
                  desc: "Simple return policy",
                  icon: (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 1l4 4-4 4"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 11V9a4 4 0 014-4h14"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 23l-4-4 4-4"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13v2a4 4 0 01-4 4H3"
                      />
                    </>
                  ),
                },
              ].map((feat, i) => (
                <div key={i} className="bg-gray-900 p-6 rounded-xl text-center">
                  <div className="mb-3 flex justify-center text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {feat.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold">{feat.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Products onAddToCart={addToCart} />

        <section id="about" className="py-24 bg-black overflow-hidden">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <p className="m-0 text-purple-400 text-sm md:text-base font-semibold tracking-[0.4em] uppercase">
              Why
            </p>
            <h2 className="m-0 mt-3 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="text-white">ESPADA</span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-8 rounded-full"></div>
            <p className="max-w-2xl mx-auto mt-8 text-gray-400 text-base md:text-lg leading-8">
              Designed for gamers, creators and professionals. ESPADA brings
              comfort, style and performance together to create the perfect desk
              setup.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold text-purple-400">ESPADA</h2>
            <p className="text-gray-500 text-sm mt-2">
              Premium mats for your perfect setup.
            </p>
          </div>
          <div className="flex gap-5 text-gray-500">
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              YouTube
            </a>
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm mt-8">
          © 2026 ESPADA. All Rights Reserved.
        </p>
      </footer>

      {isCartOpen && (
        <CartModal
          cart={cart}
          closeCart={() => setIsCartOpen(false)}
          changeQuantity={changeQuantity}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}
      {isCheckoutOpen && (
        <CheckoutModal
          closeCheckout={() => setIsCheckoutOpen(false)}
          submitOrder={submitOrder}
        />
      )}
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
    </>
  );
}
