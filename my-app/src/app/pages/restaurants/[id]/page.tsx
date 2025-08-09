"use client";
import React, { useState } from "react";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Percent,
  Users,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import restaurantData from "@/data/restaurants.json";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: string[];
};

type Deal = {
  id: number;
  title: string;
  image: string;
  description: string;
};

type Restaurant = {
  id: number;
  name: string;
  logo: string;
  address: string;
  rating: number;
  categories: string[];
  deals: Deal[];
  menu: MenuItem[];
};

const mockRestaurant: Restaurant = {
  id: 1,
  name: "Sushi Palace",
  logo: "/images/restaurantLogo.png",
  address: "24 Main Street, Baku",
  rating: 4.9,
  categories: ["Vegan", "Asian", "Grill"],
  deals: [
    {
      id: 1,
      title: "20% Off All Sushi",
      image: "/images/deal.png",
      description: "Get 20% discount on all sushi items",
    },
  ],
  menu: [
    {
      id: 101,
      name: "Salmon Avocado Roll",
      price: 12.63,
      image: "/images/food.png",
      ingredients: ["salmon", "avocado", "seaweed", "rice"],
    },
    {
      id: 102,
      name: "Tuna Sashimi",
      price: 15.26,
      image: "/images/food.png",
      ingredients: ["fresh tuna", "wasabi", "soy sauce"],
    },
    {
      id: 103,
      name: "California Roll",
      price: 8.3,
      image: "/images/food.png",
      ingredients: ["crab", "avocado", "cucumber", "seaweed"],
    },
    {
      id: 104,
      name: "Dragon Roll",
      price: 18.5,
      image: "/images/food.png",
      ingredients: ["eel", "cucumber", "avocado", "spicy mayo"],
    },
  ],
};

const RestaurantDetail = () => {
  const [restaurant] = useState<Restaurant>(restaurantData[0]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addItem, updateQuantity, getItemQuantity } = useCart();

  const isFavorite = favorites.includes(restaurant.id);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(restaurant.id)
        ? prev.filter((id) => id !== restaurant.id)
        : [...prev, restaurant.id]
    );
  };

  const addToCart = (menuItem: MenuItem) => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {restaurant.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative h-72 sm:h-96 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.categories.map((category) => (
                <span
                  key={category}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </button>

              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5" />
                <span className="text-sm">30-45 min delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section  */}
      {restaurant.deals.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500 p-2 rounded-full">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-red-800">Special Offers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurant.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-red-100"
                >
                  <h4 className="font-bold text-red-700 mb-1">{deal.title}</h4>
                  <p className="text-sm text-gray-600">{deal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Menu</h2>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">
              {restaurant.menu.length} items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => {
            const quantityInCart = getItemQuantity(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-200 to-red-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-50">🍱</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.ingredients.join(", ")}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      ${item.price.toFixed(2)}
                    </div>

                    {quantityInCart === 0 ? (
                      <button
                        title="Add to cart"
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-1">
                        <button
                          title="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.id, quantityInCart - 1)
                          }
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold text-orange-700 min-w-[2rem] text-center">
                          {quantityInCart}
                        </span>
                        <button
                          title="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.id, quantityInCart + 1)
                          }
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
