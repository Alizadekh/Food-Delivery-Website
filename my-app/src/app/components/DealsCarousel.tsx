"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../app/globals.css";
import { Pagination } from "swiper/modules";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCategory } from "../../features/dealsSlice";
import { RootState } from "@/store/store";

function DealsCarousel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category, restaurants } = useSelector(
    (state: RootState) => state.deals
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filtered = restaurants.filter((r) => r.category === category);

  const handleCategoryClick = (cat: typeof category) => {
    if (cat === "others") {
      router.push("/restaurants");
    } else {
      dispatch(setCategory(cat));
      setLoading(true);
      setTimeout(() => setLoading(false), 500); // YENİ KATEQORİYADA DA LOADING EFFEKTI KIMI BISEYLER
    }
  };

  const handleCardClick = (id: string) => {
    router.push(`/restaurants/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between gap-4 mb-4 w-[85%] m-auto">
        <div>
          <p className="justify-start text-black text-3xl font-bold font-['Poppins']">
            Order.uk exclusive deals
          </p>
        </div>
        <div className="flex gap-4 mb-4 text-base font-normal font-['Poppins']  text-slate-950">
          {["vegan", "sushi", "fast food", "others"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat as any)}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                category === cat
                  ? " text-orange-400 rounded-[120px] border border-amber-500"
                  : "bg-white hover:bg-gray-100 transition duration-300"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-70 w-full bg-gray-200 animate-pulse rounded-xl"></div>
              </SwiperSlide>
            ))
          : filtered.map((rest) => (
              <SwiperSlide
                key={rest.id}
                onClick={() => handleCardClick(rest.id)}
                className="cursor-pointer rounded-xl relative overflow-hidden"
              >
                <div
                  className="rounded-xl h-70 w-full relative flex items-end p-2"
                  style={{
                    backgroundImage: `url(${rest.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <p className="z-10 text-orange-400 text-base font-bold bg-black absolute top-0 right-4 p-3 rounded-b-2xl">
                    {rest.deal}
                  </p>
                  <div className="absolute bg-gradient-to-bl from-white/0 via-slate-950/20 to-slate-950/90 rounded-xl z-20"></div>
                  <h3 className="relative z-20 w-full text-center text-white bg-black/70 p-2 rounded-md">
                    {rest.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default DealsCarousel;
