"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// Importing the logo image and icons
import logo from "../../assets/img/logo.png";
import { BiSolidOffer } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { TbBasketCheck } from "react-icons/tb";
import { FaCircleArrowDown } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) =>
      state.auth as {
        isAuthenticated: boolean;
        user: { name?: string } | null;
      }
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="relative">
        {/* Desktop üst header */}
        <div className="hidden lg:block w-[85%] m-auto bg-neutral-50 rounded-bl-xl rounded-br-xl border border-black/10">
          <div className="w-[95%] m-auto flex justify-between items-center py-3">
            <div>
              <p className="flex items-center text-black text-sm xl:text-base font-medium font-['Poppins']">
                <span className="mr-1 text-orange-400">
                  <BiSolidOffer />
                </span>
                Get
                <span className="ml-1">5%</span>Off your first order,
                <span className="text-orange-500 ml-1"> PROMO:ORDER5</span>
              </p>
            </div>
            <div className="flex items-center text-black text-sm xl:text-base font-medium font-['Poppins']">
              <p className="flex items-center">
                <span className="mr-1.5">
                  <FaLocationDot />
                </span>
                <span className="hidden xl:inline">
                  Regent Street, A4, A4201, London
                </span>
                <span className="xl:hidden">London</span>
              </p>
              <button
                type="button"
                title="changeLocation"
                className="ml-3 text-orange-400 cursor-pointer hover:underline transition-colors duration-300"
              >
                Change Location
              </button>
            </div>
            <div className="bg-green-700 rounded-xl border p-3 xl:p-4 border-black/10 flex items-center gap-2 xl:gap-4 justify-between text-white text-sm xl:text-base font-medium font-['Poppins'] cursor-pointer hover:bg-green-800 transition-colors duration-300">
              <div className="border-r-2 pr-2 xl:pr-4">
                <span className="text-xl xl:text-2xl">
                  <TbBasketCheck />
                </span>
              </div>
              <div className="border-r-2 pr-2 xl:pr-4">
                <p className="flex items-center gap-1">
                  Items:
                  <span>3</span>
                </p>
              </div>
              <div>
                <p>
                  <span>23</span> AZN
                </p>
              </div>
              <div>
                <button
                  title="checkout"
                  className="flex items-center gap-1 text-xl border-l-2 pl-2 xl:pl-4 hover:text-orange-300 transition-colors duration-300"
                >
                  <FaCircleArrowDown />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet üst header - sadə yaşıl buton */}
        <div className="lg:hidden w-full px-4 py-2 bg-neutral-50 border-b border-black/10">
          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="bg-green-700 hover:bg-green-800 transition-all duration-300 rounded-lg px-4 py-2 text-white font-medium font-['Poppins'] flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <TbBasketCheck className="text-lg" />
              <span className="text-sm">3 Items • 23 AZN</span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[85%] m-auto flex justify-between items-center py-3 px-4 lg:px-0">
          <div className="w-20 md:w-24 lg:w-[15%]">
            <Image src={logo} alt="Logo" className="w-full h-auto" />
          </div>

          <nav className="hidden lg:flex items-center justify-between gap-6">
            <ul className="flex items-center gap-5 text-black text-base font-medium font-['Poppins']">
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/">Home</Link>
              </li>
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/special">Special Offers</Link>
              </li>
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/restaurants">Restaurants</Link>
              </li>
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/track">Track Order</Link>
              </li>
            </ul>
            <div className="p-4 rounded-[20px] bg-slate-950 hover:bg-slate-800 text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
              {isAuthenticated ? (
                <p className="flex items-center gap-2 text-white text-base font-medium font-['Poppins']">
                  <span className="text-xl text-orange-400">
                    <CgProfile />
                  </span>
                  <span>{user?.name || "Ayxan"}</span>
                </p>
              ) : (
                <Link href="/login">
                  <p className="flex items-center gap-2 text-white text-base font-medium font-['Poppins']">
                    <span className="text-xl text-orange-400">
                      <CgProfile />
                    </span>
                    <span>Login/Signup</span>
                  </p>
                </Link>
              )}
            </div>
          </nav>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 transform ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 transform ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMenu}
        />

        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                aria-label="Close menu"
              >
                <AiOutlineClose className="text-2xl text-gray-600" />
              </button>
            </div>

            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/special"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/restaurants"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="p-4 rounded-lg bg-slate-950 hover:bg-slate-800 text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                  {isAuthenticated ? (
                    <p className="flex items-center gap-2 text-white text-lg font-medium font-['Poppins']">
                      <span className="text-xl text-orange-400">
                        <CgProfile />
                      </span>
                      <span>{user?.name || "Ayxan"}</span>
                    </p>
                  ) : (
                    <Link href="/login" onClick={closeMenu}>
                      <p className="flex items-center gap-2 text-white text-lg font-medium font-['Poppins']">
                        <span className="text-xl text-orange-400">
                          <CgProfile />
                        </span>
                        <span>Login/Signup</span>
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold font-['Poppins'] text-gray-800">
                Order Details
              </h3>
              <button
                onClick={toggleModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                aria-label="Close modal"
              >
                <AiOutlineClose className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="flex items-center text-gray-800 text-sm font-medium font-['Poppins']">
                  <span className="mr-2 text-orange-400">
                    <BiSolidOffer />
                  </span>
                  Get <span className="mx-1 font-bold">5%</span> Off your first
                  order
                </p>
                <p className="text-orange-600 font-semibold mt-1">
                  PROMO: ORDER5
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="flex items-center text-gray-800 text-sm font-medium font-['Poppins'] mb-2">
                  <span className="mr-2 text-gray-600">
                    <FaLocationDot />
                  </span>
                  Regent Street, A4, A4201, London
                </p>
                <button
                  type="button"
                  title="changeLocation"
                  className="text-orange-500 text-sm font-medium hover:underline transition-colors duration-300"
                >
                  Change Location
                </button>
              </div>

              <div className="bg-green-700 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TbBasketCheck className="text-2xl" />
                    <div>
                      <p className="text-sm font-medium">Items: 3</p>
                      <p className="text-lg font-bold">23 AZN</p>
                    </div>
                  </div>
                  <button
                    title="checkout"
                    className="bg-green-800 hover:bg-green-900 rounded-lg p-3 transition-colors duration-300"
                  >
                    <FaCircleArrowDown className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
