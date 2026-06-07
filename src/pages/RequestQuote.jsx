import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  User,
  Mail,
  Phone,
  Package,
  Calendar,
  AlertCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { categories } from "../data/mockData";
import {
  FloatingInput,
  FloatingTextarea,
  FileDropzone,
  SelectField,
} from "../components/shared/DynamicForm";
import CustomButton from "../components/shared/CustomButton";

const steps = [
  { id: 1, title: "Company Profile", icon: Building2 },
  { id: 2, title: "Order Details", icon: Package },
  { id: 3, title: "Delivery & Notes", icon: Calendar },
];

export default function RequestQuote() {
  const navigate = useNavigate();
  const { quoteCart: cartItems, clearQuote } = useAppState();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    companyName: "",
    gstin: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    logoFile: null,
    deliveryDate: "",
    packaging: "",
    specialInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.companyName.trim())
        newErrors.companyName = "Company name is required";
      if (!formData.contactPerson.trim())
        newErrors.contactPerson = "Contact person is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[\d\s\-+]{10,}$/.test(formData.phone.replace(/\s/g, "")))
        newErrors.phone = "Invalid phone number";
    }
    if (step === 2) {
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.quantity || parseInt(formData.quantity) < 1)
        newErrors.quantity = "Valid quantity is required";
    }
    if (step === 3) {
      if (!formData.deliveryDate)
        newErrors.deliveryDate = "Delivery date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setReferenceId(`RFQ-${Date.now().toString(36).toUpperCase()}`);
    setIsSubmitted(true);
    clearQuote();
  };

  const categoryOptions = categories
    .filter((c) => c.id !== "all")
    .map((c) => ({ value: c.id, label: c.label }));

  const packagingOptions = [
    { value: "standard", label: "Standard Packaging (Free)" },
    { value: "custom-box", label: "Custom Printed Swag Box" },
    { value: "premium-box", label: "Premium Velvet-Lined Box" },
    { value: "eco-friendly", label: "Eco-Friendly Kraft Packaging" },
    { value: "bulk-carton", label: "Bulk Carton Packaging" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Quote Request Submitted!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Thank you for your inquiry. Our team will review your requirements
            and get back to you within 24 hours with a detailed quotation.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-slate-500 mb-1">Reference ID</p>
            <p className="text-sm font-mono font-semibold text-slate-900">
              {referenceId}
            </p>
          </div>
          <div className="space-y-2">
            <CustomButton fullWidth onClick={() => navigate("/gallery")}>
              Continue Browsing
            </CustomButton>
            <Link to="/">
              <CustomButton variant="ghost" fullWidth>
                Back to Home
              </CustomButton>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Request a Quote
          </h1>
          <p className="text-sm text-slate-500">
            Fill in the details below and we'll send you a customized quotation
            within 24 hours
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      backgroundColor:
                        currentStep >= step.id ? "#f59e0b" : "#e2e8f0",
                      scale: currentStep === step.id ? 1.1 : 1,
                    }}
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center mb-2
                      ${currentStep > step.id ? "bg-emerald-500" : ""}
                    `}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <step.icon
                        className={`w-5 h-5 ${currentStep >= step.id ? "text-slate-900" : "text-slate-400"}`}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`
                    text-xs font-medium
                    ${currentStep >= step.id ? "text-slate-900" : "text-slate-400"}
                  `}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`
                    flex-1 h-1 mx-4 rounded-full
                    ${currentStep > step.id ? "bg-emerald-500" : "bg-slate-200"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8"
        >
          {/* Step 1: Company Profile */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Company Profile
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                  required
                  icon={Building2}
                />
                <FloatingInput
                  label="GSTIN (Optional)"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <FloatingInput
                label="Contact Person Name"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                error={errors.contactPerson}
                required
                icon={User}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  icon={Mail}
                />
                <FloatingInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  icon={Phone}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          )}

          {/* Step 2: Order Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Order Specifications
                </h2>
              </div>

              {/* Cart Items Summary */}
              {cartItems.length > 0 && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">
                    Items from your quote cart ({cartItems.length})
                  </p>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-700">{item.name}</span>
                        <span className="text-slate-900 font-semibold">
                          {item.quantity} units
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <SelectField
                label="Product Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
                error={errors.category}
                required
              />

              <FloatingInput
                label="Estimated Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
                required
                placeholder="e.g., 500"
              />

              <FileDropzone
                label="Upload Corporate Logo (Optional)"
                onFileSelect={(file) =>
                  setFormData((prev) => ({ ...prev, logoFile: file }))
                }
                accept=".svg,.ai,.eps,.pdf,.png,.jpg,.jpeg"
              />

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500">
                    Accepted formats: SVG, AI, EPS, PDF, PNG, JPG. Max file
                    size: 10MB. Vector files preferred for best print quality.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Delivery & Notes */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Delivery & Special Instructions
                </h2>
              </div>

              <FloatingInput
                label="Target Delivery Date"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={handleChange}
                error={errors.deliveryDate}
                required
              />

              <SelectField
                label="Packaging Preference"
                name="packaging"
                value={formData.packaging}
                onChange={handleChange}
                options={packagingOptions}
              />

              <FloatingTextarea
                label="Special Instructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Any specific requirements, branding preferences, or delivery instructions..."
                rows={4}
              />

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Quote Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Company</span>
                    <span className="font-medium text-slate-900">
                      {formData.companyName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Contact</span>
                    <span className="font-medium text-slate-900">
                      {formData.contactPerson}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Category</span>
                    <span className="font-medium text-slate-900">
                      {categoryOptions.find(
                        (c) => c.value === formData.category,
                      )?.label || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Quantity</span>
                    <span className="font-medium text-slate-900">
                      {formData.quantity} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery Date</span>
                    <span className="font-medium text-slate-900">
                      {formData.deliveryDate || "Not set"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div>
              {currentStep > 1 && (
                <CustomButton
                  variant="ghost"
                  onClick={handlePrev}
                  icon={ChevronLeft}
                >
                  Back
                </CustomButton>
              )}
            </div>
            <div className="flex gap-3">
              {currentStep < 3 ? (
                <CustomButton
                  onClick={handleNext}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Continue
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  icon={Send}
                  iconPosition="right"
                >
                  Submit Quote Request
                </CustomButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
