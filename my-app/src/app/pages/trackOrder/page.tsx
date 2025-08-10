"use client";
import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Package,
  Search,
  Bike,
  MapPin,
  CheckCircle,
  Clock,
  Star,
  Utensils,
  DollarSign,
  ArrowLeft,
  Home,
} from "lucide-react";

type OrderStatus =
  | "preparing"
  | "packaging"
  | "finding_courier"
  | "courier_pickup"
  | "on_way"
  | "arrived"
  | "delivered";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
};

type OrderData = {
  id: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  discount: number;
  activePromo: any;
  location: {
    address: string;
    city: string;
    country: string;
  };
  timestamp: string;
  status: OrderStatus;
};

const TrackOrder = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("preparing");
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(35);
  const [courierName] = useState("Ferid Ismayilov");
  const [isLoading, setIsLoading] = useState(true);

  const statusSteps: Array<{
    key: OrderStatus;
    label: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  }> = [
    {
      key: "preparing",
      label: "Your food is being prepared",
      icon: <ChefHat className="w-6 h-6" />,
      color: "bg-orange-500",
      description: "Master chefs are carefully preparing your meal",
    },
    {
      key: "packaging",
      label: "Order is being packaged",
      icon: <Package className="w-6 h-6" />,
      color: "bg-blue-500",
      description: "Your food is being safely packaged",
    },
    {
      key: "finding_courier",
      label: "Finding courier",
      icon: <Search className="w-6 h-6" />,
      color: "bg-purple-500",
      description: "Searching for the nearest courier",
    },
    {
      key: "courier_pickup",
      label: "Courier picks up order",
      icon: <Bike className="w-6 h-6" />,
      color: "bg-indigo-500",
      description: "Courier receives the order from restaurant",
    },
    {
      key: "on_way",
      label: "Courier is heading to you",
      icon: <MapPin className="w-6 h-6" />,
      color: "bg-green-500",
      description: "Courier is on the way to your address",
    },
    {
      key: "arrived",
      label: "Courier has arrived",
      icon: <Home className="w-6 h-6" />,
      color: "bg-yellow-500",
      description: "Courier has arrived at your address",
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-emerald-500",
      description: "Your order has been successfully delivered!",
    },
  ];

  useEffect(() => {
    setOrderData({
      id: "ORD" + Date.now(),
      items: [
        {
          id: 1,
          name: "Chicken Burger",
          price: 15.99,
          quantity: 2,
          restaurantName: "Burger Palace",
        },
        {
          id: 2,
          name: "French Fries",
          price: 5.99,
          quantity: 1,
          restaurantName: "Burger Palace",
        },
        {
          id: 3,
          name: "Coca Cola",
          price: 2.99,
          quantity: 2,
          restaurantName: "Burger Palace",
        },
      ],
      total: 42.96,
      subtotal: 42.96,
      discount: 0,
      activePromo: null,
      location: {
        address: "28 May Street 15",
        city: "Baku",
        country: "Azerbaijan",
      },
      timestamp: new Date().toISOString(),
      status: "preparing",
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentStatus !== "delivered") {
      interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 60000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStatus]);

  useEffect(() => {
    const currentIndex = statusSteps.findIndex(
      (step) => step.key === currentStatus
    );
    if (currentIndex !== -1) {
      setProgress(((currentIndex + 1) / statusSteps.length) * 100);
    }

    // 10 saniye sumilyasiya
    if (currentStatus !== "delivered") {
      const timer = setTimeout(() => {
        const currentIndex = statusSteps.findIndex(
          (step) => step.key === currentStatus
        );
        if (currentIndex < statusSteps.length - 1) {
          setCurrentStatus(statusSteps[currentIndex + 1].key);
        }
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentStatus]);

  const formatTime = (minutes: number) => {
    if (minutes <= 0) return "Very soon...";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  function getCurrentStepIndex() {
    return statusSteps.findIndex((step) => step.key === currentStatus);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order not found
          </h1>
          <p className="text-gray-600 mb-6">You need to place an order first</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-blue-50">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-orange-300 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <button
            title="button"
            onClick={() => window.history.back()}
            className="absolute left-4 top-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="inline-block animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
              <Utensils className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">
            Order ID:{" "}
            <span className="font-mono font-bold text-orange-600">
              #{orderData.id}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-500 hover:shadow-2xl border border-orange-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Order contents
              </h3>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-xl border border-orange-200 transform transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.restaurantName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        x{item.quantity}
                      </p>
                      <p className="text-sm text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Payment information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">
                    ${orderData.subtotal.toFixed(2)}
                  </span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${orderData.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ${orderData.total.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 mt-4">
                  <p className="text-sm text-gray-600 mb-1">
                    Delivery address:
                  </p>
                  <p className="font-medium text-gray-800">
                    {orderData.location.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData.location.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Preparation Progress
            </h2>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-gray-700">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-white opacity-30 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-orange-400 rounded-full shadow-lg transition-all duration-1000 animate-pulse"
              style={{ left: `calc(${progress}% - 12px)` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {statusSteps.map((step, index) => {
              const isActive = step.key === currentStatus;
              const isCompleted = index < getCurrentStepIndex();

              return (
                <div
                  key={step.key}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-500 transform ${
                    isActive
                      ? "scale-110 shadow-2xl border-orange-400 bg-gradient-to-br from-orange-50 to-green-50"
                      : isCompleted
                      ? "border-green-400 bg-gradient-to-br from-green-50 to-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isActive ? "animate-pulse" : ""}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {isActive && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
                  )}

                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto transition-all duration-300 ${
                      isActive
                        ? step.color
                        : isCompleted
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } ${isActive ? "animate-bounce" : ""}`}
                  >
                    {isCompleted && !isActive ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <div className="text-white">{step.icon}</div>
                    )}
                  </div>

                  <h4
                    className={`text-sm font-bold text-center mb-2 ${
                      isActive
                        ? "text-orange-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </h4>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    {step.description}
                  </p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-b-xl animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {currentStatus !== "preparing" && currentStatus !== "packaging" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-100 transform transition-all duration-500 animate-slide-up">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bike className="w-6 h-6 text-blue-500" />
              Courier information
            </h3>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl text-white font-bold">
                  {courierName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800">
                  {courierName}
                </h4>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Experienced courier • 500+ deliveries
                </p>
              </div>

              <div className="text-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mb-1"></div>
                <p className="text-xs text-green-600 font-medium">Active</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-500" />
            Live updates
          </h3>

          <div className="space-y-4 max-h-64 overflow-y-auto">
            {statusSteps
              .slice(0, getCurrentStepIndex() + 1)
              .reverse()
              .map((step, index) => (
                <div
                  key={step.key}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-500 ${
                    index === 0
                      ? "bg-gradient-to-r from-orange-50 to-green-50 border-2 border-orange-200 animate-pulse"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      index === 0 ? step.color : "bg-green-500"
                    }`}
                  >
                    {index === 0 ? (
                      <div className="text-white animate-spin">{step.icon}</div>
                    ) : (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`font-bold ${
                        index === 0 ? "text-orange-600" : "text-green-600"
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {index === 0 ? "Now" : `${(index + 1) * 10} seconds ago`}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {currentStatus === "delivered" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full transform transition-all duration-500 scale-100 ">
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Congratulations!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your order has been successfully delivered!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Homepage
                </button>
                <button
                  onClick={() => {
                    setCurrentStatus("delivered");
                    window.location.href = "/";
                  }}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TrackOrder;
