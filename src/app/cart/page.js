'use client';
import Image from 'next/image'; // Added Next.js Image component
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart/add', { method: 'GET' });
        const data = await res.json();

        if (data.success) {
          setCartItems(data.cartItems);
        } else {
          console.error('Failed to fetch cart:', data.message);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Cart</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#1e1e1e] p-4 rounded-md shadow"
            >
              <div className="flex items-center gap-4">
                {/* 👇 Image - Replaced img with Next.js Image */}
                <div className="relative w-20 h-20">
                  <Image
                    src={item.productImage || '/product/placeholder.png'}
                    alt={item.productName}
                    fill
                    className="object-cover rounded"
                    unoptimized // Required for external images
                  />
                </div>

                {/* 👇 Product info */}
                <div>
                  <h2 className="text-white font-semibold">{item.productName}</h2>
                  <p className="text-gray-400">Price: Nu. {item.price}</p>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Optional remove button */}
              {/* <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600"
              >
                <i className="ri-delete-bin-line"></i> Remove
              </button> */}
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