import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

const dummyProducts: (Product & { image: string; description: string })[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description: "Premium sound quality with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    description: "Track your fitness and stay connected",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    description: "Ergonomic aluminum design for better posture",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop",
    description: "RGB backlit with tactile switches",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=300&fit=crop",
    description: "7-in-1 multiport adapter for all devices",
  },
  {
    id: 6,
    name: "Webcam HD",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop",
    description: "1080p streaming with built-in microphone",
  },
];

export default function ProductsPage() {
  const add = useCartStore((s) => s.add);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-500">Browse our collection of tech accessories</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => add(product)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
