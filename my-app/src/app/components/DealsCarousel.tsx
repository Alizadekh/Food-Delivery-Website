"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCategory } from "../../features/dealsSlice";
import { RootState } from "@/store/store";

import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from "lucide-react";

function DealsCarousel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category, restaurants } = useSelector(
    (state: RootState) => state.deals
  );

  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filtered = restaurants.filter((r) => r.category === category);

  const categories = [
    { key: "vegan", label: "Vegan", emoji: "🌱" },
    { key: "sushi", label: "Sushi", emoji: "🍣" },
    { key: "fast food", label: "Fast Food", emoji: "🍔" },
    { key: "others", label: "View All", emoji: "🍽️" },
  ];

  const handleCategoryClick = (cat: typeof category) => {
    if (cat === "others") {
      router.push("/restaurants");
    } else {
      dispatch(setCategory(cat));
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleCardClick = (id: string) => {
    router.push(`/restaurants/${id}`);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 sm:mb-12 gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Poppins'] text-slate-900 mb-2">
              Order.uk
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent ml-2">
                Exclusive Deals
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
              Discover amazing offers from your favorite restaurants
            </p>
          </div>

          {/* Category filterleri */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key as any)}
                className={`cursor-pointer group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold font-['Poppins'] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  category === cat.key
                    ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-500 hover:shadow-md"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">{cat.emoji}</span>
                  <span className="whitespace-nowrap">{cat.label}</span>
                </span>
                {category === cat.key && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel hissesi */}
        <div className="relative">
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12 z-20">
            <button
              title="click"
              className="swiper-button-prev-custom group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 z-20">
            <button
              title="click"
              className="cursor-pointer swiper-button-next-custom group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>

          <Swiper
            spaceBetween={16}
            pagination={{
              clickable: true,
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-orange-400",
              bulletClass: "swiper-pagination-bullet !bg-gray-300",
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1.3,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            className="deals-swiper pb-12 sm:pb-16"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative">
                      <div className="h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl overflow-hidden">
                        <div className="absolute top-4 right-4 w-16 h-8 bg-gray-400 rounded-full animate-pulse" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="h-4 bg-gray-400 rounded animate-pulse mb-2" />
                          <div className="h-3 bg-gray-300 rounded animate-pulse w-3/4" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : filtered.map((rest) => (
                  <SwiperSlide key={rest.id}>
                    <div
                      className="group relative cursor-pointer transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleCardClick(rest.id)}
                      onMouseEnter={() => setHoveredCard(rest.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${rest.image})`,
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent group-hover:from-orange-500/20 transition-all duration-500" />

                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {rest.deal}
                            </span>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                          <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Poppins'] mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {rest.name}
                          </h3>

                          <div className="flex items-center gap-4 text-gray-300 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-400" />
                              <span>4.5</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>25-30 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>2.5 km</span>
                            </div>
                          </div>

                          <div
                            className={`mt-3 transition-all duration-300 ${
                              hoveredCard === rest.id
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                          >
                            <button className="cursor-pointer bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-md">
                              View Menu →
                            </button>
                          </div>
                        </div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No deals available
            </h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .deals-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .deals-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }

        .deals-swiper .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
        }

        @media (max-width: 640px) {
          .deals-swiper .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
            margin: 0 4px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default DealsCarousel;
