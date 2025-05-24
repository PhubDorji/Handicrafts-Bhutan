"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = ({ isSeller = false }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSearch = () => setSearchActive(!searchActive);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Common nav links for landing pages
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "popular-products", label: "Popular Products" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  // Seller-specific nav links
  const sellerLinks = [
    { href: "/seller/dashboard", label: "Dashboard" },
    { href: "/ProductAddition", label: "Add Product" },
    { href: "/seller/orders", label: "Orders" },
    { href: "/", label: "Logout" },
  ];

  return (
    <header
      id="home"
      className="shadow-md"
      style={{ backgroundColor: "#000000", fontFamily: "var(--header-font)" }}
    >
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />

      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="text-2xl font-semibold">
            <Link href={isSeller ? "/seller/dashboard" : "/"}>
              <span className="text-white">Zh</span>
              <span className="text-[#66f2c5]">ora</span>
            </Link>
          </div>

          {/* Hamburger for Mobile */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={toggleMenu}
          >
            <i className={`ri-${menuOpen ? "close" : "menu"}-line`}></i>
          </button>

          {/* Nav Links (Desktop) */}
          <ul className="hidden md:flex space-x-6 items-center">
            {!isSeller &&
              navLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="hover:text-[#66f2c5] text-white font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

            {isSeller &&
              sellerLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#66f2c5] text-white font-medium">
                    {label}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Right Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSeller && (
              <>
                {/* Seller Dashboard Button on landing */}
                <Link href="/ProductAddition">
                  <button
                    className="px-4 py-2 rounded transition font-medium"
                    style={{
                      backgroundColor: "#66f2c5",
                      color: "#000000",
                    }}
                  >
                    Seller Dashboard
                  </button>
                </Link>

                {/* Search */}
                <div className="relative flex items-center">
                  <span
                    onClick={toggleSearch}
                    className="cursor-pointer hover:text-[#66f2c5] text-white mr-2"
                  >
                    <i className="ri-search-line text-xl"></i>
                  </span>
                  {searchActive && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-48 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: "#121212",
                        color: "#ffffff",
                        borderColor: "#66f2c5",
                      }}
                    />
                  )}
                </div>

                {/* Account */}
                <Link href="/Login">
                  <span className="cursor-pointer hover:text-[#66f2c5] text-white flex items-center space-x-1">
                    <i className="ri-user-line text-xl"></i>
                    <span>Account</span>
                  </span>
                </Link>
              </>
            )}

            {isSeller && (
              <>
                {/* You can add any seller-specific right section items here if needed */}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            {!isSeller &&
              navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-white hover:text-[#66f2c5]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

            {isSeller &&
              sellerLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-white hover:text-[#66f2c5]"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

            {!isSeller && (
              <>
                <Link href="/ProductAddition">
                  <button
                    className="w-full px-4 py-2 mt-2 rounded"
                    style={{
                      backgroundColor: "#66f2c5",
                      color: "#000000",
                    }}
                  >
                    Seller Dashboard
                  </button>
                </Link>

                <div className="flex items-center space-x-2">
                  <i className="ri-search-line text-white text-xl"></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-3 py-2 rounded-md"
                    style={{
                      backgroundColor: "#121212",
                      color: "#ffffff",
                      borderColor: "#66f2c5",
                    }}
                  />
                </div>

                <Link href="/Login">
                  <span className="cursor-pointer hover:text-[#66f2c5] text-white flex items-center space-x-1">
                    <i className="ri-user-line text-xl"></i>
                    <span>Account</span>
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
