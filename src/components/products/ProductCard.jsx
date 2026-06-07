import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function ProductCard({ product }) {
  // FIX: Converted to use the safer custom hook instead of accessing the context manually
  const { actions } = useAppState();

  const handleAddToQuote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    actions.addToQuoteCart(product, product.minOrder || 50);
    actions.openDrawer();
  };

  return (
    <div className="group relative bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Structural Image Container Frame with Twin Layout Mapping */}
      <Link to={`/product/${product.id}`} className="relative block w-full aspect-[4/5] overflow-hidden bg-slate-100 shrink-0">
        {/* Optional Badge Element */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-slate-900 text-white rounded">
            {product.badge}
          </span>
        )}

        {/* Primary Image Layer */}
        <img
          src={product.imageSrc}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 group-hover:opacity-0 transition-all duration-700 ease-in-out"
        />

        {/* Secondary Hover Image Revealed */}
        <img
          src={product.hoverImageSrc}
          alt={`${product.name} alternate`}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-102 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out"
        />

        {/* Interactive Action Tray - Sliding Overlay Component */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-slate-950/40 via-transparent to-transparent">
          <button
            onClick={handleAddToQuote}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-900 hover:text-white text-slate-950 font-medium text-xs tracking-wider uppercase py-3 px-4 rounded-lg shadow-xl transition-all duration-200 transform"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Quote
          </button>
        </div>
      </Link>

      {/* Product Specific Metadata Fields */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono mb-1 block">
          {product.subCategory}
        </span>
        
        <Link to={`/product/${product.id}`} className="block flex-grow mb-2">
          <h3 className="font-medium text-sm text-slate-800 hover:text-slate-950 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Key Operational Constraints */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto text-xs">
          <div>
            <span className="text-[10px] font-mono block text-slate-400 uppercase tracking-tight">Est. Price</span>
            <span className="font-semibold text-slate-900 text-sm">₹{product.priceEstimate}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono block text-slate-400 uppercase tracking-tight">MOQ Requirement</span>
            <span className="font-medium text-slate-700">{product.minOrder} Units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
