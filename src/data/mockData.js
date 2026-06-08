import {
  MessageSquare,
  Palette,
  FileCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const products = [
  // --- Corporate Apparel ---
  {
    id: "p001",
    name: "Premium Corporate Polo",
    category: "corporate-apparel",
    subCategory: "Corporate Polo T-Shirts",
    priceEstimate: 450,
    minOrder: 50,
    imageSrc: "/products/polo-1.png",
    hoverImageSrc: "/products/polo-2.png",
    material: "100% Premium Cotton",
  },
  {
    id: "p002",
    name: "Executive Crew Neck",
    category: "corporate-apparel",
    subCategory: "Premium Crew Neck T-Shirts",
    priceEstimate: 350,
    minOrder: 50,
    imageSrc: "/products/crewneck-1.png",
    hoverImageSrc: "/products/crewneck-2.png",
    material: "100% Cotton",
  },
  {
    id: "p003",
    name: "Formal Executive Shirt",
    category: "corporate-apparel",
    subCategory: "Formal Shirts",
    priceEstimate: 850,
    minOrder: 20,
    imageSrc: "/products/formal-1.png",
    hoverImageSrc: "/products/formal-2.png",
    material: "Poly-Cotton Blend",
  },
  {
    id: "p004",
    name: "Corporate Hoodie",
    category: "corporate-apparel",
    subCategory: "Hoodies",
    priceEstimate: 750,
    minOrder: 30,
    imageSrc: "/products/hoodie-1.png",
    hoverImageSrc: "/products/hoodie-2.png",
    material: "Fleece",
  },
  {
    id: "p005",
    name: "Safety Wear Jacket",
    category: "corporate-apparel",
    subCategory: "Safety Wear",
    priceEstimate: 1200,
    minOrder: 20,
    imageSrc: "/products/safetywear-1.png",
    hoverImageSrc: "/products/safetywear-2.png",
    material: "Reflective Nylon",
  },
  {
    id: "p006",
    name: "Hospitality Uniform",
    category: "corporate-apparel",
    subCategory: "Hospitality Uniforms",
    priceEstimate: 600,
    minOrder: 40,
    imageSrc: "/products/hospitality-1.png",
    hoverImageSrc: "/products/hospitality-2.png",
    material: "Durable Poly-Twill",
  },

  // --- Employee Kits ---
  {
    id: "p007",
    name: "Premium Welcome Kit",
    category: "employee-kits",
    subCategory: "Welcome Kits",
    priceEstimate: 1500,
    minOrder: 10,
    imageSrc: "/products/welcomekit-1.png",
    hoverImageSrc: "/products/welcomekit-2.png",
    material: "Rigid Board",
  },
  {
    id: "p008",
    name: "Work From Home Kit",
    category: "employee-kits",
    subCategory: "Work From Home Kits",
    priceEstimate: 2200,
    minOrder: 10,
    imageSrc: "/products/wfhkit-1.png",
    hoverImageSrc: "/products/wfhkit-2.png",
    material: "Mixed",
  },
  {
    id: "p009",
    name: "Corporate Swag Box",
    category: "employee-kits",
    subCategory: "Corporate Swag Boxes",
    priceEstimate: 1800,
    minOrder: 20,
    imageSrc: "/products/swagbox-1.png",
    hoverImageSrc: "/products/swagbox-2.png",
    material: "Mixed",
  },
  {
    id: "p010",
    name: "Joining Merchandise",
    category: "employee-kits",
    subCategory: "Joining Merchandise",
    priceEstimate: 900,
    minOrder: 20,
    imageSrc: "/products/joiningmerch-1.png",
    hoverImageSrc: "/products/joiningmerch-2.png",
    material: "Mixed",
  },
  {
    id: "p011",
    name: "Festive Hamper",
    category: "employee-kits",
    subCategory: "Festive Employee Gifts",
    priceEstimate: 2500,
    minOrder: 50,
    imageSrc: "/products/hamper-1.png",
    hoverImageSrc: "/products/hamper-2.png",
    material: "Luxury Gift Packaging",
  },

  // --- Corporate Gifting ---
  {
    id: "p012",
    name: "Smart Temp Bottle",
    category: "corporate-gifting",
    subCategory: "Premium Drinkware",
    priceEstimate: 650,
    minOrder: 50,
    imageSrc: "/products/smartbottle-1.png",
    hoverImageSrc: "/products/smartbottle-2.png",
    material: "304 Stainless Steel",
  },
  {
    id: "p013",
    name: "Executive Diary",
    category: "corporate-gifting",
    subCategory: "Notebooks & Diaries",
    priceEstimate: 400,
    minOrder: 100,
    imageSrc: "/products/diary-1.png",
    hoverImageSrc: "/products/diary-2.png",
    material: "PU Leather",
  },
  {
    id: "p014",
    name: "Metal Pen",
    category: "corporate-gifting",
    subCategory: "Pens",
    priceEstimate: 150,
    minOrder: 200,
    imageSrc: "/products/pen-1.png",
    hoverImageSrc: "/products/pen-2.png",
    material: "Aluminium",
  },
  {
    id: "p015",
    name: "Premium Mug",
    category: "corporate-gifting",
    subCategory: "Mugs",
    priceEstimate: 250,
    minOrder: 100,
    imageSrc: "/products/mug-1.png",
    hoverImageSrc: "/products/mug-2.png",
    material: "Ceramic",
  },

  // --- School & College ---
  {
    id: "p016",
    name: "College Hoodie",
    category: "school-college",
    subCategory: "College Hoodies & Jackets",
    priceEstimate: 800,
    minOrder: 30,
    imageSrc: "/products/jacket-1.png",
    hoverImageSrc: "/products/jacket-2.png",
    material: "Fleece",
  },
  {
    id: "p017",
    name: "Sports Jersey",
    category: "school-college",
    subCategory: "Sports Jerseys",
    priceEstimate: 500,
    minOrder: 40,
    imageSrc: "/products/jersey-1.png",
    hoverImageSrc: "/products/jersey-2.png",
    material: "Polyester",
  },
  {
    id: "p018",
    name: "School Uniform",
    category: "school-college",
    subCategory: "School Uniforms",
    priceEstimate: 450,
    minOrder: 50,
    imageSrc: "/products/schooluniform-1.png",
    hoverImageSrc: "/products/schooluniform-2.png",
    material: "Cotton Blend",
  },
  {
    id: "p019",
    name: "College Uniform",
    category: "school-college",
    subCategory: "College Uniforms",
    priceEstimate: 600,
    minOrder: 50,
    imageSrc: "/products/collegeuniform-1.png",
    hoverImageSrc: "/products/collegeuniform-2.png",
    material: "Cotton Blend",
  },
  {
    id: "p020",
    name: "Convocation Robe",
    category: "school-college",
    subCategory: "Convocation Merchandise",
    priceEstimate: 1100,
    minOrder: 20,
    imageSrc: "/products/convocation-1.png",
    hoverImageSrc: "/products/convocation-2.png",
    material: "Synthetic",
  },
  {
    id: "p021",
    name: "Fest Merchandise",
    category: "school-college",
    subCategory: "Fest Merchandise",
    priceEstimate: 300,
    minOrder: 100,
    imageSrc: "/products/festmerch-1.png",
    hoverImageSrc: "/products/festmerch-2.png",
    material: "Cotton",
  },
  {
    id: "p022",
    name: "Student Welcome Kit",
    category: "school-college",
    subCategory: "Student Welcome Kits",
    priceEstimate: 700,
    minOrder: 30,
    imageSrc: "/products/studentkit-1.png",
    hoverImageSrc: "/products/studentkit-2.png",
    material: "Mixed",
  },

  // --- Event Merchandise ---
  {
    id: "p023",
    name: "Tech Organizer",
    category: "event-merchandise",
    subCategory: "Event Essentials",
    priceEstimate: 380,
    minOrder: 100,
    imageSrc: "/products/tech-1.png",
    hoverImageSrc: "/products/tech-2.png",
    material: "Nylon",
  },
  {
    id: "p024",
    name: "Event T-Shirt",
    category: "event-merchandise",
    subCategory: "Event T-Shirts",
    priceEstimate: 250,
    minOrder: 100,
    imageSrc: "/products/eventtee-1.png",
    hoverImageSrc: "/products/eventtee-2.png",
    material: "Cotton",
  },
  {
    id: "p025",
    name: "Conference Kit",
    category: "event-merchandise",
    subCategory: "Conference Kits",
    priceEstimate: 450,
    minOrder: 50,
    imageSrc: "/products/conference-1.png",
    hoverImageSrc: "/products/conference-2.png",
    material: "Mixed",
  },
  {
    id: "p026",
    name: "Corporate Lanyard",
    category: "event-merchandise",
    subCategory: "Lanyards & Badges",
    priceEstimate: 80,
    minOrder: 200,
    imageSrc: "/products/lanyard-1.png",
    hoverImageSrc: "/products/lanyard-2.png",
    material: "Polyester",
  },
  {
    id: "p027",
    name: "Branding Bag",
    category: "event-merchandise",
    subCategory: "Bags",
    priceEstimate: 300,
    minOrder: 100,
    imageSrc: "/products/bag-1.png",
    hoverImageSrc: "/products/bag-2.png",
    material: "Canvas",
  },
  {
    id: "p028",
    name: "Logo Cap",
    category: "event-merchandise",
    subCategory: "Caps",
    priceEstimate: 150,
    minOrder: 100,
    imageSrc: "/products/cap-1.png",
    hoverImageSrc: "/products/cap-2.png",
    material: "Cotton",
  },
  {
    id: "p029",
    name: "Branding Assets",
    category: "event-merchandise",
    subCategory: "Branding Merchandise",
    priceEstimate: 500,
    minOrder: 50,
    imageSrc: "/products/branding-1.png",
    hoverImageSrc: "/products/branding-2.png",
    material: "Vinyl/PVC",
  },
  {
    id: "p030",
    name: "Festive Gift",
    category: "corporate-gifting",
    subCategory: "Tech Accessories",
    priceEstimate: 800,
    minOrder: 30,
    imageSrc: "/products/festivegift-1.png",
    hoverImageSrc: "/products/festivegift-2.png",
    material: "Mixed",
  },
];

export const categories = [
  {
    id: "corporate-apparel",
    name: "Corporate Apparel",
    label: "Corporate Apparel",
    image: "/products/polo-category.png",
    hoverImage: "/products/polo-2.png",
    description: "Premium uniforms, polos, hoodies and executive workwear.",

    productCount: 6,

    featured: ["Polo T-Shirts", "Formal Shirts", "Hoodies", "Safety Wear"],
  },
  {
    id: "employee-kits",
    name: "Employee Kits",
    label: "Employee Kits",
    image: "/products/welcomekit-category.png",
    hoverImage: "/products/welcomekit-2.png",
    description: "Welcome kits, swag boxes and onboarding merchandise.",

    productCount: 5,

    featured: ["Welcome Kits", "Swag Boxes", "WFH Kits", "Joining Kits"],
  },
  {
    id: "corporate-gifting",
    name: "Corporate Gifting",
    label: "Corporate Gifting",
    image: "/products/smartbottle-category.png",
    hoverImage: "/products/smartbottle-2.png",
    description: "Premium gift sets and promotional items for corporate events.",

    productCount: 5,

    featured: ["Gift Sets", "Promotional Items", "Tech Accessories", "Customized Merchandise"],
  },
  {
    id: "school-college",
    name: "School & College",
    label: "School & College",
    image: "/products/collegeuniform-category.png",
    hoverImage: "/products/jacket-2.png",
    description: "Uniforms, fest merchandise, jerseys, and student kits for schools and colleges.",

    productCount: 5,

    featured: ["Uniforms", "Fest Merchandise", "Jerseys", "Student Kits"],
  },
  {
    id: "event-merchandise",
    name: "Event Merchandise",
    label: "Event Merchandise",
    image: "/products/eventtee-category.png",
    hoverImage: "/products/tech-2.png",
    description: "Lanyards, tees, caps, bags, and delegate kits built for smooth event execution.",

    productCount: 5,
    featured: ["Lanyards", "T-Shirts", "Caps", "Bags", "Delegate Kits"],
  },
];

export const materials = [
  "100% Premium Cotton",
  "Cotton Blend",
  "Polyester",
  "Fleece",
  "Reflective Nylon",
  "Durable Poly-Twill",
  "Rigid Board",
  "Mixed",
  "304 Stainless Steel",
  "PU Leather",
  "Aluminium",
  "Ceramic",
  "Synthetic",
  "Cotton",
  "Nylon",
  "Canvas",
  "Vinyl/PVC",
];

export const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: 50000 },
];

