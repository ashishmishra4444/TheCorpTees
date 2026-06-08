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

export default function Navbar() {
  const { setCartOpen } = useAppState();
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
          
          {/* Logo - Size increased as requested */}
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
                  location.pathname === item.path ? 'text-[#0F4C81] border-b-2 border-[#0F4C81]' : 'text-slate-700 hover:text-[#EAB308]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setCartOpen(true)} className="text-[#0F4C81] hover:text-[#EAB308] transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <CustomButton onClick={() => navigate('/request-quote')} className="bg-[#0F4C81] hover:bg-[#0d3f6d] text-white px-8 py-3 rounded-md shadow-lg">
              Get Free Quote
            </CustomButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-800">
                  {item.name}
                </Link>
              ))}
              <CustomButton onClick={() => { setIsMobileMenuOpen(false); navigate('/request-quote'); }} className="bg-[#0F4C81] text-white w-full py-3">
                Get Free Quote
              </CustomButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}