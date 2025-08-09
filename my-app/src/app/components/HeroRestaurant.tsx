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
import restaurantsData from "../../data/restaurants.json";

// Header Component
type HeroProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  filteredRestaurants: any[];
  allCategories: string[];
};

const HeroRestaurant = ({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  showMobileFilters,
  setShowMobileFilters,
  filteredRestaurants,
  allCategories,
}: HeroProps) => {
  return (
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
              className="w-full pl-12 pr-4 py-3 outline-none border-2  border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/90 backdrop-blur-sm transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {(allCategories as string[]).map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold cursor-pointer transition-all duration-300 transform hover:scale-105 ${
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
              className={`p-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
              className={`p-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
  );
};

export default HeroRestaurant;
