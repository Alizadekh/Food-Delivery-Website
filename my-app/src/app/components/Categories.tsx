"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import restaurantsData from "../../data/restaurants.json";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import catImg from "../../assets/img/food.png";

type Category = {
  id: number;
  name: string;
  image: string;
  restaurantCount: number;
};

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const categoryMap: { [key: string]: Category } = {};

      restaurantsData.forEach((restaurant) => {
        restaurant.categories.forEach((catName: string) => {
          if (!categoryMap[catName]) {
            categoryMap[catName] = {
              id: Object.keys(categoryMap).length + 1,
              name: catName,
              image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                catName
              )}`,
              restaurantCount: 1,
            };
          } else {
            categoryMap[catName].restaurantCount += 1;
          }
        });
      });

      const finalCategories = Object.values(categoryMap);
      setCategories(finalCategories);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Poppins'] text-slate-900 mb-2">
              Food
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent ml-2">
                Categories
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
              Explore a variety of cuisines from top restaurants
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-full border-2 border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <span>Hamısını göstər</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-6 z-20">
            <button
              title="click"
              className="cursor-pointer swiper-button-prev-categories group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 z-20">
            <button
              title="click"
              className="cursor-pointer swiper-button-next-categories group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>

          <Swiper
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-categories",
              nextEl: ".swiper-button-next-categories",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={16}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 12,
              },
              400: {
                slidesPerView: 1.8,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3.2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="categories-swiper pb-12 sm:pb-16"
          >
            {loading
              ? skeletons.map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="group">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="relative">
                          <div className="w-full h-32 sm:h-36 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 bg-gray-150 rounded animate-pulse w-3/4" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : categories.map((category) => (
                  <SwiperSlide key={category.id}>
                    <Link href={`/categories/${category.id}`}>
                      <div
                        className="group cursor-pointer transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setHoveredCard(category.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                          <div className="relative overflow-hidden">
                            <img
                              src={catImg.src}
                              alt={category.name}
                              className="w-full h-32 sm:h-36 lg:h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div
                              className={`absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                                hoveredCard === category.id
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-2"
                              }`}
                            >
                              Quick View
                            </div>
                          </div>

                          <div className="p-4 space-y-3">
                            <h4 className="text-sm sm:text-base lg:text-lg font-bold font-['Poppins'] text-gray-900 truncate group-hover:text-orange-500 transition-colors duration-300">
                              {category.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {category.restaurantCount} restoran
                            </p>
                          </div>

                          <div
                            className={`px-4 pb-4 transition-all duration-300 ${
                              hoveredCard === category.id
                                ? "opacity-100 max-h-20"
                                : "opacity-0 max-h-0 overflow-hidden"
                            }`}
                          >
                            <button className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                              Explore Category
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .categories-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .categories-swiper .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
        }

        .categories-swiper .swiper-pagination-bullet-active {
          transform: scale(1.3) !important;
        }
      `}</style>
    </section>
  );
}

export default Categories;
