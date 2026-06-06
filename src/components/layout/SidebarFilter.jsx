import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X, RotateCcw } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { categories, materials, priceRanges, moqOptions } from '../../data/mockData';

function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-1 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SidebarFilter({ isMobileOpen, onMobileClose }) {
  const { filters, setFilters, activeCategory, setCategory } = useAppState();
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedMoq, setSelectedMoq] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handlePriceChange = (range) => {
    setSelectedPriceRange(range);
    setFilters({
      priceRange: range ? [range.min, range.max] : [0, 50000],
    });
  };

  const handleMoqChange = (moq) => {
    setSelectedMoq(moq);
    setFilters({
      minOrder: moq ? moq.value : 0,
    });
  };

  const handleMaterialToggle = (material) => {
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updated);
    setFilters({ material: updated });
  };

  const handleReset = () => {
    setSelectedPriceRange(null);
    setSelectedMoq(null);
    setSelectedMaterials([]);
    setCategory('all');
    setFilters({
      priceRange: [0, 50000],
      minOrder: 0,
      material: [],
      productType: [],
    });
  };

  const activeFiltersCount = [
    selectedPriceRange,
    selectedMoq,
    selectedMaterials.length > 0,
    activeCategory !== 'all',
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-900">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection title="Category">
        <div className="space-y-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`
                flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors
                ${activeCategory === cat.id ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50 text-slate-700'}
              `}
            >
              <div
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${activeCategory === cat.id ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}
                `}
              >
                {activeCategory === cat.id && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="radio"
                name="category"
                checked={activeCategory === cat.id}
                onChange={() => setCategory(cat.id)}
                className="hidden"
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className={`
                flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors
                ${selectedPriceRange?.label === range.label ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50 text-slate-700'}
              `}
            >
              <div
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${selectedPriceRange?.label === range.label ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}
                `}
              >
                {selectedPriceRange?.label === range.label && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange?.label === range.label}
                onChange={() => handlePriceChange(range)}
                className="hidden"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* MOQ Filter */}
      <FilterSection title="Minimum Order Quantity">
        <div className="space-y-1">
          {moqOptions.map((moq) => (
            <label
              key={moq.label}
              className={`
                flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors
                ${selectedMoq?.label === moq.label ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50 text-slate-700'}
              `}
            >
              <div
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${selectedMoq?.label === moq.label ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}
                `}
              >
                {selectedMoq?.label === moq.label && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="radio"
                name="moq"
                checked={selectedMoq?.label === moq.label}
                onChange={() => handleMoqChange(moq)}
                className="hidden"
              />
              <span className="text-sm">{moq.label} units</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Material Filter */}
      <FilterSection title="Material">
        <div className="space-y-1">
          {materials.map((material) => (
            <label
              key={material}
              className={`
                flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors
                ${selectedMaterials.includes(material) ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50 text-slate-700'}
              `}
            >
              <div
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${selectedMaterials.includes(material) ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}
                `}
              >
                {selectedMaterials.includes(material) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => handleMaterialToggle(material)}
                className="hidden"
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          {filterContent}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button
                  onClick={onMobileClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {filterContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
