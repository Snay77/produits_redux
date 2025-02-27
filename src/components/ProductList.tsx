import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts, Product, setPage, setProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Récupère les valeurs depuis le store
  const { items, isLoading, currentPage } = {
    items: useSelector((state: RootState) => state.products.items),
    isLoading: useSelector((state: RootState) => state.products.isLoading),
    currentPage: useSelector((state: RootState) => state.products.currentPage),
  };

  // Récupère les produits de la wishlist
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Vérifie si un produit est déjà dans la wishlist
  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const [searchQuery, setSearchQuery] = useState(""); // Pour stocker la recherche

  // Effectue la requête API pour récupérer les produits filtrés avec la recherche
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await response.json();
        dispatch(setProducts(data.products)); // Met à jour les produits dans le store
      } catch (error) {
        console.error("Erreur lors de la recherche des produits:", error);
      }
    } else {
      dispatch(fetchProducts(currentPage || 1)); // Si la recherche est vide, recharge les produits par défaut
    }
  };

  // Récupère les produits en fonction de la page
  React.useEffect(() => {
    dispatch(fetchProducts(currentPage || 1));
  }, [dispatch, currentPage]);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Produits</h1>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="max-w-xl mx-auto flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Rechercher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                {isInWishlist(product.id) ? (
                  /* Icône cœur plein (rouge) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.998 21.35l-1.448-1.32C5.4 15.368 2 12.273 2 8.497 2 5.421 4.42 3 7.497 3c1.74 0 3.409.81 4.501 2.09C13.093 3.81 14.762 3 16.502 3 19.58 3 22 5.421 22 8.497c0 3.776-3.4 6.871-8.55 11.534l-1.452 1.319z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  /* Icône cœur vide (gris) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 
                      7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-indigo-600">{product.price} €</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/products/${product.id}`}
                  className="block text-center py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Voir les détails
                </Link>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage * 10 >= 194}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
