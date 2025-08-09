"use client";
import { useState, useEffect, useMemo } from "react";
import restaurantsData from "../../../data/restaurants.json";
import HeroRestaurant from "../../components/HeroRestaurant";
import FilterPanel from "../../components/FilterRestaurant";
import RestaurantCard from "../../components/RestaurantCard";
import { FaRegClock as Clock } from "react-icons/fa";
import MobileFilterModal from "../../components/MobileFilterModal";

const RestaurantsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showDealsOnly, setShowDealsOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);

  const allCategories = useMemo<string[]>(() => {
    const categories = new Set<string>();
    restaurantsData.forEach((restaurant) => {
      restaurant.categories.forEach((category: string) =>
        categories.add(category)
      );
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
    id: string;
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

  const filteredRestaurants = useMemo(() => {
    const normalizedRestaurants = restaurantsData.map((restaurant) => ({
      ...restaurant,
      id: String(restaurant.id),
    }));

    let filtered = normalizedRestaurants.filter((restaurant) => {
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
    (restaurantId: string): void;
  }

  const toggleFavorite: ToggleFavoriteFn = (restaurantId) => {
    setFavorites((prev: string[]) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <HeroRestaurant
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        filteredRestaurants={filteredRestaurants}
        allCategories={allCategories}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-32">
              <FilterPanel
                sortBy={sortBy}
                setSortBy={setSortBy}
                minRating={minRating}
                setMinRating={setMinRating}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                showDealsOnly={showDealsOnly}
                setShowDealsOnly={setShowDealsOnly}
                setSelectedCategory={setSelectedCategory}
                setSearchTerm={setSearchTerm}
                setShowMobileFilters={setShowMobileFilters}
              />
            </div>
          </div>

          <div className="flex-1">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🏪</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sorry, No restaurants found
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
                    key={String(restaurant.id)}
                    restaurant={{
                      ...restaurant,
                      id: String(restaurant.id),
                    }}
                    isListView={viewMode === "list"}
                    favorites={favorites.map(String)}
                    toggleFavorite={toggleFavorite}
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

      <MobileFilterModal
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minRating={minRating}
        setMinRating={setMinRating}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showDealsOnly={showDealsOnly}
        setShowDealsOnly={setShowDealsOnly}
        setSelectedCategory={setSelectedCategory}
        setSearchTerm={setSearchTerm}
      />

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
