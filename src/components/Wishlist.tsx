import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ma Liste de Souhaits</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">Votre liste de souhaits est vide.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-indigo-600 font-medium mb-4">{item.price} €</p>
                
                <Link
                  to={`/products/${item.id}`}
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Voir le produit
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <button
                onClick={() => dispatch(toggleWishlist(item))}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.998 21.35l-1.448-1.32C5.4 15.368 2 12.273 2 8.497 2 5.421 4.42 3 7.497 3c1.74 0 3.409.81 4.501 2.09C13.093 3.81 14.762 3 16.502 3 19.58 3 22 5.421 22 8.497c0 3.776-3.4 6.871-8.55 11.534l-1.452 1.319z"
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
