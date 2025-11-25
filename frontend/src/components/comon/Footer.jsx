import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 md:gap-0">
        {/* About */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-violet-900 mb-3">EasyFind</h2>
          <p className="text-gray-500 max-w-sm text-sm sm:text-base">
            Connect with trusted professionals near you. Book services quickly, safely, and hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-violet-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            <li><a href="/" className="hover:text-violet-500 transition">Home</a></li>
            <li><a href="/services" className="hover:text-violet-500 transition">Services</a></li>
            <li><a href="/faq" className="hover:text-violet-500 transition">FAQ</a></li>
            <li><a href="/contact" className="hover:text-violet-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-violet-700 mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:bg-violet-600 hover:text-white transition p-2 rounded-full border border-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:bg-violet-600 hover:text-white transition p-2 rounded-full border border-gray-300"><FaTwitter /></a>
            <a href="#" className="hover:bg-violet-600 hover:text-white transition p-2 rounded-full border border-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:bg-violet-600 hover:text-white transition p-2 rounded-full border border-gray-300"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm sm:text-base">
        © {new Date().getFullYear()} EasyFind. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
