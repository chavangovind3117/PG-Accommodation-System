import React from "react";
import footerHomeIcon from "../../assets/Home/footer-home-icon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex flex-row items-center mb-2">
            <div className="flex items-center">
              <img
                src={footerHomeIcon}
                alt="PGFinder"
                className="w-6 h-6 mr-2"
                style={{ width: 24, height: 24 }}
              />
              <span className="font-bold text-lg text-white mb-2">
                PGFinder
              </span>
            </div>
          </div>
          <p>Your trusted partner in finding the perfect PG accommodation.</p>
          <div className="flex space-x-4 mt-4">
            {/* Facebook */}
            <a href="#" aria-label="Facebook">
              <svg
                className="w-5 h-5 fill-current text-white hover:text-blue-500"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" aria-label="Twitter">
              <svg
                className="w-5 h-5 fill-current text-white hover:text-blue-400"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.011-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.014-.633A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram">
              <svg
                className="w-5 h-5 fill-current text-white hover:text-pink-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.4 3.678 1.357 2.721 2.314 2.449 3.45 2.391 4.731 2.333 6.011 2.321 6.42 2.321 12s.012 5.989.07 7.269c.058 1.281.33 2.417 1.287 3.374.957.957 2.093 1.229 3.374 1.287C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.417-.33 3.374-1.287.957-.957 1.229-2.093 1.287-3.374.058-1.28.07-1.689.07-7.269s-.012-5.989-.07-7.269c-.058-1.281-.33-2.417-1.287-3.374C19.365.4 18.229.128 16.948.07 15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">For Tenants</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">Find PG</a>
            </li>
            <li>
              <a href="#">How It Works</a>
            </li>
            <li>
              <a href="#">Safety Tips</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">For Owners</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">List Your PG</a>
            </li>
            <li>
              <a href="#">Owner Guide</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              {/* Mail */}
              <a href="mailto:support@pgfinder.com" aria-label="Mail">
                <svg
                  className="w-5 h-5 fill-current text-white hover:text-red-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" />
                </svg>
              </a>
              <span>support@pgfinder.com</span>
            </div>
            <div className="flex flex-row gap-2">
              {/* Phone */}
              <a href="tel:+919876543210" aria-label="Phone">
                <svg
                  className="w-5 h-5 fill-current text-white hover:text-green-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
                </svg>
              </a>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex flex-row gap-2">
              {/* Location */}
              <a
                href="https://goo.gl/maps/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location"
              >
                <svg
                  className="w-5 h-5 fill-current text-white hover:text-purple-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
              <span>Bangalore, India</span>
            </div>
          </p>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400 text-xs border-t-1 border-gray-700 pt-4">
        © 2024 PGFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
