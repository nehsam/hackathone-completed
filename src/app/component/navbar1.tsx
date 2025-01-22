"use client";
import { UserButton } from "@clerk/nextjs";
import { LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { FaRegHeart, FaTimes, FaSearch } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = null; // Replace with actual logic to get userId

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search submit logic here
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-Montserrat font-semibold text-2xl">Bandage</h3>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
          >
            <div className="w-6 h-0.5 bg-gray-900 mb-1.5" />
            <div className="w-6 h-0.5 bg-gray-900 mb-1.5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 transition-transform duration-300 transform ease-in-out">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <FaTimes className="text-xl" />
            </button>
            {/* Mobile Search Bar */}
            <div className="mt-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pl-8 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </form>
            </div>

            <ul className="mt-8 space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Shop"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/About"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/Pages"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  Pages
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="text-[18px] font-semibold hover:text-blue-500 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                {!userId ? (
                  <>
                    <Link
                      href="/sign-in"
                      className="text-[18px] font-semibold hover:text-blue-500 transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-[18px] font-semibold hover:text-blue-500 transition"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <UserButton />
                )}
              </li>
              <li className="flex flex-row justify-between gap-5">
                <a
                  href="/cart"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <LucideShoppingCart />
                </a>
                <Link
                  href={""}
                  className="text-[24px] text-gray-700  hover:text-blue-500 transition-colors"
                >
                  <FaRegHeart />
                </Link>
                <Link
                  href={"/Dashboard"}
                  className="text-[24px] text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <RiDashboardLine />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
