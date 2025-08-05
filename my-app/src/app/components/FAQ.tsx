"use client";

import React, { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  Users,
  Award,
  MapPin,
  Smartphone,
} from "lucide-react";

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("frequent");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const tabs = [
    {
      id: "frequent",
      label: "Frequent Questions",
      icon: HelpCircle,
      color: "orange",
    },
    {
      id: "about",
      label: "Who we are?",
      icon: Users,
      color: "blue",
    },
    {
      id: "partner",
      label: "Partner Program",
      icon: Award,
      color: "green",
    },
    {
      id: "support",
      label: "Help & Support",
      icon: MapPin,
      color: "purple",
    },
  ];

  const faqData: Record<string, Array<{ question: string; answer: string }>> = {
    frequent: [
      {
        question: "How does Order.UK work?",
        answer:
          "Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery. Your payment information is always secure with our encrypted payment system.",
      },
      {
        question: "Can I track my order in real-time?",
        answer:
          "Absolutely! Once your order is confirmed, you'll receive a tracking link. You can monitor your order status, see when it's being prepared, picked up, and estimated delivery time.",
      },
      {
        question: "Are there any special discounts or promotions available?",
        answer:
          "Yes! We regularly offer special deals, first-time user discounts, and seasonal promotions. Subscribe to our newsletter and follow us on social media to stay updated on the latest offers.",
      },
      {
        question: "Is Order.UK available in my area?",
        answer:
          "We're rapidly expanding our service areas. Enter your postcode on our homepage to check availability in your location. If we're not there yet, we're working hard to reach you soon!",
      },
    ],
    about: [
      {
        question: "What is Order.UK's mission?",
        answer:
          "Our mission is to connect people with their favorite food through a seamless, fast, and reliable delivery experience. We believe everyone deserves access to great food, delivered fresh and fast.",
      },
      {
        question: "When was Order.UK founded?",
        answer:
          "Order.UK was founded in 2020 with a vision to revolutionize food delivery in the UK. Since then, we've grown to serve thousands of customers across multiple cities.",
      },
      {
        question: "How many restaurants partner with Order.UK?",
        answer:
          "We proudly partner with over 690+ restaurants, ranging from local favorites to popular chains, ensuring diverse culinary options for every taste and preference.",
      },
    ],
    partner: [
      {
        question: "How can I become a restaurant partner?",
        answer:
          "Join our growing network of restaurant partners! Simply fill out our partnership application form, and our team will guide you through the onboarding process. We offer competitive commission rates and marketing support.",
      },
      {
        question: "What are the benefits of partnering with Order.UK?",
        answer:
          "Partners enjoy increased visibility, access to our large customer base, real-time analytics, marketing support, and flexible commission structures. We help grow your business while you focus on creating great food.",
      },
      {
        question: "How do I become a delivery rider?",
        answer:
          "We're always looking for reliable delivery riders! Apply through our rider portal, complete the verification process, and start earning with flexible schedules and competitive pay rates.",
      },
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer:
          "Our customer support team is available 24/7 through live chat, email at support@order.uk, or phone at +44 800 123 4567. We're here to help with any questions or concerns.",
      },
      {
        question: "What if my order is delayed or incorrect?",
        answer:
          "We apologize for any inconvenience! Contact our support team immediately, and we'll resolve the issue quickly. This may include a refund, redelivery, or credit for your next order.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 2 minutes of placing it. After that, please contact our support team, and we'll do our best to accommodate your request depending on the order status.",
      },
    ],
  };

  const howItWorksSteps = [
    {
      icon: Smartphone,
      title: "Place an Order!",
      description: "Place order through our website or Mobile app",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: HelpCircle,
      title: "Track Progress",
      description: "You can track your order status with delivery time",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Award,
      title: "Get your Order!",
      description: "Receive your order at a lightning fast speed!",
      color: "from-green-400 to-green-600",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const getTabColor = (color: string) => {
    const colors = {
      orange: "border-orange-400 bg-orange-50 text-orange-600",
      blue: "border-blue-400 bg-blue-50 text-blue-600",
      green: "border-green-400 bg-green-50 text-green-600",
      purple: "border-purple-400 bg-purple-50 text-purple-600",
    };
    return colors[color as keyof typeof colors] || colors.orange;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Know more
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent ml-2">
              about us!
            </span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Find answers to common questions and learn more about our services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setOpenFAQ(0);
                    }}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? getTabColor(tab.color)
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {faqData[activeTab]?.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openFAQ === index
                          ? "bg-orange-100 text-orange-600 rotate-180"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 sm:p-12 border border-orange-100">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                How It Works
              </h3>

              <div className="space-y-8">
                {howItWorksSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-6 group">
                      <div
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 text-center">
                <button className="group bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                  <span className="flex items-center justify-center gap-2">
                    Start Your Order
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
