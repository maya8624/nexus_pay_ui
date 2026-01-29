import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import axios from "axios";
import { FiCreditCard, FiArrowLeft, FiLoader } from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const navigate = useNavigate();
  const location = useLocation();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const initialPaymentMethod = (location.state as { paymentMethod?: "paypal" | "card" })?.paymentMethod || "paypal";
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">(initialPaymentMethod);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Card payment of $${total.toFixed(2)} successful!`);
      clearCart();
      navigate("/products");
    }, 1500);
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    try {
      const { data } = await axios.post("/api/paypal/create-order", { items });
      window.location.href = data.approvalUrl;
    } catch (err) {
      console.error(err);
      alert("Failed to create PayPal order. Try again.");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No items to checkout</h2>
            <p className="text-gray-500 mb-6">Add some products to your cart first</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-1 text-gray-500">Complete your purchase</p>
        </div>

        <div className="grid gap-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-500">{item.quantity}x</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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

          {/* Pay Button */}
          <button
            onClick={paymentMethod === "paypal" ? handlePayPalPayment : handleCardPayment}
            disabled={isProcessing}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>

          {/* Back Link */}
          <button
            onClick={() => navigate("/cart")}
            className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
