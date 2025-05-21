const categories = ["Clothing", "Electronics", "Home", "Books"];

const Categories = () => (
  <section className="py-16 px-6">
    <h2 className="text-2xl font-semibold mb-8 text-center">Browse by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {categories.map((cat) => (
        <div
          key={cat}
          className="bg-gray-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-medium">{cat}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default Categories;
