"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);

  const toggleSearch = () => setSearchActive(!searchActive);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAccountDropdown = () => setAccountDropdown(!accountDropdown);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "popular-products", label: "Popular Products" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
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
            <Link href="/">
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
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className="hover:text-[#66f2c5] text-white font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 relative">
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

            {/* Account Dropdown */}
            <div className="relative">
              <span
                onClick={toggleAccountDropdown}
                className="cursor-pointer hover:text-[#66f2c5] text-white flex items-center space-x-1"
              >
                <i className="ri-user-line text-xl"></i>
                <span>Account</span>
              </span>

              {accountDropdown && (
                <div className="absolute right-0 mt-2 bg-[#121212] border border-[#66f2c5] rounded-md shadow-md py-2 w-64 z-50">
                  <div className="px-4 py-3 border-b border-[#66f2c5]">
                    <p className="text-white font-medium">Welcome Guest</p>
                    <p className="text-sm text-gray-400">
                      Sign in to access your account
                    </p>
                  </div>
                  <Link
                    href="/Login"
                    className="flex items-center px-4 py-2 text-white hover:bg-[#1e1e1e] space-x-2"
                  >
                    <i className="ri-login-box-line"></i>
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/Registration"
                    className="flex items-center px-4 py-2 text-white hover:bg-[#1e1e1e] space-x-2"
                  >
                    <i className="ri-user-add-line"></i>
                    <span>Register</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center px-4 py-2 text-white hover:bg-[#1e1e1e] space-x-2"
                  >
                    <i className="ri-information-line"></i>
                    <span>About Us</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="text-white hover:text-[#66f2c5]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

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

            {/* Account Dropdown in Mobile */}
            <div className="flex flex-col pl-4 space-y-2 text-white">
              <div className="mb-2">
                <p className="font-medium">Welcome Guest</p>
                <p className="text-sm text-gray-400">
                  Sign in to access your account
                </p>
              </div>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-[#66f2c5]"
              >
                <i className="ri-login-box-line"></i>
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-[#66f2c5]"
              >
                <i className="ri-user-add-line"></i>
                <span>Register</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-2 hover:text-[#66f2c5]"
              >
                <i className="ri-information-line"></i>
                <span>About Us</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 hover:text-[#66f2c5]"
              >
                <i className="ri-contacts-line"></i>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;