
import {Link} from '@/i18n/navigation';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-natural-charcoal text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">NatureHarvest</h3>
            <p className="text-gray-300 max-w-xs">
              Bringing pure and organic products from nature's lap to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-natural-golden transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-natural-golden transition-colors">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-natural-golden transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-natural-golden transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-300 not-italic">
              {/* <p>123 Nature Street</p> */}
              {/* <p>Green Valley, Earth</p> */}
              <p className="mt-2">Phone: +91 98765 43210</p>
              <p>Email: info@natureharvest.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} NatureHarvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
