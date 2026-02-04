import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Header from "./components/Header";
import MyOrdersPage from "./pages/MyOrdersPage";
import useAuthCheck from "./hooks/useAuthCheck";
import { useAuthStore } from "./store/authStore";

function App() {
  const { isLoading } = useAuthCheck();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Stop everything until we know if the user has a valid cookie
  if (isLoading) return <div>Loading Nexus Pay...</div>;

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            isAuthenticated == false ? (
              <LoginPage />
            ) : (
              <Navigate to="/products" />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProductsPage />} />
        <Route
          path="/myorders"
          element={
            isAuthenticated ? <MyOrdersPage /> : <Navigate to="/login" />
          }
        />
        {/* Protected Routes */}
        <Route
          path="/cart"
          element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={
            isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
