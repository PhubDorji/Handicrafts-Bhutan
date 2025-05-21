'use client';

export function Sidebar({ setActiveTab }) {
  return (
    <div className="w-64 bg-white border-r p-4">
      <div className="space-y-2">
        <button onClick={() => setActiveTab('addProduct')} className="w-full text-left">➕ Add Product</button>
        <button onClick={() => setActiveTab('productList')} className="w-full text-left">📋 Product List</button>
        <button onClick={() => setActiveTab('orders')} className="w-full text-left">✅ Orders</button>
      </div>
    </div>
  );
}