export const moqOptions = [
  { label: "Less than 30", value: 30 },
  { label: "30 - 50", value: 50 },
  { label: "50+", value: 100 },
];

export const processSteps = [
  {
    step: "1",
    title: "Share Requirements",
    description:
      "Tell us about quantities, timelines, products and brand guidelines.",
    image: "/products/step-1.png",
  },

  {
    step: "2",
    title: "Design Alignment",
    description:
      "Our team maps artwork, placement, finishes and packaging options.",
    image: "/products/step-2.png",
  },

  {
    step: "3",
    title: "Sample Approval",
    description:
      "Review a digital proof or production sample before execution.",
    image: "/products/step-3.png",
  },

  {
    step: "4",
    title: "Bulk Production",
    description:
      "Approved products move through quality-controlled manufacturing.",
    image: "/products/step-4.png",
  },

  {
    step: "5",
    title: "Pan-India Delivery",
    description:
      "Orders are securely packed and dispatched nationwide.",
    image: "/products/step-5.png",
  },
];

export const testimonials = [
  {
    name: "Ananya Mehta",
    role: "HR Director",
    company: "Nexora Labs",
    rating: 5,
    text: "Their onboarding kits felt premium, arrived on schedule, and made our new-hire experience feel genuinely polished.",
  },
  {
    name: "Rahul Sinha",
    role: "Procurement Lead",
    company: "BrightWorks",
    rating: 5,
    text: "The Corp Tees handled a complex multi-city event order with clear communication and consistent product quality.",
  },
  {
    name: "Priya Nair",
    role: "Brand Manager",
    company: "EduSpark Group",
    rating: 4,
    text: "The uniforms and fest merchandise matched our colors closely and held up well after repeated use.",
  },
  {
    name: "Karan Malhotra",
    role: "Founder",
    company: "ScaleMint",
    rating: 5,
    text: "Fast sampling, practical suggestions, and a final swag box our team was excited to share.",
  },
];

