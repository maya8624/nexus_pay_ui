import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);
  const decrement = useCartStore((state) => state.decrement);
  const clear = useCartStore((state) => state.clear);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">("paypal");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-4 sm:p-5">
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => add(item)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => remove(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Payment Method</h2>
          </div>
          <div className="p-5 space-y-3">
            {/* PayPal Option */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "paypal"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">PayPal</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Recommended</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">Fast and secure payment</p>
              </div>
              <FaPaypal className="w-8 h-8 text-blue-600" />
            </label>

            {/* Card Option */}
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Credit / Debit Card</span>
                <p className="text-sm text-gray-500 mt-0.5">Visa, Mastercard, Amex</p>
              </div>
              <FiCreditCard className="w-8 h-8 text-gray-400" />
            </label>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-600">Shipping</span>
            <span className="text-sm text-green-600 font-medium">Free</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={clear}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout", { state: { paymentMethod } })}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
