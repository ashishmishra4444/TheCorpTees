import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, Menu, X, Phone, Mail, MapPin, ChevronDown,
  Shirt, Gift, Package, GraduationCap, Flag
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { categories, subCategories } from '../../data/mockData';
import CustomButton from '../shared/CustomButton';

const ANNOUNCEMENTS = [
  'Free shipping on orders above Rs. 25,000 | Bulk discounts up to 40%',
  'Trusted by 500+ corporates across India | ISO 9001:2015 Certified',
  'Express delivery available for urgent orders | 24-48 hour turnaround',
  'Custom branding included on all orders above 100 units',
];

const categoryIcons = {
  'corporate-apparel': Shirt,
  'employee-kits': Gift,
  'corporate-gifting': Package,
  'school-college': GraduationCap,
  'event-merchandise': Flag,
};

export default function Navbar() {
  const {
    cartTotal,
    activeCategory,
    setCategory,
    searchQuery,
    setSearch,
    isMobileMenuOpen,
    toggleMobileMenu,
    setCartOpen,
  } = useAppState();

  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const searchRef = useRef(null);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearch(searchInput.trim());
      navigate('/gallery');
      setSearchFocused(false);
    }
  };

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    navigate('/gallery');
    setActiveDropdown(null);
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const handleMouseEnter = (catId) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs overflow-hidden w-full">
        <motion.div
          key={announcementIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 px-6 text-center"
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            {ANNOUNCEMENTS[announcementIndex]}
          </span>
        </motion.div>
      </div>

      {/* Contact Mini-Bar - Fluid Widescreen Spacing */}
      <div className="bg-slate-100 border-b border-slate-200 w-full">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between py-1.5 text-xs text-slate-600">
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +91-XXX-XXX-XXXX
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                info@thecorptees.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Indore, Madhya Pradesh, India
              </span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="hidden sm:inline">ISO 9001:2015 Certified</span>
              <span className="text-amber-600 font-semibold">Free Quote in 24 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Full Bleed Breakout Container */}
      <motion.header
        className={`
          sticky top-0 z-50 transition-all duration-300 w-full
          ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}
        `}
      >
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center">
                <Shirt className="w-5 h-5 text-amber-400" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  The Corp Tees
                </h1>
                <p className="text-[10px] text-slate-500 -mt-0.5 tracking-wide uppercase">
                  Premium Corporate Merchandise
                </p>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full">
                <div
                  className={`
                    relative flex items-center border-2 rounded-xl transition-all duration-200
                    ${searchFocused ? 'border-amber-500 bg-white shadow-md' : 'border-slate-200 bg-slate-50'}
                  `}
                >
                  <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    placeholder="Search products, categories, industries..."
                    className="w-full py-2.5 px-3 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mr-1 px-3 py-1.5 bg-amber-500 text-slate-900 text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Search
                  </button>
                </div>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {searchFocused && searchInput.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                    >
                      <div className="p-3">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Quick Suggestions
                        </p>
                        {categories
                          .filter(c => c.id !== 'all' && c.label.toLowerCase().includes(searchInput.toLowerCase()))
                          .map((cat) => (
                            <div
                              key={cat.id}
                              onClick={() => handleCategoryClick(cat.id)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                            >
                              <Search className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-sm text-slate-700">{cat.label}</span>
                            </div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quote Cart */}
              <motion.button
                onClick={() => setCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartTotal > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartTotal > 99 ? '99+' : cartTotal}
                  </motion.span>
                )}
              </motion.button>

              {/* Get Quote CTA */}
              <div className="hidden sm:block">
                <CustomButton
                  size="sm"
                  onClick={() => navigate('/request-quote')}
                  className="whitespace-nowrap"
                >
                  Get a Free Quote
                </CustomButton>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Category Nav - Fluid Bounds */}
        <div className="hidden lg:block border-t border-slate-100 w-full">
          <div className="w-full px-6 md:px-12 lg:px-16">
            <div className="flex items-center gap-1 py-2">
              <button
                onClick={() => handleCategoryClick('all')}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                  ${activeCategory === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}
                `}
              >
                All Products
              </button>
              {categories.filter(c => c.id !== 'all').map((cat) => {
                const Icon = categoryIcons[cat.id] || Package;
                return (
                  <div
                    key={cat.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(cat.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                        ${activeCategory === cat.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}
                      `}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === cat.id ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === cat.id && subCategories[cat.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                        >
                          <div className="p-3">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                              {cat.label}
                            </p>
                            {subCategories[cat.id].map((sub, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setCategory(cat.id);
                                  navigate('/gallery');
                                  setActiveDropdown(null);
                                }}
                                className="px-3 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg cursor-pointer transition-colors"
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                          <div className="px-3 pb-3">
                            <button
                              onClick={() => handleCategoryClick(cat.id)}
                              className="w-full py-2 text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 rounded-lg transition-colors"
                            >
                              View All {cat.label}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu} />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">Menu</span>
                <button onClick={toggleMobileMenu} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-slate-200">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50">
                    <Search className="w-4 h-4 text-slate-400 ml-3" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search products..."
                      className="w-full py-2.5 px-3 bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Categories */}
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Categories
                </p>
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.id] || Package;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors mb-1
                        ${activeCategory === cat.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Pages Links */}
              <div className="p-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Pages
                </p>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Product Gallery', path: '/gallery' },
                  { label: 'Industries', path: '/industries' },
                  { label: 'Request Quote', path: '/request-quote' },
                  { label: 'Contact', path: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-slate-200">
                <CustomButton
                  fullWidth
                  onClick={() => { navigate('/request-quote'); toggleMobileMenu(); }}
                >
                  Get a Free Quote
                </CustomButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
