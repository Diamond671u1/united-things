import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">United things</h3>
            <p className="text-gray-400">Your one-stop B2B supply partner.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2"><a href="#categories" className="hover:text-brand-accent">Categories</a></li>
              <li className="mb-2"><a href="#" className="hover:text-brand-accent">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-brand-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Industries Served</h4>
            <ul>
              <li className="mb-2 text-gray-400">Hotels & Hospitality</li>
              <li className="mb-2 text-gray-400">Corporate Offices</li>
              <li className="mb-2 text-gray-400">Hospitals & Healthcare</li>
              <li className="mb-2 text-gray-400">Public Venues</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              C Zone, Plot No. 7 & 7A, <br/>
              Thane - Belapur Rd, Turbhe, <br/>
              Navi Mumbai, Maharashtra 400703
            </p>
            <p className="text-gray-400 mt-2">Email: unitedthings19@gmail.com</p>
            <p className="text-gray-400 mt-2">Phone: +91 7021517961</p>
            <p className="text-gray-400 mt-2">CEO: Yash More</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} United things. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
