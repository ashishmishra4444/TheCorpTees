import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ShoppingCart, ChevronLeft, Check, Minus, Plus,
  Ruler, Palette, Printer, Clock, Shield, Truck, AlertCircle,
  FileText, Heart, Share2, ZoomIn
} from 'lucide-react';
import { products } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';
import CustomButton from '../components/shared/CustomButton';
import ProductGrid from '../components/products/ProductGrid';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToQuote } = useAppState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(50);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [addedToQuote, setAddedToQuote] = useState(false);

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/gallery" className="text-amber-600 font-semibold hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(product.minOrder, prev + delta));
  };

  const handleAddToQuote = () => {
    addToQuote(product, quantity);
    setAddedToQuote(true);
    setTimeout(() => setAddedToQuote(false), 3000);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const bulkTiers = [
    { min: product.minOrder, max: 99, discount: 0 },
    { min: 100, max: 249, discount: 5 },
    { min: 250, max: 499, discount: 10 },
    { min: 500, max: 999, discount: 15 },
    { min: 1000, max: Infinity, discount: 20 },
  ];

  const currentTier = bulkTiers.find((t) => quantity >= t.min && quantity <= t.max) || bulkTiers[bulkTiers.length - 1];
  const discountedPrice = product.priceEstimate * (1 - currentTier.discount / 100);
  const totalEstimate = discountedPrice * quantity;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-slate-500 mb-6"
        >
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <Link to="/gallery" className="hover:text-amber-600 transition-colors">Gallery</Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </motion.div>

        {/* Main Product Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image with Zoom */}
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-slate-200 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[selectedImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                  }}
                />
              )}
              <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow-sm">
                <ZoomIn className="w-4 h-4 text-slate-600" />
              </div>
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-lg uppercase">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`
                    shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                    ${selectedImage === idx ? 'border-amber-500' : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Category & Title */}
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
              {product.subCategory}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                  />
                ))}
                <span className="text-sm font-semibold text-slate-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-slate-900">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm text-slate-500">/unit</span>
              {currentTier.discount > 0 && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  {currentTier.discount}% OFF at {quantity}+ units
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                Available Colors <span className="text-slate-400 font-normal">({product.colors.length})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all duration-200
                      ${selectedColor === color ? 'border-slate-900 scale-110 shadow-md' : 'border-slate-200 hover:border-slate-400'}
                    `}
                    style={{ backgroundColor: color }}
                    title={`Color ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Available Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all
                        ${selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Slider */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900">Quantity</p>
                <span className="text-xs text-slate-500">Min: {product.minOrder} units</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(-10)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <div className="flex-1">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                    className="w-full text-center py-2 bg-white border border-slate-200 rounded-lg text-lg font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(10)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Bulk Tier Indicator */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">Bulk Discount Progress</span>
                  <span className="font-semibold text-amber-600">
                    {currentTier.discount > 0 ? `${currentTier.discount}% OFF` : 'No discount yet'}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((quantity / 1000) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  {bulkTiers.map((tier, idx) => (
                    <span key={idx} className={`text-[10px] ${tier.discount <= currentTier.discount ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                      {tier.min}+
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Estimate */}
            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Estimated Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  {formatPrice(totalEstimate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{quantity} units × {formatPrice(discountedPrice)}/unit</span>
                {currentTier.discount > 0 && (
                  <span className="text-emerald-600 font-semibold">
                    You save {formatPrice((product.priceEstimate - discountedPrice) * quantity)}!
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <CustomButton
                size="lg"
                fullWidth
                icon={addedToQuote ? Check : ShoppingCart}
                onClick={handleAddToQuote}
                className={addedToQuote ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
              >
                {addedToQuote ? 'Added to Quote Cart' : 'Add to Quote Basket'}
              </CustomButton>
              <Link to="/request-quote" className="sm:w-auto w-full">
                <CustomButton variant="outline" size="lg" fullWidth icon={FileText}>
                  Request Custom Quote
                </CustomButton>
              </Link>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, label: 'Delivery', value: product.specs.Delivery || '7-10 Days' },
                { icon: Shield, label: 'MOQ', value: `${product.minOrder} Units` },
                { icon: Printer, label: 'Branding', value: product.specs['Branding Methods'] || 'Multiple' },
                { icon: Truck, label: 'Shipping', value: 'Pan India' },
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                  <info.icon className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">{info.label}</p>
                    <p className="text-xs font-semibold text-slate-900">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specifications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">Technical Specifications</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 w-1/3">{key}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">You May Also Like</h2>
          <ProductGrid showFilters={false} limit={5} />
        </div>
      </div>
    </div>
  );
}
