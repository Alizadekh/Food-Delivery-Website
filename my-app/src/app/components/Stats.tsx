"use client";

import React, { useEffect, useState } from "react";
import { Users, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    riders: 0,
    orders: 0,
    restaurants: 0,
    items: 0,
  });

  const finalNumbers = {
    riders: 546,
    orders: 789900,
    restaurants: 690,
    items: 17457,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const intervals = 60;
      const step = duration / intervals;

      const animateNumber = (key: keyof typeof finalNumbers) => {
        let current = 0;
        const increment = finalNumbers[key] / intervals;

        const timer = setInterval(() => {
          current += increment;
          if (current >= finalNumbers[key]) {
            current = finalNumbers[key];
            clearInterval(timer);
          }
          setAnimatedNumbers((prev) => ({
            ...prev,
            [key]: Math.floor(current),
          }));
        }, step);
      };

      setTimeout(() => animateNumber("riders"), 100);
      setTimeout(() => animateNumber("orders"), 200);
      setTimeout(() => animateNumber("restaurants"), 300);
      setTimeout(() => animateNumber("items"), 400);
    }
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toLocaleString();
  };

  const statsData = [
    {
      icon: Users,
      value: animatedNumbers.riders,
      suffix: "+",
      label: "Registered Riders",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: ShoppingBag,
      value: animatedNumbers.orders,
      suffix: "+",
      label: "Orders Delivered",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Store,
      value: animatedNumbers.restaurants,
      suffix: "+",
      label: "Restaurant Partners",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: UtensilsCrossed,
      value: animatedNumbers.items,
      suffix: "+",
      label: "Food Items",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section
      id="stats-section"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            Our Amazing
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Journey So Far
            </span>
          </h2>
          <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers in the fastest-growing food
            delivery network
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl ${stat.bgColor} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${stat.iconColor}`}
                  />
                </div>

                <div className="mb-3 sm:mb-4">
                  <span
                    className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block leading-tight`}
                  >
                    {stat.value === finalNumbers.orders
                      ? `${Math.floor(stat.value / 1000)}K`
                      : formatNumber(stat.value)}
                    {stat.suffix}
                  </span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-semibold font-['Poppins'] leading-tight">
                  {stat.label}
                </p>

                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl sm:rounded-3xl`}
                />

                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl sm:rounded-3xl blur-xl -z-10`}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-white/90 text-lg sm:text-xl mb-6">
            Ready to be part of our success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer group bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center gap-2">
                Start Ordering
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
            <button className="cursor-pointer group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Become a Partner
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
