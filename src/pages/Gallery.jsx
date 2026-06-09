import { useContext, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarFilter from "../components/layout/SidebarFilter";
import ProductCard from "../components/products/ProductCard";
import { AppStateContext } from "../context/AppStateContext";
import { Grid, SlidersHorizontal } from "lucide-react";

export default function Gallery() {
  const { filteredProducts, setCategory, resetFilters, activeCategory } =
    useContext(AppStateContext);
  const [searchParams] = useSearchParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    // If a category is in the URL, set it; otherwise, default to 'all'
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory("all");
    }
  }, [categoryParam, setCategory]);

  return (
    <div className="w-full flex-grow bg-slate-50 flex flex-col">
      {/* Sub-Header Bar Fluid */}
      <div className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">
            Catalog Storefront / {filteredProducts.length} Systems Found
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline font-sans">
            Showing synchronized real-time pricing tiers
          </span>
        </div>
      </div>

      {/* Main Structural Matrix Breakout Layout */}
      <div className="w-full flex flex-1 items-stretch">
        {/* Left Frame Border Sidebar */}
        <aside className="w-72 hidden lg:block border-r border-slate-200 bg-white shrink-0">
          <div className="sticky top-16 h-[calc(100vh-8rem)] overflow-y-auto p-6">
            <SidebarFilter />
          </div>
        </aside>

        {/* High-Density Grid Wrapper Viewport Panel */}
        <main className="flex-1 px-4 sm:px-6 py-8">
          {filteredProducts.length === 0 ? (
            <div className="w-full h-96 flex flex-col items-center justify-center text-center bg-white border border-dashed border-slate-300 rounded-2xl p-8">
              <SlidersHorizontal className="w-10 h-10 text-slate-300 mb-3" />
              <h3 className="text-lg font-medium text-slate-800 mb-1">
                No Variants Matches
              </h3>
              <p className="text-sm text-slate-400 max-w-sm">
                Refine your custom search parameters or reset your categories
                toolbar to show all.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs tracking-wider uppercase font-medium transition-colors"
              >
                Reset Storefront
              </button>
            </div>
          ) : (
            /* High Density 5 Column Window Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
