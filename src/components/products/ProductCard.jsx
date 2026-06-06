import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function ProductCard({ product, index }) {
  const { addToQuote } = useAppState();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [addedToQuote, setAddedToQuote] = useState(false);

  const handleAddToQuote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToQuote(product, product.minOrder);
    setAddedToQuote(true);
    setTimeout(() => setAddedToQuote(false), 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2">
              <span className={`
                px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider
                ${product.badge === 'Premium' ? 'bg-purple-600 text-white' :
                  product.badge === 'Best Seller' ? 'bg-amber-500 text-slate-900' :
                  product.badge === 'Trending' ? 'bg-rose-500 text-white' :
                  product.badge === 'Hot' ? 'bg-orange-500 text-white' :
                  product.badge === 'New' ? 'bg-emerald-500 text-white' :
                  product.badge === 'Festive' ? 'bg-red-600 text-white' :
                  'bg-slate-800 text-white'}
              `}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Quick Action Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3"
          >
            <motion.button
              onClick={handleAddToQuote}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors
                ${addedToQuote
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-slate-900 hover:bg-amber-500 hover:text-slate-900'
                }
              `}
            >
              {addedToQuote ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Quote
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Request Quote
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Category Tag */}
          <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1 truncate">
            {product.subCategory}
          </p>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1.5 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
            </div>
            <span className="text-[10px] text-slate-400">({product.reviews} reviews)</span>
          </div>

          {/* Price & MOQ */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(product.priceEstimate)}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">/unit</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Min: {product.minOrder}
            </span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 5).map((color, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`
                  w-5 h-5 rounded-full border-2 transition-all duration-200
                  ${selectedColor === color ? 'border-slate-900 scale-110' : 'border-slate-200 hover:border-slate-400'}
                `}
                style={{ backgroundColor: color }}
                title={`Color option ${idx + 1}`}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-slate-400 ml-0.5">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
