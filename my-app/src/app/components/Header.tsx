"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/navigation";

import logo from "../../assets/img/logo.png";
import { BiSolidOffer } from "react-icons/bi";
import { FaLocationDot, FaLocationArrow } from "react-icons/fa6";
import { TbBasketCheck } from "react-icons/tb";
import { FaCircleArrowDown } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { MapPin, Percent, Trash2, Plus, Minus } from "lucide-react";

type LocationData = {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const router = useRouter();

  // Context-dən məlumatları götürürük
  const {
    state,
    updateQuantity,
    removeItem,
    toggleModal,
    applyPromo,
    removePromo,
  } = useCart();

  const [location, setLocation] = useState<LocationData>({
    address: "Əli İsazadə küçəsi",
    city: "Bakı",
    country: "Azərbaycan",
  });
  const [customAddress, setCustomAddress] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [promoInput, setPromoInput] = useState("");

  // Available olan promo codelar
  const availablePromoCodes = [
    {
      id: "1",
      code: "ORDER5",
      discount: 5,
      type: "percentage" as const,
      description: "Get 5% off your first order",
      minOrder: 0,
      expiryDate: "2024-12-31",
    },
    {
      id: "2",
      code: "WELCOME10",
      discount: 10,
      type: "percentage" as const,
      description: "10% off for new customers",
      minOrder: 20,
      expiryDate: "2024-12-31",
    },
    {
      id: "3",
      code: "SAVE3",
      discount: 3,
      type: "fixed" as const,
      description: "$3 off any order",
      minOrder: 15,
      expiryDate: "2024-12-31",
    },
  ];

  const { isAuthenticated, user } = useSelector(
    (state: RootState) =>
      state.auth as {
        isAuthenticated: boolean;
        user: { name?: string } | null;
      }
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const detectCurrentLocation = async () => {
    setIsDetectingLocation(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );

          if (response.ok) {
            const data = await response.json();
            const result = data.results[0];

            if (result) {
              setLocation({
                address: result.formatted || `${latitude}, ${longitude}`,
                city:
                  result.components.city ||
                  result.components.town ||
                  "Unknown City",
                country: result.components.country || "Unknown Country",
                coordinates: { lat: latitude, lng: longitude },
              });
            }
          } else {
            setLocation({
              address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              city: "Current Location",
              country: "",
              coordinates: { lat: latitude, lng: longitude },
            });
          }
        } catch (error) {
          console.error("Error getting address:", error);
          setLocation({
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            city: "Current Location",
            country: "",
            coordinates: { lat: latitude, lng: longitude },
          });
        }

        setIsDetectingLocation(false);
        setIsLocationModalOpen(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to detect location. Please enter manually.");
        setIsDetectingLocation(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const updateCustomLocation = () => {
    if (customAddress.trim()) {
      setLocation({
        address: customAddress,
        city: customAddress.split(",")[1]?.trim() || "Unknown City",
        country: customAddress.split(",")[2]?.trim() || "Unknown Country",
      });
      setCustomAddress("");
      setIsLocationModalOpen(false);
    }
  };

  const applyPromoCode = () => {
    const promo = availablePromoCodes.find(
      (p) => p.code.toLowerCase() === promoInput.toLowerCase()
    );
    if (promo) {
      const success = applyPromo(promo);
      if (success) {
        setPromoInput("");
        setIsPromoModalOpen(false);
      } else {
        alert(
          `Minimum order of $${promo.minOrder} required for this promo code`
        );
      }
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    removePromo();
  };

  const updateCartQuantity = (id: number, change: number) => {
    const currentItem = state.items.find((item) => item.id === id);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity <= 0) {
        removeItem(id);
      } else {
        updateQuantity(id, newQuantity);
      }
    }
  };

  const handlePlaceOrder = () => {
    if (state.items.length === 0) {
      alert("Səbətiniz boşdur!");
      return;
    }

    const orderData = {
      id: Date.now().toString(),
      items: state.items,
      total: state.total,
      subtotal: state.subtotal,
      discount: state.discount,
      activePromo: state.activePromo,
      location: location,
      timestamp: new Date().toISOString(),
      status: "preparing",
    };

    localStorage.setItem("currentOrder", JSON.stringify(orderData));

    toggleModal();

    router.push("/pages/trackOrder");
  };

  return (
    <>
      <header className="relative">
        {/* Desktop üst header */}
        <div className="hidden lg:block w-[85%] m-auto bg-neutral-50 rounded-bl-xl rounded-br-xl border border-black/10">
          <div className="w-[95%] m-auto flex justify-between items-center py-3">
            <div>
              <p className="flex items-center text-black text-sm xl:text-base font-medium font-['Poppins']">
                <span className="mr-1 text-orange-400">
                  <BiSolidOffer />
                </span>
                Get
                <span className="ml-1">5%</span>Off your first order,
                <span className="text-orange-500 ml-1"> PROMO:ORDER5</span>
              </p>
            </div>
            <div className="flex items-center text-black text-sm xl:text-base font-medium font-['Poppins']">
              <p className="flex items-center">
                <span className="mr-1.5">
                  <FaLocationDot />
                </span>
                <span className="hidden xl:inline">
                  {location.address}, {location.city}
                </span>
                <span className="xl:hidden">{location.city}</span>
              </p>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="ml-3 text-orange-400 cursor-pointer hover:underline transition-colors duration-300"
              >
                Change Location
              </button>
            </div>
            <div
              className="bg-green-700 rounded-xl border p-3 xl:p-4 border-black/10 flex items-center gap-2 xl:gap-4 justify-between text-white text-sm xl:text-base font-medium font-['Poppins'] cursor-pointer hover:bg-green-800 transition-colors duration-300"
              onClick={toggleModal}
            >
              <div className="border-r-2 pr-2 xl:pr-4">
                <span className="text-xl xl:text-2xl">
                  <TbBasketCheck />
                </span>
              </div>
              <div className="border-r-2 pr-2 xl:pr-4">
                <p className="flex items-center gap-1">
                  Items:
                  <span>{state.itemCount}</span>
                </p>
              </div>
              <div>
                <p>
                  <span>{state.total.toFixed(2)}</span> AZN
                </p>
              </div>
              <div>
                <button
                  title="checkout"
                  className="flex items-center gap-1 text-xl border-l-2 pl-2 xl:pl-4 hover:text-orange-300 transition-colors duration-300 cursor-pointer"
                >
                  <FaCircleArrowDown />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet üst header - Cart Button */}
        <div className="lg:hidden w-full px-4 py-2 bg-neutral-50 border-b border-black/10">
          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="bg-green-700 cursor-pointer hover:bg-green-800 transition-all duration-300 rounded-lg px-4 py-2 text-white font-medium font-['Poppins'] flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <TbBasketCheck className="text-lg" />
              <span className="text-sm">
                {state.itemCount} Items • {state.total.toFixed(2)} AZN
              </span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[85%] m-auto flex justify-between items-center py-3 px-4 lg:px-0">
          <div className="w-20 md:w-24 lg:w-[15%]">
            <Image src={logo} alt="Logo" className="w-full h-auto" />
          </div>

          <nav className="hidden lg:flex items-center justify-between gap-6">
            <ul className="flex items-center gap-5 text-black text-base font-medium font-['Poppins']">
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/">Home</Link>
              </li>
              <li className="p-4 rounded-[20px] hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                <Link href="/pages/restaurants">Restaurants</Link>
              </li>
            </ul>
            <div className="p-4 rounded-[20px] bg-slate-950 hover:bg-slate-800 text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
              {isAuthenticated ? (
                <p className="flex items-center gap-2 text-white text-base font-medium font-['Poppins']">
                  <span className="text-xl text-orange-400">
                    <CgProfile />
                  </span>
                  <span>{user?.name || "Ayxan"}</span>
                </p>
              ) : (
                <Link href="/login">
                  <p className="flex items-center gap-2 text-white text-base font-medium font-['Poppins']">
                    <span className="text-xl text-orange-400">
                      <CgProfile />
                    </span>
                    <span>Login/Signup</span>
                  </p>
                </Link>
              )}
            </div>
          </nav>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 transform ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 transform ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMenu}
        />

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                aria-label="Close menu"
              >
                <AiOutlineClose className="text-2xl text-gray-600" />
              </button>
            </div>

            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/restaurants"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trackOrder"
                    onClick={closeMenu}
                    className="block p-4 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300 text-black text-lg font-medium font-['Poppins'] transform hover:scale-105"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="p-4 rounded-lg bg-slate-950 hover:bg-slate-800 text-white transition-all duration-300 cursor-pointer transform hover:scale-105">
                  {isAuthenticated ? (
                    <p className="flex items-center gap-2 text-white text-lg font-medium font-['Poppins']">
                      <span className="text-xl text-orange-400">
                        <CgProfile />
                      </span>
                      <span>{user?.name || "Ayxan"}</span>
                    </p>
                  ) : (
                    <Link href="/login" onClick={closeMenu}>
                      <p className="flex items-center gap-2 text-white text-lg font-medium font-['Poppins']">
                        <span className="text-xl text-orange-400">
                          <CgProfile />
                        </span>
                        <span>Login/Signup</span>
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {state.isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md mx-auto max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold font-['Poppins'] text-gray-800">
                Cart Details
              </h3>
              <button
                onClick={toggleModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <AiOutlineClose className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              <div className="p-6 space-y-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="flex items-center text-gray-800 text-sm font-medium font-['Poppins']">
                    <span className="mr-2 text-orange-400">
                      <BiSolidOffer />
                    </span>
                    Get <span className="mx-1 font-bold">5%</span> Off your
                    first order
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-orange-600 font-semibold">
                      PROMO: ORDER5
                    </p>
                    <button
                      onClick={() => setIsPromoModalOpen(true)}
                      className="text-orange-500 text-sm font-medium hover:underline"
                    >
                      View All Codes
                    </button>
                  </div>
                  {state.activePromo && (
                    <div className="mt-2 p-2 bg-green-100 rounded flex items-center justify-between">
                      <span className="text-green-700 text-sm font-medium">
                        {state.activePromo.code} Applied! -
                        {state.activePromo.type === "percentage"
                          ? `${state.activePromo.discount}%`
                          : `${state.activePromo.discount}`}
                      </span>
                      <button
                        title="button"
                        onClick={removePromoCode}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="flex items-center text-gray-800 text-sm font-medium font-['Poppins'] mb-2">
                    <span className="mr-2 text-gray-600">
                      <FaLocationDot />
                    </span>
                    {location.address}, {location.city}
                  </p>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-orange-500 text-sm font-medium hover:underline transition-colors duration-300 cursor-pointer"
                  >
                    Change Location
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Order Items</h4>
                  {state.items.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Your cart is empty
                    </p>
                  ) : (
                    state.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">
                            {item.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} each
                          </p>
                          <p className="text-xs text-gray-500">
                            from {item.restaurantName}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            title="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            title="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {state.items.length > 0 && (
                  <div className="bg-white border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${state.subtotal.toFixed(2)}</span>
                    </div>
                    {state.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({state.activePromo?.code}):</span>
                        <span>-${state.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ${state.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {state.items.length > 0 && (
                  <div className="space-y-3">
                    {/* Checkout düyməsi */}
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <TbBasketCheck className="text-2xl" />
                      <span>Complete Order - ${state.total.toFixed(2)}</span>
                      <FaCircleArrowDown className="text-xl animate-bounce" />
                    </button>

                    <div className="text-center text-xs text-gray-500">
                      Once your order is confirmed, you will be redirected to
                      the tracking page
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Change Location
              </h3>
              <button
                title="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Current Location
                </h4>
                <p className="text-blue-700 text-sm">
                  {location.address}, {location.city}
                </p>
              </div>

              <button
                onClick={detectCurrentLocation}
                disabled={isDetectingLocation}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                <FaLocationArrow
                  className={`w-4 h-4 ${
                    isDetectingLocation ? "animate-spin" : ""
                  }`}
                />
                {isDetectingLocation ? "Detecting..." : "Use Current Location"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="Enter custom address..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={updateCustomLocation}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Update Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPromoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Promo Codes</h3>
              <button
                title="button"
                onClick={() => setIsPromoModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh]">
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">
                    Available Codes
                  </h4>
                  {availablePromoCodes.map((promo) => (
                    <div
                      key={promo.id}
                      className="border rounded-lg p-4 hover:border-orange-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-orange-500" />
                          <span className="font-bold text-orange-600">
                            {promo.code}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setPromoInput(promo.code);
                            applyPromoCode();
                          }}
                          className="text-sm bg-orange-100 hover:bg-orange-200 text-orange-600 px-3 py-1 rounded-full transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {promo.description}
                      </p>
                      {promo.minOrder && (
                        <p className="text-xs text-gray-500">
                          Min order: ${promo.minOrder}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
