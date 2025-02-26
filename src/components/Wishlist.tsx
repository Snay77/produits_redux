import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Ma Liste de Souhaits
      </h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Votre liste de souhaits est vide.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-2">Prix : {item.price} EUR</p>
                <Link
                  to={`/products/${item.id}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Voir le produit
                </Link>
              </div>
              <button
                onClick={() => dispatch(toggleWishlist(item))}
                className="text-red-500 text-2xl"
              >
                {/* Icône cœur plein pour retirer de la wishlist */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.998 21.35l-1.448-1.32C5.4 15.368 2 12.273 2 8.497 2 5.421 
                    4.42 3 7.497 3c1.74 0 3.409.81 4.501 2.09C13.093 3.81 14.762 3 
                    16.502 3 19.58 3 22 5.421 22 8.497c0 3.776-3.4 6.871-8.55 
                    11.534l-1.452 1.319z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
