"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import restaurantsData from "../../data/restaurants.json";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Heart,
} from "lucide-react";

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
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRestaurants(restaurantsData.slice(0, 24));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleFavorite = (restaurantId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(restaurantId)) {
        newFavorites.delete(restaurantId);
      } else {
        newFavorites.add(restaurantId);
      }
      return newFavorites;
    });
  };

  const skeletons = Array.from({ length: 8 });

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Poppins'] text-slate-900 mb-2">
              Popular
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent ml-2">
                Restaurants
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
              Discover the most loved restaurants in your area
            </p>
          </div>

          <Link
            href="/restaurants"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-full border-2 border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <span>Hamısını göstər</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-6 z-20">
            <button
              title="Previous restaurants"
              aria-label="Go to previous restaurants"
              className="cursor-pointer swiper-button-prev-restaurants group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              <span className="sr-only">Previous restaurants</span>
            </button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 z-20">
            <button
              title="Next restaurants"
              aria-label="Go to next restaurants"
              className="cursor-pointer swiper-button-next-restaurants group bg-white hover:bg-orange-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              <span className="sr-only">Next restaurants</span>
            </button>
          </div>

          <Swiper
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-restaurants",
              nextEl: ".swiper-button-next-restaurants",
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
            className="restaurants-swiper pb-12 sm:pb-16"
          >
            {loading
              ? skeletons.map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="group">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="relative">
                          <div className="w-full h-32 sm:h-36 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                          <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                        </div>

                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 bg-gray-150 rounded animate-pulse w-3/4" />
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : restaurants.map((restaurant) => (
                  <SwiperSlide key={restaurant.id}>
                    <Link href={`/restaurants/${restaurant.id}`}>
                      <div
                        className="group cursor-pointer transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setHoveredCard(restaurant.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                          <div className="relative overflow-hidden">
                            <img
                              src={restaurant.logo}
                              alt={restaurant.name}
                              className="w-full h-32 sm:h-36 lg:h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <button
                              onClick={(e) => toggleFavorite(restaurant.id, e)}
                              className={`cursor-pointer absolute top-3 right-3 p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                favorites.has(restaurant.id)
                                  ? "bg-red-500 text-white shadow-lg"
                                  : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
                              }`}
                              aria-label={
                                favorites.has(restaurant.id)
                                  ? `Remove ${restaurant.name} from favorites`
                                  : `Add ${restaurant.name} to favorites`
                              }
                              title={
                                favorites.has(restaurant.id)
                                  ? `Remove ${restaurant.name} from favorites`
                                  : `Add ${restaurant.name} to favorites`
                              }
                            >
                              <Heart
                                className={`w-4 h-4 transition-all duration-300 ${
                                  favorites.has(restaurant.id)
                                    ? "fill-current"
                                    : ""
                                }`}
                              />
                            </button>

                            <div
                              className={`absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                                hoveredCard === restaurant.id
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-2"
                              }`}
                            >
                              Quick View
                            </div>
                          </div>

                          <div className="p-4 space-y-3">
                            <h4 className="text-sm sm:text-base lg:text-lg font-bold font-['Poppins'] text-gray-900 truncate group-hover:text-orange-500 transition-colors duration-300">
                              {restaurant.name}
                            </h4>

                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                              <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
                              <span className="truncate">
                                {restaurant.address}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current text-yellow-400" />
                                <span className="text-sm font-semibold text-gray-700">
                                  {restaurant.rating || "4.5"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>25-30 min</span>
                              </div>
                            </div>

                            {restaurant.categories &&
                              restaurant.categories.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  {restaurant.categories
                                    .slice(0, 2)
                                    .map((category, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium"
                                      >
                                        {category}
                                      </span>
                                    ))}
                                  {restaurant.categories.length > 2 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                      +{restaurant.categories.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                          </div>

                          <div
                            className={`px-4 pb-4 transition-all duration-300 ${
                              hoveredCard === restaurant.id
                                ? "opacity-100 max-h-20"
                                : "opacity-0 max-h-0 overflow-hidden"
                            }`}
                          >
                            <button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                              View Menu
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        {!loading && restaurants.length > 0 && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                {restaurants.length}+
              </div>
              <div className="text-gray-600 text-sm">Restaurants</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                4.8
              </div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                25
              </div>
              <div className="text-gray-600 text-sm">Avg. Delivery (min)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                100K+
              </div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .restaurants-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .restaurants-swiper .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
        }

        .restaurants-swiper .swiper-pagination-bullet-active {
          transform: scale(1.3) !important;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </section>
  );
}

export default Restaurants;
