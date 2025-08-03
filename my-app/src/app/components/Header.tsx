"use client";
import React from "react";
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

const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) =>
      state.auth as {
        isAuthenticated: boolean;
        user: { name?: string } | null;
      }
  );
  return (
    <header>
      <div className="w-[85%] m-auto flex justify-between items-center bg-neutral-50 rounded-bl-xl rounded-br-xl border border-black/10">
        <div className="w-[95%] m-auto flex justify-between items-center ">
          <div>
            <p className="flex items-center text-black text-base font-medium font-['Poppins']">
              <span className="mr-1 text-orange-400">
                <BiSolidOffer />
              </span>
              Get
              <span>5%</span>Off your first order,
              <span className="text-orange-500 ml-1"> PROMO:ORDER5</span>
            </p>
          </div>
          <div className="flex items-center text-black text-base font-medium font-['Poppins']">
            <p className="flex items-center">
              <span className="mr-1.5">
                <FaLocationDot />
              </span>
              Regent Street, A4, A4201, London
            </p>
            <button
              type="button"
              title="changeLocation"
              className="ml-3 text-orange-400 cursor-pointer hover:underline"
            >
              Change Location
            </button>
          </div>
          <div className="bg-green-700 rounded-xl border p-4 mt-2 mb-2 border-black/10 flex items-center gap-4 justify-between text-white text-base font-medium font-['Poppins'] cursor-pointer">
            <div className="border-r-2 pr-4">
              <span className="text-2xl">
                <TbBasketCheck />
              </span>
            </div>
            <div className="border-r-2 pr-4">
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
                className="flex items-center gap-1 text-xl border-l-2 pl-4"
              >
                <FaCircleArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[85%] m-auto flex justify-between items-center py-3">
        <div className="w-[15%]">
          <Image src={logo} alt="Logo" />
        </div>
        <nav className="flex items-center justify-between gap-6">
          <ul className="flex items-center gap-5 text-black text-base font-medium font-['Poppins']">
            <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-colors duration-300 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-colors duration-300 cursor-pointer">
              <Link href="/special">Special Offers</Link>
            </li>
            <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-colors duration-300 cursor-pointer">
              <Link href="/restaurants">Restaurants</Link>
            </li>
            <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-colors duration-300 cursor-pointer">
              <Link href="/track">Track Order</Link>
            </li>
          </ul>
          <div className="p-4 rounded-[20px] bg-slate-950 text-white transition-colors duration-300 cursor-pointer">
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
      </div>
    </header>
  );
};

export default Header;
