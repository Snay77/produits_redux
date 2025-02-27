import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = () => {
  // Récupérer le nombre d'articles dans le panier
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + (item.quantity ?? 0), 0)
  );

  // Récupérer le nombre d'articles dans la wishlist
  const wishlistItemsCount = useSelector((state: RootState) => 
    state.wishlist.items.length
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-indigo-600">ArticlesEnFolie</h1>
              <div className="flex space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  Accueil
                </Link>
                <Link 
                  to="/cart" 
                  className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium relative"
                >
                  Panier
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/wishlist" 
                  className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium relative"
                >
                  Wishlist
                  {wishlistItemsCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;