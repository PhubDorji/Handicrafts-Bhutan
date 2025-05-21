'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(200);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // fetched products

  useEffect(() => {
    import('scrollreveal').then((ScrollReveal) => {
      ScrollReveal.default().reveal('.fade-up', {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        reset: true,
        interval: 200,
      });
    });
  }, []);

  // Fetch products from API on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/fetchproduct');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error('Failed to load products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on category and price range
  const filteredProducts = products.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      product.price <= priceRange
  );

  const handleAddToCart = async (product) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prevItems) => [...prevItems, product]);
      } else {
        console.error('Failed to add to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    alert(`Proceeding to buy "${product.name}" for $${product.price.toFixed(2)}`);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 p-4 bg-gray-100 min-h-screen font-['Poppins']">
      {/* Sidebar */}
      <aside className="bg-white rounded-xl p-4 shadow-md space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          <ul className="space-y-1 text-sm">
            {['all', 'Textile', 'Woodwork', 'Jewelry', 'Painting'].map((cat) => (
              <li key={cat}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="mr-2"
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-md font-medium mb-1">Price Range</h4>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">${priceRange} max</div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">🧾 Cart Summary</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <p><strong>Total Items:</strong> {cartItems.length}</p>
              <p><strong>Total Amount:</strong> ${totalAmount}</p>
            </>
          )}
        </div>
      </aside>

      {/* Products Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 fade-up">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#141824] p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-[420px] text-white"
          >
            <div className="relative w-full h-[200px] mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[0] || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-base truncate">{product.name}</h3>
            <p className="text-gray-400 text-xs mb-1">Top-rated item</p>
            <div className="flex items-center text-xs text-yellow-400 mb-1">
              <span>★</span>
              <span className="ml-1">{product.rating ?? '4.5'} ({product.reviews ?? '100'})</span>
            </div>
            <p className="font-bold text-sm mb-3 text-aquamarine">${product.price.toFixed(2)}</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-aquamarine text-white px-3 py-1 rounded-lg hover:bg-teal-300 transition text-sm font-semibold"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
