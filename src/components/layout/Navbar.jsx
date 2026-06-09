import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import CustomButton from '../shared/CustomButton';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/gallery' },
  { name: 'Industries', path: '/industries' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

// Reusable cart button with badge (used in desktop and mobile)
const CartButtonWithBadge = ({ onClick, cartTotal }) => {
  const displayCount = cartTotal > 99 ? '99+' : cartTotal;
  const showBadge = cartTotal > 0;

  return (
    <button
      onClick={onClick}
      className="relative text-[#0F4C81] hover:text-[#EAB308] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
      aria-label={`Open quote basket, currently ${cartTotal} items`}
    >
      <ShoppingCart className="w-6 h-6" />
      <AnimatePresence>
        {showBadge && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center shadow-lg border-2 border-white"
          >
            {displayCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default function Navbar() {
  const { setCartOpen, cartTotal } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="bg-[#FFFDF7] sticky top-0 z-50 shadow-sm border-b border-slate-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-[88px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/products/TCT LOGO.png"
              alt="The Corp Tees"
              className="h-20 lg:h-32 md:h-28 sm:h-28 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-[#0F4C81] border-b-2 border-[#0F4C81]'
                    : 'text-slate-700 hover:text-[#EAB308]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <CartButtonWithBadge onClick={() => setCartOpen(true)} cartTotal={cartTotal} />
            <CustomButton
              onClick={() => navigate('/request-quote')}
              className="bg-[#0F4C81] hover:bg-[#0d3f6d] text-white px-8 py-3 rounded-md shadow-lg"
            >
              Get Free Quote
            </CustomButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-slate-800"
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Quote Basket Button with Badge */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCartOpen(true);
                }}
                className="flex items-center justify-between w-full py-3 px-4 bg-slate-50 rounded-xl border border-slate-200 text-left"
                aria-label={`Open quote basket, currently ${cartTotal} items`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-[#0F4C81]" />
                  <span className="font-semibold text-slate-800">Quote Basket</span>
                </div>
                {cartTotal > 0 && (
                  <span className="bg-amber-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1">
                    {cartTotal > 99 ? '99+' : cartTotal}
                  </span>
                )}
              </button>
              <CustomButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/request-quote');
                }}
                className="bg-[#0F4C81] text-white w-full py-3"
              >
                Get Free Quote
              </CustomButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}