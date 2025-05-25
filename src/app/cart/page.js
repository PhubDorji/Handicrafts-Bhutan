'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart/add', { method: 'GET' });
        const data = await res.json();

        if (data.success) {
          setCartItems(data.cartItems || []);
        } else {
          setError(data.message || 'Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('An error occurred while loading your cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#66f2c5] mb-4"></div>
        <p className="text-gray-400 text-lg">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <i className="ri-error-warning-line text-3xl text-red-400"></i>
        </div>
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#66f2c5] text-black rounded-md hover:bg-[#52d8b0] transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Your Shopping Cart</h1>
        {cartItems.length > 0 && (
          <span className="bg-[#66f2c5] text-black px-3 py-1 rounded-full text-sm font-medium">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#1e1e1e] rounded-lg p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4">
            <i className="ri-shopping-cart-line text-4xl text-gray-500"></i>
          </div>
          <h2 className="text-xl font-medium text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#66f2c5] text-black rounded-md hover:bg-[#52d8b0] transition font-medium"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#1e1e1e] p-4 rounded-lg border border-[#2a2a2a] hover:border-[#66f2c5]/30 transition"
              >
                <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.productImage || '/placeholder-product.png'}
                    alt={item.productName || 'Product image'}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 640px) 100vw, 96px"
                    unoptimized={!item.productImage?.startsWith('/')}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-product.png';
                    }}
                  />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-white font-medium">{item.productName || 'Unnamed Product'}</h2>
                      <p className="text-gray-400 text-sm">Price: Nu. {item.price?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#2a2a2a] rounded">
                        <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
                          -
                        </button>
                        <span className="px-3 py-1 text-white">{item.quantity || 1}</span>
                        <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
                          +
                        </button>
                      </div>
                      <button className="text-red-400 hover:text-red-500 p-1">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Subtotal: Nu. {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#1e1e1e] p-6 rounded-lg border border-[#2a2a2a] sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">Nu. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="flex justify-between border-t border-[#2a2a2a] pt-3">
                  <span className="text-gray-400">Estimated Tax</span>
                  <span className="text-white">Nu. {(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#2a2a2a] pt-4 mb-6">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-xl font-bold text-[#66f2c5]">
                  Nu. {(total * 1.1).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#66f2c5] hover:bg-[#52d8b0] text-black font-bold py-3 px-4 rounded-md transition"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <i className="ri-shield-check-line"></i>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;