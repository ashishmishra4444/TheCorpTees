import { useState, useMemo, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, ShoppingCart, ChevronLeft, Check, Minus, Plus,
  Printer, Clock, Shield, Truck, FileText, ZoomIn,
  Package, Scissors, Zap, Mail, Users, Award,
  Headphones, Building, Calendar, BarChart, ChevronRight
} from "lucide-react";
import { products } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import CustomButton from "../components/shared/CustomButton";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getCurrentTier = (tiers, qty) =>
  [...tiers].reverse().find((t) => qty >= t.minQty) || tiers[0];

export default function ProductDetails() {
  const { id } = useParams();
  const { addToQuote } = useAppState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // changed from product.minOrder
  const [addedToQuote, setAddedToQuote] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef(null);

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <Link to="/gallery" className="text-amber-600 font-semibold hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = useMemo(() => {
    return [product.imageSrc, product.hoverImageSrc].filter(Boolean);
  }, [product]);

  const currentTier = getCurrentTier(product.bulkDiscountTiers, quantity);
  const discountedPrice = product.priceEstimate * (1 - currentTier.discountPercent / 100);
  const totalEstimate = discountedPrice * quantity;
  const savings = (product.priceEstimate - discountedPrice) * quantity;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta)); // min 1
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

  const iconMap = {
    Printer: <Printer className="w-5 h-5" />,
    Scissors: <Scissors className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Package: <Package className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
  };

  const [showStickyCTA, setShowStickyCTA] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-4 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <Link to="/gallery" className="hover:text-amber-600">Gallery</Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Left - Image Gallery */}
          <div>
            <div
              ref={mainImageRef}
              className="relative h-[520px] rounded-2xl bg-white border border-slate-200 overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={productImages[selectedImage] || product.imageSrc}
                alt={product.name}
                className="w-full h-full object-contain bg-slate-50"
              />
              {isZoomed && productImages[selectedImage] && (
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url(${productImages[selectedImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                  }}
                />
              )}
              <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow-sm">
                <ZoomIn className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-amber-500" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
              {product.subCategory}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {product.name}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-4">{product.shortSummary}</p>

            {/* Rating, Reviews, Orders, Tags */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-slate-900 ml-1">
                  {product.rating}
                </span>
                <span className="text-sm text-slate-500">({product.reviewCount} Reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{product.ordersDelivered}+ Orders Delivered</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.industryTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">{formatPrice(product.priceEstimate)}</span>
                <span className="text-slate-500">/ unit</span>
                <span className="ml-2 text-sm text-slate-500">Starting Price</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Minimum Order: 1 Unit</p> {/* changed */}
              <div className="border-t border-slate-200 pt-3">
                <p className="text-sm font-semibold text-slate-900 mb-2">Bulk Savings</p>
                <div className="flex flex-wrap gap-3">
                  {product.bulkDiscountTiers.slice(1).map((tier) => (
                    <div key={tier.minQty} className="bg-white px-3 py-1 rounded-lg shadow-sm">
                      <span className="font-bold text-amber-600">{tier.minQty}+</span>
                      <span className="text-xs text-slate-500 ml-1">= {tier.discountPercent}% OFF</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Key Product Highlights</h3>
              <ul className="space-y-2">
                {product.highlights.map((point, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customization Options */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Branding & Customization</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.customizationOptions.map((opt) => (
                  <div key={opt.name} className="flex items-center gap-2 text-sm text-slate-700">
                    {iconMap[opt.icon] || <Printer className="w-4 h-4" />}
                    <span>{opt.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Procurement Card */}
        <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl p-6 mb-12 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-500" /> Delivery & Procurement
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase">Lead Time</p>
              <p className="font-semibold text-slate-900">{product.delivery.leadTime}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Minimum Order</p> {/* changed from MOQ */}
              <p className="font-semibold text-slate-900">{product.delivery.moq}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Production Capacity</p>
              <p className="font-semibold text-slate-900">{product.delivery.productionCapacity}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Dispatch</p>
              <p className="font-semibold text-slate-900">{product.delivery.dispatch}</p>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">What's Included In This Kit</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {product.whatsIncluded.map((item) => (
              <div key={item} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <Package className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                <span className="text-xs text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity & Price Calculator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-12 shadow-md">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quantity & Price Calculator</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label> {/* removed "Min X" */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-10)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-amber-500"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-32 text-center py-2 border border-slate-200 rounded-lg text-lg font-bold"
                />
                <button
                  onClick={() => handleQuantityChange(10)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-amber-500"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Bulk Discount</span>
                  <span className="font-semibold text-amber-600">
                    {currentTier.discountPercent > 0 ? `${currentTier.discountPercent}% OFF` : "No discount yet"}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((quantity / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Unit Price</span>
                <span className="text-xl font-bold text-slate-900">{formatPrice(discountedPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Bulk Discount Applied</span>
                <span className="text-emerald-600 font-semibold">{currentTier.discountPercent}%</span>
              </div>
              <div className="flex justify-between items-center border-t border-amber-200 pt-2 mt-1">
                <span className="font-semibold text-slate-900">Estimated Total</span>
                <span className="text-2xl font-bold text-slate-900">{formatPrice(totalEstimate)}</span>
              </div>
              {savings > 0 && (
                <p className="text-xs text-emerald-600 mt-2 text-right">You save {formatPrice(savings)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {[
            { icon: Award, label: "GST Compliant" },
            { icon: Headphones, label: "Dedicated Account Manager" },
            { icon: Shield, label: "Quality Assured" },
            { icon: Package, label: "Secure Packaging" },
            { icon: Truck, label: "Pan India Logistics" },
            { icon: FileText, label: "Corporate Invoice Available" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
              <item.icon className="w-6 h-6 text-amber-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-slate-200 flex flex-wrap gap-4">
            {["overview", "specifications", "customization", "shipping", "faq"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 text-sm font-medium capitalize cursor-pointer transition-colors ${
                  activeTab === tab
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pt-6">
            {activeTab === "overview" && (
              <div className="prose max-w-none">
                <p>{product.shortSummary}</p>
                <ul className="mt-2 space-y-1">
                  {product.highlights.map((h) => (
                    <li key={h}>{h.replace("✓ ", "")}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "specifications" && (
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="border-b border-slate-100">
                      <td className="py-2 font-semibold text-slate-600 w-1/3">{key}</td>
                      <td className="py-2 text-slate-900">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "customization" && (
              <div className="grid md:grid-cols-2 gap-4">
                {product.customizationOptions.map((opt) => (
                  <div key={opt.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    {iconMap[opt.icon] || <Printer className="w-5 h-5" />}
                    <span>{opt.name}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-2">
                <p><strong>Lead Time:</strong> {product.delivery.leadTime}</p>
                <p><strong>Dispatch:</strong> {product.delivery.dispatch}</p>
                <p><strong>Bulk Order Capacity:</strong> {product.delivery.productionCapacity}</p>
                <p><strong>Secure Packaging & Tracking:</strong> Available for all orders</p>
              </div>
            )}
            {activeTab === "faq" && (
              <div className="space-y-4">
                {product.faq.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-slate-900">{item.question}</h4>
                    <p className="text-slate-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Ordered Together</h3>
          <div className="relative">
            <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x">
              {products.filter(p => p.id !== product.id).slice(0, 8).map((rel) => (
                <Link to={`/product/${rel.id}`} key={rel.id} className="snap-start w-48 shrink-0 bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition">
                  <img src={rel.imageSrc} alt={rel.name} className="h-32 w-full object-contain mb-2" />
                  <p className="font-semibold text-sm">{rel.name}</p>
                  <p className="text-amber-600 text-xs">{formatPrice(rel.priceEstimate)}/unit</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 py-3 px-6 md:px-10"
          >
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-bold text-slate-900">{formatPrice(discountedPrice)}/unit</span>
                <span className="text-slate-500">Minimum Order: 1 Unit</span> {/* changed */}
                <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" /> Response within 2 hours
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-500">
                  <Building className="w-3 h-3" /> Trusted by 500+ companies
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <CustomButton
                  icon={addedToQuote ? Check : ShoppingCart}
                  onClick={handleAddToQuote}
                  className={addedToQuote ? "bg-emerald-500" : ""}
                >
                  {addedToQuote ? "Added to Quote" : "Add To Quote Basket"}
                </CustomButton>
                <Link to="/request-quote">
                  <CustomButton variant="outline" icon={FileText}>
                    Request Custom Quote
                  </CustomButton>
                </Link>
                <CustomButton variant="ghost" icon={Headphones}>
                  Talk To Expert
                </CustomButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}