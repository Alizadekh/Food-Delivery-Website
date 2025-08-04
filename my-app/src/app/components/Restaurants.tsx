"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import restaurantsData from "../../data/restaurants.json";
import Link from "next/link";

type Restaurant = {
  id: number;
  name: string;
  logo: string;
  address: string;
  rating: number;
  categories: string[];
  deals: {
    id: number;
    title: string;
    image: string;
    description: string;
  }[];
  menu: {
    id: number;
    name: string;
    price: number;
    image: string;
    ingredients: string[];
  }[];
};

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRestaurants(restaurantsData.slice(0, 24));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="px-4 mt-4">
      <div className="flex justify-between items-center mb-4 w-[85%] m-auto">
        <h2 className="justify-start text-black text-3xl font-bold font-['Poppins']">
          Popular Restaurants
        </h2>
        <Link
          href="/restaurants"
          className="px-4 py-2 cursor-pointer text-orange-400 rounded-[120px] border border-amber-500 hover:bg-orange-400 hover:text-white transition duration-300"
        >
          Hamısını göstər
        </Link>
      </div>

      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {loading
          ? skeletons.map((_, index) => (
              <SwiperSlide key={index}>
                <div
                  role="status"
                  className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse dark:border-gray-700"
                >
                  <div className="flex items-center justify-center h-32 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </SwiperSlide>
            ))
          : restaurants.map((restaurant) => (
              <SwiperSlide key={restaurant.id}>
                <div className="p-2 bg-neutral-100 rounded-xl border border-black/10 shadow cursor-pointer hover:shadow-2xl transition duration-300">
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">{restaurant.name}</h4>
                    <p className="text-amber-500 text-xs font-normal font-['Poppins']">
                      {restaurant.address}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default Restaurants;
