import { SlidersHorizontal, X, Percent } from "lucide-react";
type FilterPanelProps = {
  isMobile?: boolean;
  sortBy: string;
  setSortBy: (value: string) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showDealsOnly: boolean;
  setShowDealsOnly: (value: boolean) => void;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  setShowMobileFilters: (show: boolean) => void;
};

const FilterPanel = ({
  isMobile = false,
  sortBy,
  setSortBy,
  minRating,
  setMinRating,
  priceRange,
  setPriceRange,
  showDealsOnly,
  setShowDealsOnly,
  setSelectedCategory,
  setSearchTerm,
  setShowMobileFilters,
}: FilterPanelProps) => {
  return (
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
            className="w-full border-2 border-gray-200 rounded-xl outline-none cursor-pointer px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-200"
            aria-label="Sort by"
          >
            <option value="rating">Rating (High to Low)</option>
            <option value="name">Name (A to Z)</option>
            <option value="deals">Most Deals</option>
            <option value="price_low">Price (Low to High)</option>
            <option value="price_high">Price (High to Low)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Minimum Rating:{" "}
            <span className="text-orange-600 font-bold">
              {minRating.toFixed(1)}+
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
            <span>0</span>
            <span>5</span>
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
};

export default FilterPanel;
