"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import heroImage from "../../assets/img/Intro1.png";

export default function HeroSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); //simulyasiya

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-[95%] sm:w-[90%] lg:w-[85%] m-auto py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl lg:rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow duration-300 px-4 sm:px-6 lg:px-14 py-6 sm:py-8 lg:py-10 gap-6 lg:gap-8">
        <div className="w-full lg:w-[50%] flex flex-col gap-4 sm:gap-5 lg:gap-6 text-center lg:text-left">
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 sm:h-5 lg:h-6 w-3/4 mx-auto lg:mx-0 bg-gray-200 rounded-full animate-pulse" />

              <div className="space-y-2">
                <div className="h-8 sm:h-10 lg:h-12 w-full bg-gray-300 rounded-lg animate-pulse" />
                <div className="h-8 sm:h-10 lg:h-12 w-4/5 mx-auto lg:mx-0 bg-gray-300 rounded-lg animate-pulse" />
              </div>

              <div className="h-4 w-2/3 mx-auto lg:mx-0 bg-gray-200 rounded-full animate-pulse" />

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                <div className="h-12 sm:h-14 w-full sm:w-[65%] bg-gray-200 rounded-full animate-pulse" />
                <div className="h-12 sm:h-14 w-full sm:w-[35%] bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="transform transition-all duration-500 opacity-100">
              <h4 className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Poppins'] leading-relaxed mb-2 sm:mb-3">
                Order Restaurant food, takeaway and groceries.
              </h4>

              <h1 className="text-slate-950 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Poppins'] leading-tight sm:leading-snug lg:leading-tight mb-4 sm:mb-6">
                Feast Your Senses,
                <br />
                <span className="text-amber-500 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Fast and Fresh
                </span>
              </h1>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-medium font-['Poppins']">
                  Enter a postcode to see what we deliver
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md lg:max-w-none mx-auto lg:mx-0">
                  <div className="relative w-full sm:flex-1">
                    <input
                      title="search"
                      type="text"
                      className="bg-white h-12 sm:h-14 lg:h-16 w-full rounded-full border-2 border-black/20 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 px-5 sm:px-6 text-sm sm:text-base placeholder:text-gray-400 shadow-sm hover:shadow-md"
                      placeholder="ex: AZ1045"
                    />
                  </div>

                  <button
                    type="button"
                    title="searchButton"
                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 h-12 sm:h-14 lg:h-16 rounded-full px-6 sm:px-8 lg:px-10 text-white text-sm sm:text-base lg:text-lg font-semibold font-['Poppins'] transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end mt-6 lg:mt-0">
          {loading ? (
            <div className="w-full max-w-[280px] h-[200px] sm:max-w-[350px] sm:h-[250px] lg:max-w-[450px] lg:h-[320px] bg-gray-300 animate-pulse rounded-xl shadow-md" />
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform scale-105" />
              <Image
                src={heroImage}
                alt="Delicious food delivery"
                className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] h-auto rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                priority
              />
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block absolute -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-pulse delay-1000" />
      </div>
    </section>
  );
}
