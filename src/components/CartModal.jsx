export default function CartModal({
  cart,
  closeCart,
  changeQuantity,
  onCheckout,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && closeCart()}
    >
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={closeCart} className="text-2xl text-gray-400">
            ×
          </button>
        </div>
        <div className="p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-gray-950 p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-lg"
                  alt={item.name}
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-purple-400 mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="bg-gray-800 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="bg-gray-800 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-gray-800">
          <div className="flex justify-between text-lg font-bold mb-5">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
