const FeaturedProducts = () => (
    <section className="py-16 bg-gray-50 px-6">
      <h2 className="text-2xl font-semibold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 mb-4 rounded-lg"></div>
            <h3 className="text-lg font-medium mb-2">Product {i}</h3>
            <p className="text-gray-600 mb-2">$49.99</p>
            <button className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default FeaturedProducts;
  