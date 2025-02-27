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
  const product = useSelector((state: RootState) =>
    state.products.items.find((e) => e.id === parseInt(id ?? ""))
  );
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  if (!id || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Produit non trouvé</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images?.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - vue ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg cursor-pointer 
                           hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-500">{product.category} - {product.brand}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">{product.price} €</span>
                <span className="text-green-500 text-sm">
                  -{product.discountPercentage}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.round(product.rating))}
                  {'☆'.repeat(5 - Math.round(product.rating))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews.length} avis)
                </span>
              </div>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg 
                         hover:bg-indigo-700 transition-colors"
              >
                Ajouter au panier
              </button>
              
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`w-full py-3 px-4 rounded-lg border transition-colors
                          ${isInWishlist 
                            ? 'border-red-500 text-red-500 hover:bg-red-50' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
              >
                {isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Stock</p>
                  <p className="font-medium">{product.stock} unités</p>
                </div>
                <div>
                  <p className="text-gray-500">SKU</p>
                  <p className="font-medium">{product.sku}</p>
                </div>
                <div>
                  <p className="text-gray-500">Poids</p>
                  <p className="font-medium">{product.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-500">Dimensions</p>
                  <p className="font-medium">
                    {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{review.reviewerName}</p>
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
