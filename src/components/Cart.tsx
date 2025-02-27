import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

// Cart
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">Votre panier est vide.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-indigo-600 font-medium mb-4">
                  {(item.price * (item.quantity ?? 0)).toFixed(2)} €
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 1) - 1 }))}
                    disabled={(item.quantity ?? 0) <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                             hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({ 
                      id: item.id, 
                      quantity: parseInt(e.target.value) || 1 
                    }))}
                    className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 0) + 1 }))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                             hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" 
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">{calculateTotal()} €</span>
            </div>
            
            <button className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 rounded-lg 
                           hover:bg-indigo-700 transition-colors">
              Procéder au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
