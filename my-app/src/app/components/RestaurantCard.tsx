import React from "react";
import { useRouter } from "next/navigation";
import { MapPin, Heart, Star, Percent } from "lucide-react";
import profileImg from "../../../public/images/restaurantLogo.png";

type Deal = {
  title: string;
};

type MenuItem = {
  price: number;
};

type Restaurant = {
  id: string;
  name: string;
  address: string;
  rating: number;
  categories: string[];
  menu: MenuItem[];
  deals: Deal[];
};

type RestaurantCardProps = {
  restaurant: Restaurant;
  isListView?: boolean;
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const RestaurantCard = ({
  restaurant,
  isListView = false,
  favorites,
  toggleFavorite,
}: RestaurantCardProps) => {
  const router = useRouter();

  const avgPrice =
    restaurant.menu && restaurant.menu.length > 0
      ? restaurant.menu.reduce((sum, item) => sum + item.price, 0) /
        restaurant.menu.length
      : 0;
  const isFavorite = favorites.includes(restaurant.id);

  const handleCardClick = () => {
    router.push(`/pages/restaurants/${restaurant.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  if (isListView) {
    return (
      <div
        className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 p-6 hover:border-orange-200 cursor-pointer transform hover:-translate-y-1"
        onClick={handleCardClick}
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg ">
              <span className="text-white text-2xl md:text-3xl font-bold">
                {restaurant.name.charAt(0)}
              </span>
              {/* <img
                src={profileImg.src}
                alt=""
                className="object-cover w-full h-full rounded-2xl"
              /> */}
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
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{restaurant.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={handleFavoriteClick}
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
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
    <div
      className="bg-white cursor-pointer rounded-2xl shadow-sm border hover:shadow-xl transition-all duration-300 overflow-hidden group border-gray-200 hover:border-orange-200 hover:-translate-y-2 transform"
      onClick={handleCardClick}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
          <span className="text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
            {restaurant.name.charAt(0)}
          </span>
          {/* <img
            src={profileImg.src}
            alt=""
            className="object-cover w-full h-full rounded-2xl"
          /> */}
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
          onClick={handleFavoriteClick}
          className={`cursor-pointer absolute top-4 right-4 p-2 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-110 ${
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
            Avg:{" "}
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

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105 opacity-0 group-hover:opacity-100">
            View Menu
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
