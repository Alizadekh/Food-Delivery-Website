"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ChevronDown,
  Grid,
  List,
  X,
  SlidersHorizontal,
  Clock,
  Percent,
  Heart,
} from "lucide-react";
import restaurantsData from "../../../data/restaurants.json";

const RestaurantsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showDealsOnly, setShowDealsOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState<(number | string)[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);

  // Bütün kateqoriyaları əldə edirik
  const allCategories = useMemo(() => {
    const categories = new Set();
    restaurantsData.forEach((restaurant) => {
      restaurant.categories.forEach((category) => categories.add(category));
    });
    return ["All", ...Array.from(categories)];
  }, []);

  interface MenuItem {
    name: string;
    price: number;
  }

  interface Deal {
    title: string;
    description?: string;
  }

  interface Restaurant {
    id: number | string;
    name: string;
    address: string;
    rating: number;
    categories: string[];
    menu: MenuItem[];
    deals: Deal[];
  }

  const getAveragePrice = (restaurant: Restaurant): number => {
    if (!restaurant.menu || restaurant.menu.length === 0) return 0;
    const total = restaurant.menu.reduce((sum, item) => sum + item.price, 0);
    return total / restaurant.menu.length;
  };

  // Filtrlənmiş restoranlar
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantsData.filter((restaurant) => {
      const matchesCategory =
        selectedCategory === "All" ||
        restaurant.categories.includes(selectedCategory);
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRating = restaurant.rating >= minRating;
      const matchesDeals = !showDealsOnly || restaurant.deals.length > 0;
      const avgPrice = getAveragePrice(restaurant);
      const matchesPrice =
        avgPrice >= priceRange[0] && avgPrice <= priceRange[1];

      return (
        matchesCategory &&
        matchesSearch &&
        matchesRating &&
        matchesDeals &&
        matchesPrice
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "deals":
          return b.deals.length - a.deals.length;
        case "price_low":
          return getAveragePrice(a) - getAveragePrice(b);
        case "price_high":
          return getAveragePrice(b) - getAveragePrice(a);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    selectedCategory,
    searchTerm,
    minRating,
    showDealsOnly,
    sortBy,
    priceRange,
  ]);

  interface ToggleFavoriteFn {
    (restaurantId: number | string): void;
  }

  const toggleFavorite: ToggleFavoriteFn = (restaurantId) => {
    setFavorites((prev: (number | string)[]) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Mobile filtr panel bağlama
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileFilters]);

  const FilterPanel = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "p-6" : ""}`}>
      <div
        className={`${
          isMobile
            ? "bg-white"
            : "bg-white rounded-xl shadow-sm border border-gray-200"
        } p-6`}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-orange-500" />
          Filters
          {isMobile && (
            <button
              onClick={() => setShowMobileFilters(false)}
              className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
              title="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort by
          </label>
          <label htmlFor="sortBySelect" className="sr-only">
            Sort by
          </label>
          <select
            id="sortBySelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-200"
            aria-label="Sort by"
          >
            <option value="rating">⭐ Rating (High to Low)</option>
            <option value="name">📝 Name (A to Z)</option>
            <option value="deals">🎁 Most Deals</option>
            <option value="price_low">💰 Price (Low to High)</option>
            <option value="price_high">💳 Price (High to Low)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Minimum Rating:{" "}
            <span className="text-orange-600 font-bold">
              {minRating.toFixed(1)}+ ⭐
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-gray-200 to-orange-200 rounded-lg appearance-none cursor-pointer slider"
            title="Set minimum rating"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0⭐</span>
            <span>5⭐</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Average Price Range:{" "}
            <span className="text-green-600 font-bold">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </label>
          <div className="px-2">
            <input
              title="Set minimum price"
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseFloat(e.target.value)])
              }
              className="w-full h-2 bg-gradient-to-r from-green-200 to-green-400 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$0</span>
              <span>$20+</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-4 cursor-pointer p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition-all duration-200">
            <input
              type="checkbox"
              checked={showDealsOnly}
              onChange={(e) => setShowDealsOnly(e.target.checked)}
              className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              title="Show only deals"
              placeholder="Show only deals"
            />
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">
                Show only deals
              </span>
            </div>
          </label>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSelectedCategory("All");
            setMinRating(0);
            setPriceRange([0, 20]);
            setShowDealsOnly(false);
            setSearchTerm("");
            setSortBy("rating");
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  const RestaurantCard = ({
    restaurant,
    isListView = false,
  }: {
    restaurant: Restaurant;
    isListView?: boolean;
  }) => {
    const avgPrice = getAveragePrice(restaurant);
    const isFavorite = favorites.includes(restaurant.id);

    if (isListView) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border  hover:shadow-lg transition-all duration-300 p-6 hover:border-orange-200">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg ">
                <span className="text-white text-2xl md:text-3xl font-bold">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
              {restaurant.deals.length > 0 && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    🔥 DEAL
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">
                      {restaurant.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    title={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isFavorite
                        ? "text-red-500 bg-red-50"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    {restaurant.rating}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.categories.slice(0, 4).map((category) => (
                  <span
                    key={category}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>💰 Avg: ${avgPrice.toFixed(2)}</span>
                  <span>🍽️ {restaurant.menu?.length || 0} dishes</span>
                </div>
                {restaurant.deals.length > 0 && (
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {restaurant.deals[0].title}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all duration-300 overflow-hidden group border-gray-200 hover:border-orange-200 hover:-translate-y-1">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
              {restaurant.name.charAt(0)}
            </span>
          </div>

          {restaurant.deals.length > 0 && (
            <div className="absolute top-4 left-4">
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full animate-bounce">
                🔥 HOT DEAL
              </div>
            </div>
          )}

          <button
            title="Toggle favorite"
            onClick={() => toggleFavorite(restaurant.id)}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
              isFavorite
                ? "text-red-500 bg-white/90"
                : "text-white bg-black/20 hover:bg-white/90 hover:text-red-500"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            {restaurant.rating}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
            {restaurant.name}
          </h3>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{restaurant.address}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {category}
              </span>
            ))}
            {restaurant.categories.length > 3 && (
              <span className="text-gray-500 text-xs font-medium">
                +{restaurant.categories.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              💰 Avg:{" "}
              <span className="font-semibold text-green-600">
                ${avgPrice.toFixed(2)}
              </span>
            </span>
            <span className="flex items-center gap-1">
              🍽️{" "}
              <span className="font-semibold">
                {restaurant.menu?.length || 0}
              </span>{" "}
              dishes
            </span>
          </div>

          {restaurant.deals.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-red-500" />
                <span className="text-red-700 font-semibold text-sm">
                  {restaurant.deals[0].title}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="w-[85%] m-auto px-4 sm:px-4 lg:px-0 py-6 border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Restaurants in Baku
              </h1>
              <p className="text-gray-600 mt-2 font-medium">
                <span className="text-orange-600 font-bold">
                  {filteredRestaurants.length}
                </span>{" "}
                amazing restaurants found
              </p>
            </div>

            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 outline-none border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/90 backdrop-blur-sm transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {(allCategories as string[]).map((category: string) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden bg-orange-500 text-white px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl p-1 border-2 border-gray-200">
              <button
                title="Switch to grid view"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                title="Switch to list view"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-32">
              <FilterPanel />
            </div>
          </div>

          <div className="flex-1">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🏪</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No restaurants found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search term to find more
                  restaurants
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setMinRating(0);
                    setPriceRange([0, 20]);
                    setShowDealsOnly(false);
                    setSearchTerm("");
                    setSortBy("rating");
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={` ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }`}
              >
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isListView={viewMode === "list"}
                  />
                ))}
              </div>
            )}

            {filteredRestaurants.length > 0 && (
              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-6 py-3 text-gray-600 font-medium">
                  <Clock className="w-5 h-5" />
                  Showing all {filteredRestaurants.length} restaurants
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <FilterPanel isMobile={true} />
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #ef4444);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.6);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #ef4444);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.6);
        }

        * {
          scroll-behavior: smooth;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .sm\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .xl\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .card-loading {
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        .focus\\:ring-2:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        @supports (backdrop-filter: blur(12px)) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
          }
        }

        @media (max-width: 768px) {
          .mobile-padding {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .mobile-text {
            font-size: 0.875rem;
          }

          .mobile-card {
            margin-bottom: 1rem;
          }
        }

        button,
        input,
        select {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 1536px) {
          .xl\\:grid-cols-3 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg-primary: #1f2937;
            --text-primary: #f9fafb;
            --border-primary: #374151;
          }
        }
      `}</style>
    </div>
  );
};

export default RestaurantsPage;
