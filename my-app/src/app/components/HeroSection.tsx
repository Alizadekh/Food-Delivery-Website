"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import heroImage from "../../assets/img/Intro1.png";

export default function HeroSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-[85%] m-auto py-3">
      <div className="flex justify-between items-center bg-neutral-50 rounded-xl border border-black/20 pl-14 pr-14">
        <div className="w-[40%] flex flex-col gap-3">
          {loading ? (
            <>
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-14 w-full bg-gray-300 rounded animate-pulse" />
              <div className="h-14 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center gap-2 mt-2">
                <div className="h-14 w-[70%] bg-gray-200 rounded-[120px] animate-pulse" />
                <div className="h-14 w-[30%] bg-gray-300 rounded-[120px] animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <h4 className="text-slate-950 text-base font-normal font-['Poppins'] leading-[66px]">
                Order Restaurant food, takeaway and groceries.
              </h4>
              <h1 className="text-slate-950 text-5xl font-semibold font-['Poppins'] leading-[66px]">
                Feast Your Senses,
                <br />
                <span className="text-amber-500 text-5xl font-semibold font-['Poppins'] leading-[66px]">
                  Fast and Fresh
                </span>
              </h1>
              <div>
                <p className="text-slate-950 text-xs font-normal font-['Poppins'] leading-[66px]">
                  Enter a postcode to see what we deliver
                </p>
                <div className="flex items-center mt-2">
                  <input
                    title="search"
                    type="text"
                    className="bg-white h-14 rounded-[120px] border border-black/40 p-2.5"
                    placeholder="ex: AZ1045"
                  />
                  <button
                    type="button"
                    title="searchButton"
                    className="bg-orange-400 h-14 rounded-[120px] px-6 ml-2 text-white text-base font-medium font-['Poppins'] cursor-pointer hover:bg-orange-500 transition duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          {loading ? (
            <div className="w-[400px] h-[300px] bg-gray-300 animate-pulse rounded-xl" />
          ) : (
            <Image src={heroImage} alt="Hero Image" />
          )}
        </div>
      </div>
    </section>
  );
}
