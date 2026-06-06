import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { products } from '../../data/mockData';
import ProductCard from './ProductCard';

export default function ProductGrid({ showFilters = true, limit, title = 'Products' }) {
  const { activeCategory, searchQuery, filters, setCategory } = useAppState();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.priceEstimate >= min && p.priceEstimate <= max);
    }

    // MOQ filter
    if (filters.minOrder > 0) {
      if (filters.minOrder === 201) {
        result = result.filter((p) => p.minOrder >= 200);
      } else {
        result = result.filter((p) => p.minOrder <= filters.minOrder);
      }
    }

    // Material filter
    if (filters.material && filters.material.length > 0) {
      result = result.filter((p) =>
        filters.material.some((m) => p.material.toLowerCase().includes(m.toLowerCase()))
      );
    }

    return limit ? result.slice(0, limit) : result;
  }, [activeCategory, searchQuery, filters, limit]);

  const categoryLabels = {
    'all': 'All Products',
    'corporate-apparel': 'Corporate Apparel',
    'employee-kits': 'Employee Kits',
    'corporate-gifting': 'Corporate Gifting',
    'school-college': 'School & College',
    'event-merchandise': 'Event Merchandise',
  };

  return (
    <div>
      {/* Grid Header */}
      {showFilters && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {searchQuery ? `Search: "${searchQuery}"` : categoryLabels[activeCategory] || title}
            </h2>
            <p className="text-sm text-slate-500">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-amber-500">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Min Order: Low to High</option>
            </select>
          </div>
        </div>
      )}

      {/* Product Grid - Meesho Style Dense Layout */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-sm text-slate-500 mb-4">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
          <button
            onClick={() => setCategory('all')}
            className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            View all products
          </button>
        </motion.div>
      )}
    </div>
  );
}
