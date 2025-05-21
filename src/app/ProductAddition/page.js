"use client";

import { useEffect, useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [image, setImage] = useState(null); // File object
  const [preview, setPreview] = useState(null); // URL for preview

  // Create a preview URL when image File changes
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Cleanup: revoke object URL when component unmounts or image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Product created!");
        // Reset states
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setImage(null);
      } else {
        alert("❌ Failed to create product.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting product.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="flex flex-col items-center mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 border-2 border-gray-700 rounded"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-700 flex items-center justify-center mb-2 text-gray-400 rounded">
              📷 Upload Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-300"
          />
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded mb-3"
        />

        {/* Description */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded mb-3"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded mb-3"
        >
          <option value="">Select Category</option>
          <option value="Textile">Textile</option>
          <option value="Woodwork">Woodwork</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Painting">Painting</option>
        </select>

        {/* Price and Offer Price */}
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-1/2 p-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="w-1/2 p-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
