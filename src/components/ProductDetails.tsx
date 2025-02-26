import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Product } from "../store/productSlice"; // Assure-toi que tu as un type Product exporté

import React from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Récupère le produit depuis le store
  const product: Product | undefined = useSelector((state: RootState) =>
    state.products.items.find((e) => e.id === parseInt(id ?? ""))
  );

  // Récupère la wishlist pour savoir si ce produit est dedans
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  if (!id || !product) {
    return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            Catégorie : {product.category}
          </p>
          <p className="text-gray-500 text-lg">Marque : {product.brand}</p>

          {/* Bouton Ajouter au panier */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
          >
            Ajouter au panier
          </button>

          {/* Bouton Wishlist */}
          <button
            onClick={() => dispatch(toggleWishlist(product))}
            className="ml-4 mt-4 inline-flex items-center justify-center"
          >
            {isInWishlist ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-red-500 w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.998 21.35l-1.448-1.32C5.4 15.368 2 12.273 2 8.497 2 5.421 4.42 3 7.497 3c1.74 0 3.409.81 4.501 2.09C13.093 3.81 14.762 3 16.502 3 19.58 3 22 5.421 22 8.497c0 3.776-3.4 6.871-8.55 
                  11.534l-1.452 1.319z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="text-gray-500 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 
                  1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 
                  3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Info */}
        <div>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-red-600 mb-4">
            Prix : {product.price} EUR{" "}
            <span className="text-sm text-gray-500">
              (-{product.discountPercentage}%)
            </span>
          </p>
          <p className="text-green-600 font-medium mb-4">
            {product.availabilityStatus}
          </p>
          <p className="text-gray-500 text-lg">
            Évaluation : {product.rating} / 5
          </p>
          <p className="text-gray-500 text-lg">Stock restant : {product.stock}</p>
        </div>

        {/* Metadata */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <p className="mb-2">SKU : {product.sku}</p>
          <p className="mb-2">Poids : {product.weight} kg</p>
          <p className="mb-2">
            Dimensions : {product.dimensions.width} x {product.dimensions.height} x{" "}
            {product.dimensions.depth} cm
          </p>
          <p className="mb-2">Garantie : {product.warrantyInformation}</p>
          <p className="mb-2">Politique de retour : {product.returnPolicy}</p>
          <p className="mb-2">
            Livraison : {product.shippingInformation}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Commentaires
        </h2>
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex flex-col gap-4 border border-gray-200"
            >
              <div className="flex justify-between">
                <p className="font-semibold text-lg text-gray-800">
                  {review.reviewerName}
                </p>
                <p className="text-sm text-gray-500">
                  Évaluation : {review.rating} / 5
                </p>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-400">
                Publié le : {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
