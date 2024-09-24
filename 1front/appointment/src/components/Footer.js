import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
