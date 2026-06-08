import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
// Importing specific social icons from react-icons
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F4C81] text-white border-t border-[#0d3f6d] shrink-0 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Information Section */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <img
              src="/products/TCT LOGO.png"
              alt="The Corp Tees"
              className="h-20 lg:h-32 md:h-28 sm:h-28 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-blue-100 leading-relaxed font-normal">
            Premium corporate merchandise, uniform engineering, and tactical
            gifting solutions for modern institutions.
          </p>

          {/* Follow Us Section */}
          <div className="mt-4">
            <h4 className="text-[#EAB308] text-xs font-bold uppercase tracking-widest mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4 text-white">
              <a href="#" className="hover:text-[#EAB308] transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#EAB308] transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#EAB308] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="flex flex-col gap-6">
          <h4 className="text-[#EAB308] text-sm font-bold uppercase tracking-widest">
            Categories
          </h4>
          <ul className="space-y-3 text-sm font-medium text-blue-50">
            <li>
              <Link
                to="/gallery?category=corporate-apparel"
                className="hover:text-[#EAB308] transition-colors flex items-center justify-between"
              >
                Corporate Apparel <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link
                to="/gallery?category=employee-kits"
                className="hover:text-[#EAB308] transition-colors flex items-center justify-between"
              >
                Employee Kits <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link
                to="/gallery?category=corporate-gifting"
                className="hover:text-[#EAB308] transition-colors flex items-center justify-between"
              >
                Corporate Gifting <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Corporate Resources */}
        <div className="flex flex-col gap-6">
          <h4 className="text-[#EAB308] text-sm font-bold uppercase tracking-widest">
            Resources
          </h4>
          <ul className="space-y-3 text-sm font-medium text-blue-50">
            <li>
              <Link
                to="/about"
                className="hover:text-[#EAB308] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/industries"
                className="hover:text-[#EAB308] transition-colors"
              >
                Industries Served
              </Link>
            </li>
            <li>
              <Link
                to="/request-quote"
                className="hover:text-[#EAB308] transition-colors"
              >
                Quote Request
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-6">
          <h4 className="text-[#EAB308] text-sm font-bold uppercase tracking-widest">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-blue-50">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#EAB308] shrink-0" /> Vijay
              Nagar, Indore, MP
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#EAB308] shrink-0" /> +91 (731)
              405-9281
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#EAB308] shrink-0" />{" "}
              hello@thecorptees.com
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#0b365d] py-6 text-center text-xs text-blue-200">
        <p>© 2026 The Corp Tees. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
