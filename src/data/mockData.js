import { MessageSquare, Palette, FileCheck, ShieldCheck, Truck } from 'lucide-react';

export const products = [
  {
    id: "p001",
    name: "Premium Corporate Polo T-Shirt",
    category: "corporate-apparel",
    subCategory: "Corporate Polo T-Shirts",
    priceEstimate: 450,
    minOrder: 50,
    rating: 4.8,
    reviews: 124,
    imageSrc: "/products/polo-1.png",
    hoverImageSrc: "/products/polo-2.png",
    colors: ['#1e3a5f', '#ffffff', '#2d2d2d', '#c41e3a', '#1a472a'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    material: '100% Premium Cotton, 220 GSM',
    description: 'Elevate your corporate identity with our premium polo t-shirts. Features moisture-wicking fabric, reinforced collar, and precision embroidery-ready surface.',
    badge: 'Best Seller',
    specs: {
      "Fabric Weight": "220 GSM",
      "Blend": "100% Super-Combed Cotton",
      "Features": "Anti-pilling, Fade-resistant dyes",
      "Customization": "High-density embroidery or screen print"
    }
  },
  {
    id: "p002",
    name: "Executive Onboarding Welcome Kit",
    category: "employee-kits",
    subCategory: "Welcome Kits",
    priceEstimate: 1250,
    minOrder: 20,
    rating: 4.9,
    reviews: 86,
    imageSrc: "/products/welcomekit-1.png",
    hoverImageSrc: "/products/welcomekit-2.png",
    colors: ['#000000', '#1e3a5f', '#2e1065'],
    sizes: ['Standard Box'],
    material: 'Premium Rigid Board Matte Finished Box',
    description: 'The ultimate welcome package for onboarding premium talent. Includes matte-finish journal, metal executive pen, premium double-walled flask, and corporate lanyard.',
    badge: 'Trending',
    specs: {
      "Box Style": "Magnetic Closure Rigid Box",
      "Contents": "Notebook, Metal Pen, Smart Bottle, Lanyard",
      "Lead Time": "7-10 Business Days",
      "Customization": "Individual name engraving available"
    }
  },
  {
    id: "p003",
    name: "Smart Temperature Control Bottle",
    category: "corporate-gifting",
    subCategory: "Premium Drinkware",
    priceEstimate: 650,
    minOrder: 100,
    rating: 4.7,
    reviews: 92,
    imageSrc: "/products/smartbottle-1.png",
    hoverImageSrc: "/products/smartbottle-2.png",
    colors: ['#2d2d2d', '#ffffff', '#0284c7', '#16a34a'],
    sizes: ['500ml'],
    material: '304 Food-Grade Stainless Steel',
    description: 'Vacuum insulated flask featuring an active LED touch display indicating real-time beverage temperature. Keeps liquids crisp or piping hot up to 24 hours.',
    badge: 'Eco Friendly',
    specs: {
      "Insulation": "Double-wall vacuum jacketed",
      "Battery Life": "Up to 2 years (non-rechargeable lid)",
      "Capacities": "500ml standard",
      "Branding Area": "360-degree laser marking or UV print"
    }
  },
  {
    id: "p004",
    name: "Premium Varsity Unisex Jacket",
    category: "school-college",
    subCategory: "College Hoodies & Jackets",
    priceEstimate: 950,
    minOrder: 30,
    rating: 4.9,
    reviews: 210,
    imageSrc: "/products/jacket-1.png",
    hoverImageSrc: "/products/jacket-2.png",
    colors: ['#c41e3a', '#1e3a5f', '#111827'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    material: 'Premium Fleece with Faux Leather Sleeves',
    description: 'Imbue institutional pride with heavy-duty varsity jackets. Accented with contrast snap closures, striped ribbed trims, and dense chenille patch capabilities.',
    badge: 'Premium Edition',
    specs: {
      "Body Fabric": "320 GSM Heavyweight Fleece",
      "Sleeve Fabric": "Soft Polyurethane Faux Leather",
      "Pockets": "Dual front welt pockets, internal media pocket",
      "Stitching": "Reinforced twin-needle overall"
    }
  },
  {
    id: "p005",
    name: "Tech Summit Tech Organizer Case",
    category: "event-merchandise",
    subCategory: "Event Essentials",
    priceEstimate: 380,
    minOrder: 100,
    rating: 4.6,
    reviews: 54,
    imageSrc: "/products/tech-1.png",
    hoverImageSrc: "/products/tech-2.png",
    colors: ['#4b5563', '#1f2937'],
    sizes: ['Compact Travel'],
    material: 'Water-resistant Ballistic Nylon',
    description: 'Streamline tech setups for international event delegates. Fits chargers, cables, SD cards, and power banks cleanly behind optimized elastic loops and mesh partitions.',
    badge: 'New Launch',
    specs: {
      "External Protection": "EVA Shockproof Shell",
      "Zippers": "YKK Weatherproof reversed track",
      "Dimensions": "24cm x 17cm x 5cm",
      "Logo Treatment": "Rubberized debossed badge or silk screen"
    }
  }
];

export const categories = [
  { id: 'corporate-apparel', name: 'Corporate Apparel', label: 'Corporate Apparel', count: 18, image: '/products/polo-1.png' },
  { id: 'employee-kits', name: 'Employee Onboarding Kits', label: 'Employee Onboarding Kits', count: 12, image: '/products/welcomekit-1.png' },
  { id: 'corporate-gifting', name: 'Corporate Gifting', label: 'Corporate Gifting', count: 24, image: '/products/smartbottle-1.png' },
  { id: 'school-college', name: 'School & College', label: 'School & College', count: 15, image: '/products/jacket-1.png' },
  { id: 'event-merchandise', name: 'Event Merchandise', label: 'Event Merchandise', count: 9, image: '/products/tech-1.png' }
];

export const subCategories = {
  'corporate-apparel': ['Corporate Polo T-Shirts', 'Custom Shirts', 'Blazers & Vests', 'Caps & Hats'],
  'employee-kits': ['Welcome Kits', 'Premium Joiner Boxes', 'Festive Hampers'],
  'corporate-gifting': ['Premium Drinkware', 'Tech Accessories', 'Notebooks & Diaries', 'Leather Goods'],
  'school-college': ['College Hoodies & Jackets', 'Custom Uniforms', 'Festival Tees'],
  'event-merchandise': ['Event Essentials', 'Lanyards & Badges', 'Banner Assets']
};

export const materials = [
  '100% Premium Cotton, 220 GSM',
  'Premium Rigid Board Matte Finished Box',
  '304 Food-Grade Stainless Steel',
  'Premium Fleece with Faux Leather Sleeves',
  'Water-resistant Ballistic Nylon'
];

export const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: 'Above ₹1000', min: 1000, max: 50000 }
];

