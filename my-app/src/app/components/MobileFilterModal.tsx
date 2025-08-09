import FilterPanel from "./FilterRestaurant";

type MobileFilterModalProps = {
  showMobileFilters: boolean;
  setShowMobileFilters: (value: boolean) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  showDealsOnly: boolean;
  setShowDealsOnly: (value: boolean) => void;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
};

const MobileFilterModal = ({
  showMobileFilters,
  setShowMobileFilters,
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
}: MobileFilterModalProps) => {
  return (
    <>
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <FilterPanel
              isMobile={true}
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
      )}
    </>
  );
};

export default MobileFilterModal;