export const industries = [
  {
    id: "corporate",
    name: "Corporate Enterprises",
    description:
      "Premium apparel, onboarding kits, and executive gifting for established teams.",
  },
  {
    id: "startups",
    name: "Startups",
    description:
      "Agile branded merchandise programs for fast-growing teams and launch campaigns.",
  },
  {
    id: "education",
    name: "Education",
    description:
      "Uniforms, fest merchandise, jerseys, and student kits for schools and colleges.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "Professional uniforms, staff kits, and durable essentials for care environments.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "Safety wear, worker uniforms, and practical engagement kits for industrial teams.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Polished staff uniforms, aprons, welcome kits, and guest-facing branded goods.",
  },
  {
    id: "events",
    name: "Events & Conferences",
    description:
      "Lanyards, tees, caps, bags, and delegate kits built for smooth event execution.",
  },
  {
    id: "government",
    name: "Government & Institutions",
    description:
      "Reliable official merchandise and uniform programs for public-sector needs.",
  },
];


export const whyChooseUs = [
  {
    id: 1,
    title: "Premium Quality Products",
    description:
      "Every merchandise item undergoes rigorous quality checks to ensure exceptional finish, durability, and brand presentation.",
    image: "/products/premium-quality.png",
    stats: "100% Quality Inspected",
  },

  {
    id: 2,
    title: "Custom Branding Solutions",
    description:
      "From logo placement and embroidery to packaging and merchandise design, every detail is customized to your brand identity.",
    image: "/products/custom-branding.png",
    stats: "Unlimited Customization",
  },

  {
    id: 3,
    title: "Reliable Delivery",
    description:
      "Our streamlined production and logistics network ensures timely deliveries across India, even for large-scale orders.",
    image: "/products/reliable-delivery.png",
    stats: "Pan India Delivery",
  },

  {
    id: 4,
    title: "Bulk Order Specialists",
    description:
      "Whether it's 100 units or 10,000 units, our manufacturing capabilities are built to handle enterprise-scale merchandise programs.",
    image: "/products/bulk-order-specialists.png",
    stats: "10,000+ Units Capacity",
  },

  {
    id: 5,
    title: "Dedicated Relationship Manager",
    description:
      "A single point of contact guides your project from consultation to delivery, ensuring smooth communication throughout.",
    image: "/products/dedicated-relationship-manager.png",
    stats: "Personalized Support",
  },

  {
    id: 6,
    title: "End-to-End Service",
    description:
      "From concept and design to manufacturing, packaging, quality checks, and delivery, we manage the complete merchandise journey.",
    image: "/products/end-to-end-service.png",
    stats: "One Partner Solution",
  },
];


