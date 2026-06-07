import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { products } from '../../data/mockData';
import ProductCard from './ProductCard';

export default function ProductGrid({ showFilters = true, limit, title = 'Products' }) {
  const { activeCategory, searchQuery, filters, setCategory } = useAppState();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

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

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.priceEstimate >= min && p.priceEstimate <= max);
    }

    if (filters.minOrder > 0) {
      result = result.filter((p) => p.minOrder <= filters.minOrder);
    }

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
    'employee-kits': 'Employee Onboarding Kits',
    'corporate-gifting': 'Corporate Gifting',
    'school-college': 'School & College',
    'event-merchandise': 'Event Merchandise',
  };

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {searchQuery ? `Search Results: "${searchQuery}"` : categoryLabels[activeCategory] || title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredProducts.length} unique blueprint{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-sans">Sort Matrix:</span>
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-slate-900 font-medium cursor-pointer">
              <option>Standard Order Matrix</option>
              <option>Price: Scale Low to High</option>
              <option>Price: Scale High to Low</option>
              <option>MOQ Requirement: Minimum First</option>
            </select>
          </div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        /* Expanded widescreen grid configurations with zero dead space */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white border border-slate-200/60 rounded-xl"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No Matched Variants</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
            Your customized search filters yielded zero results. Refine your metrics or reset to restore the catalogs.
          </p>
          <button
            onClick={() => setCategory('all')}
            className="mt-4 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:bg-slate-800 shadow-md"
          >
            Clear Search Filter
          </button>
        </motion.div>
      )}
    </div>
  );
}
