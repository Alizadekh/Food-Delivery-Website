"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ChevronUp,
  Heart,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    company: [
      { label: "About Us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Investor Relations", href: "/" },
    ],
    services: [
      { label: "Food Delivery", href: "/" },
      { label: "Restaurants", href: "/" },
      { label: "Corporate Catering", href: "/" },
      { label: "Gift Cards", href: "/" },
      { label: "Order Tracking", href: "/" },
    ],
    support: [
      { label: "Help Center", href: "/" },
      { label: "Contact Us", href: "/" },
      { label: "Order Issues", href: "/" },
      { label: "Refund Policy", href: "/" },
      { label: "Accessibility", href: "/" },
    ],
    legal: [
      { label: "Terms and Conditions", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Cookie Policy", href: "/" },
      { label: "Modern Slavery Statement", href: "/" },
      { label: "Data Protection", href: "/" },
    ],
    partners: [
      { label: "Become a Partner", href: "/" },
      { label: "Get Help", href: "/" },
      { label: "Add Your Restaurant", href: "/" },
      { label: "Sign Up to Deliver", href: "/" },
      { label: "Create a Business Account", href: "/" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Baku, Azerbaijan" },
    { icon: Phone, text: "+773079115" },
    { icon: Mail, text: "support@order.uk" },
    { icon: Clock, text: "24/7 Customer Support" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-500 rounded-full blur-2xl" />
      </div>

      <div className="border-b border-gray-700 bg-gradient-to-r from-orange-600/10 to-red-600/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Get Exclusive Deals in your inbox
              </h3>
              <p className="text-gray-300 text-lg mb-2">
                Subscribe to our newsletter and never miss out on special
                offers!
              </p>
              <p className="text-gray-400 text-sm">
                We won't spam, read our{" "}
                <Link
                  href="/privacy"
                  className="text-orange-400 hover:text-orange-300 underline"
                >
                  email policy
                </Link>
              </p>
            </div>

            <div className="lg:pl-8">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@gmail.com"
                    className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isSubscribed
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">O</span>
                </div>
                <span className="text-2xl font-bold">Order.UK</span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Order.UK is your trusted food delivery partner, connecting you
                with the best restaurants in your area. Fast, fresh, and
                reliable - that's our promise.
              </p>

              <div className="space-y-3">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{info.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6">Partners</h4>
            <ul className="space-y-3">
              {footerLinks.partners.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Download Our Mobile App
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Get faster access to your favorite restaurants and exclusive
                mobile-only deals
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#" className="group">
                  <div className="flex items-center gap-3 bg-black hover:bg-gray-800 border border-gray-600 hover:border-gray-500 rounded-2xl px-6 py-4 transition-all duration-300 transform hover:scale-105">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">A</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Download on the</p>
                      <p className="text-lg font-semibold text-white">
                        App Store
                      </p>
                    </div>
                  </div>
                </Link>

                <Link href="#" className="group">
                  <div className="flex items-center gap-3 bg-black hover:bg-gray-800 border border-gray-600 hover:border-gray-500 rounded-2xl px-6 py-4 transition-all duration-300 transform hover:scale-105">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Get it on</p>
                      <p className="text-lg font-semibold text-white">
                        Google Play
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="lg:text-right">
              <h4 className="text-xl font-bold mb-6">Follow Us</h4>
              <div className="flex lg:justify-end gap-4 mb-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>

              <div className="text-gray-400 text-sm">
                <p>Company # 490039-445, Registered with</p>
                <p>House of companies.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 mb-8">
            {footerLinks.legal.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2025 Order.UK. Made by Alizadekh</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>in Baku</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm cursor-pointer"
            >
              <span>Back to Top</span>
              <div className="w-8 h-8 bg-white/10 hover:bg-orange-400 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                <ChevronUp className="w-4 h-4 group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
