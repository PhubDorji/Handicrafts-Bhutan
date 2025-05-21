'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ScrollReveal dynamic import & init
    const srInit = async () => {
      const ScrollReveal = (await import("scrollreveal")).default;
      ScrollReveal().reveal(".fade-up", {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
        reset: true,
        interval: 200,
      });
    };

    srInit();

    // Fetch recent 20 products from your API
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/fetchproduct?limit=20'); // Adjust URL & params as needed
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || []); // Assume your API returns { products: [...] }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section
      className="bg-[#0a0d14] text-white py-16 px-4 font-['Poppins']"
      id="popular-products"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-['Lisu_Bosa'] fade-up">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 fade-up">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className="bg-[#141824] p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-[400px]"
            >
              <div className="relative w-full h-[200px] mb-4 rounded-lg overflow-hidden">
  {product.image ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover"
      unoptimized={true}
    />
  ) : (
    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
      No Image
    </div>
  )}
</div>


              <h3 className="font-semibold text-sm truncate text-white">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs mb-1 truncate">
                Top-rated item
              </p>
              <div className="flex items-center text-xs text-yellow-400 mb-1">
                <span>★</span>
                <span className="ml-1">{product.rating}</span>
              </div>
              <p className="font-bold text-sm mb-3 text-aquamarine">
                {product.price}
              </p>
              <button className="mt-auto bg-aquamarine text-white px-3 py-1 rounded-lg hover:bg-teal-300 transition text-sm font-semibold">
                Buy now
              </button>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12 fade-up">
          <Link href="/Shop">
            <button className="bg-aquamarine text-white px-6 py-2 rounded-xl font-semibold hover:bg-teal-300 transition text-lg">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
