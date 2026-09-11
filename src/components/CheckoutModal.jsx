export default function CheckoutModal({ closeCheckout, submitOrder }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && closeCheckout()}
    >
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={closeCheckout} className="text-2xl text-gray-400">
            ×
          </button>
        </div>
        <form onSubmit={submitOrder} className="p-6 space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-3 outline-none focus:border-purple-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-3 outline-none focus:border-purple-500"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-3 outline-none focus:border-purple-500"
          />
          <textarea
            rows="4"
            placeholder="Delivery Address"
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-3 outline-none focus:border-purple-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
