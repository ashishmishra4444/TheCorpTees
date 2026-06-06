import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Shirt,
  ArrowRight,
  Heart,
  ExternalLink,
} from "lucide-react";
import CustomButton from "../shared/CustomButton";

const footerLinks = {
  Products: [
    { label: "Corporate Apparel", path: "/gallery" },
    { label: "Employee Kits", path: "/gallery" },
    { label: "Corporate Gifting", path: "/gallery" },
    { label: "School & College", path: "/gallery" },
    { label: "Event Merchandise", path: "/gallery" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Industries We Serve", path: "/industries" },
    { label: "Our Process", path: "/about" },
    { label: "Testimonials", path: "/about" },
    { label: "Blog", path: "#" },
  ],
  Support: [
    { label: "Request a Quote", path: "/request-quote" },
    { label: "Contact Us", path: "/contact" },
    { label: "FAQ", path: "#" },
    { label: "Shipping Policy", path: "#" },
    { label: "Return Policy", path: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
    { label: "Cookie Policy", path: "#" },
    { label: "GST Information", path: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                Stay Updated with Corporate Trends
              </h3>
              <p className="text-sm text-slate-400">
                Get exclusive offers, product launches, and branding insights
                delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <CustomButton type="submit" size="md" className="shrink-0">
                {subscribed ? "Subscribed!" : "Subscribe"}
              </CustomButton>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Shirt className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">The Corp Tees</h2>
                <p className="text-[10px] text-slate-500 -mt-0.5 tracking-wide uppercase">
                  Premium Corporate Merchandise
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              India's most trusted corporate merchandise brand. We transform
              your brand identity into premium-quality products that employees
              love and customers remember.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+91-XXX-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>info@thecorptees.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              {["Fb", "Ig", "In", "X"].map((label, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 hover:text-amber-500 hover:bg-slate-700 transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Industries Served */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Industries We Serve
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Corporate Companies",
              "Startups",
              "Schools & Colleges",
              "Hospitals",
              "Manufacturing",
              "Hotels & Hospitality",
              "Event Management",
              "Government",
            ].map((industry) => (
              <span
                key={industry}
                className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 hover:text-amber-500 hover:bg-slate-700 transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright & Developer Card */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500 text-center md:text-left">
              <p>
                © {new Date().getFullYear()} The Corp Tees. All rights reserved.
                <span className="inline-flex items-center gap-1 ml-1">
                  Made with{" "}
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
                  Indore, India
                </span>
              </p>
            </div>

            {/* Developer Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                AM
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Developed by</p>
                <p className="text-sm font-bold text-amber-500">
                  Ashish Kumar Mishra
                </p>
                <p className="text-[10px] text-slate-400">
                  Principal Frontend Engineer
                </p>
              </div>
              <a
                href="#"
                className="ml-2 p-1.5 text-slate-400 hover:text-amber-500 transition-colors"
                title="View Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