export const stats = [
  {
    value: "500+",
    label: "Happy Clients",
    description: "Trusted by leading organizations nationwide",
    image: "/products/happy-clients.png",
  },
  {
    value: "10,000+",
    label: "Orders Delivered",
    description: "Successfully fulfilled merchandise orders",
    image: "/products/orders-delivered.png",
  },
  {
    value: "25+",
    label: "States Covered",
    description: "Pan-India corporate merchandise reach",
    image: "/products/states-covered.png",
  },
  {
    value: "98%",
    label: "Client Retention",
    description: "Long-term partnerships built on trust",
    image: "/products/client-retention.png",
  },
];


export const values = [
  {
    number: "01",
    title: "Passion",
    image: "/products/value-1.png",
    description:
      "We believe memorable brands are built through thoughtful details. Every stitch, finish, material, and presentation element receives the attention it deserves.",
  },
  {
    number: "02",
    title: "Quality",
    image: "/products/value-2.png",
    description:
      "Excellence is not an outcome but a process. We maintain uncompromising standards across sourcing, production, packaging, and delivery.",
  },
  {
    number: "03",
    title: "Partnership",
    image: "/products/value-3.png",
    description:
      "We work as an extension of your team, aligning every solution with your culture, objectives, and long-term vision.",
  },
  {
    number: "04",
    title: "Innovation",
    image: "/products/value-4.png",
    description:
      "We continuously explore new materials, customization methods, packaging concepts, and branding experiences to help organizations stay ahead.",
  },
];
