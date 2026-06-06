import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Minus, Plus, Trash2, ShoppingCart, ArrowRight, Package,
  AlertCircle, FileText
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import CustomButton from '../shared/CustomButton';

export default function QuoteCartDrawer() {
  const {
    quoteCart,
    isCartOpen,
    setCartOpen,
    removeFromQuote,
    updateQuantity,
    clearQuote,
    cartValue,
  } = useAppState();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const estimatedTotal = quoteCart.reduce((sum, item) => {
    return sum + (item.priceEstimate * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Quote Cart</h2>
                  <p className="text-xs text-slate-500">
                    {quoteCart.length} item{quoteCart.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {quoteCart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full px-8 text-center"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Your quote cart is empty
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Browse our products and add items to request a bulk quotation.
                  </p>
                  <CustomButton onClick={() => setCartOpen(false)}>
                    Continue Browsing
                  </CustomButton>
                </motion.div>
              ) : (
                <div className="p-4 space-y-3">
                  {quoteCart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">
                              {item.subCategory}
                            </p>
                            <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                              {item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromQuote(item.id)}
                            className="p-1 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                if (item.quantity > item.minOrder) {
                                  updateQuantity(item.id, Math.max(item.minOrder, item.quantity - 10));
                                }
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            <div className="w-14 text-center">
                              <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                              <span className="text-[10px] text-slate-400 block">units</span>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 10)}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">
                              {formatPrice(item.priceEstimate * item.quantity)}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {formatPrice(item.priceEstimate)}/unit
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear All */}
                  <button
                    onClick={clearQuote}
                    className="w-full py-2 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear All Items
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {quoteCart.length > 0 && (
              <div className="border-t border-slate-200 p-4 bg-slate-50">
                {/* Estimate Notice */}
                <div className="flex items-start gap-2 mb-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    Prices are estimates. Final quotation will be provided after reviewing your requirements.
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Subtotal ({quoteCart.length} items)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(estimatedTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Estimated GST (18%)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(estimatedTotal * 0.18)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Estimated Total</span>
                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(estimatedTotal * 1.18)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link to="/request-quote" onClick={() => setCartOpen(false)}>
                    <CustomButton fullWidth icon={FileText} iconPosition="right">
                      Proceed to Request Quote
                    </CustomButton>
                  </Link>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
