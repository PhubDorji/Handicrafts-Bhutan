'use client';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1e1e1e] p-4 rounded-md shadow"
            >
              <div>
                <h2 className="text-white font-semibold">{item.name}</h2>
                <p className="text-gray-400">Price: Nu. {item.price}</p>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-600"
              >
                <i className="ri-delete-bin-line"></i> Remove
              </button>
            </div>
          ))}

          <div className="text-white font-bold text-xl mt-4">
            Total: Nu. {total}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