export const moqOptions = [
  { label: 'Less than 30 units', value: 30 },
  { label: '30 - 50 units', value: 50 },
  { label: '50+ units', value: 100 }
];

export const processSteps = [
  { step: 1, title: 'Share Requirements', description: 'Tell us about quantities, timelines, products, and brand guidelines.', icon: MessageSquare },
  { step: 2, title: 'Design Alignment', description: 'Our team maps artwork, placement, finishes, and packaging options.', icon: Palette },
  { step: 3, title: 'Sample Approval', description: 'Review a digital proof or production sample before bulk execution.', icon: FileCheck },
  { step: 4, title: 'Bulk Production', description: 'Approved products move through quality-controlled manufacturing.', icon: ShieldCheck },
  { step: 5, title: 'Pan-India Delivery', description: 'Orders are packed securely and dispatched to your preferred locations.', icon: Truck }
];

export const testimonials = [
  {
    name: 'Ananya Mehta',
    role: 'HR Director',
    company: 'Nexora Labs',
    rating: 5,
    text: 'Their onboarding kits felt premium, arrived on schedule, and made our new-hire experience feel genuinely polished.'
  },
  {
    name: 'Rahul Sinha',
    role: 'Procurement Lead',
    company: 'BrightWorks',
    rating: 5,
    text: 'The Corp Tees handled a complex multi-city event order with clear communication and consistent product quality.'
  },
  {
    name: 'Priya Nair',
    role: 'Brand Manager',
    company: 'EduSpark Group',
    rating: 4,
    text: 'The uniforms and fest merchandise matched our colors closely and held up well after repeated use.'
  },
  {
    name: 'Karan Malhotra',
    role: 'Founder',
    company: 'ScaleMint',
    rating: 5,
    text: 'Fast sampling, practical suggestions, and a final swag box our team was excited to share.'
  }
];

export const industries = [
  { id: 'corporate', name: 'Corporate Enterprises', description: 'Premium apparel, onboarding kits, and executive gifting for established teams.' },
  { id: 'startups', name: 'Startups', description: 'Agile branded merchandise programs for fast-growing teams and launch campaigns.' },
  { id: 'education', name: 'Education', description: 'Uniforms, fest merchandise, jerseys, and student kits for schools and colleges.' },
  { id: 'healthcare', name: 'Healthcare', description: 'Professional uniforms, staff kits, and durable essentials for care environments.' },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Safety wear, worker uniforms, and practical engagement kits for industrial teams.' },
  { id: 'hospitality', name: 'Hospitality', description: 'Polished staff uniforms, aprons, welcome kits, and guest-facing branded goods.' },
  { id: 'events', name: 'Events & Conferences', description: 'Lanyards, tees, caps, bags, and delegate kits built for smooth event execution.' },
  { id: 'government', name: 'Government & Institutions', description: 'Reliable official merchandise and uniform programs for public-sector needs.' }
];
