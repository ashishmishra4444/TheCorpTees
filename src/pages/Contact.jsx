import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import {
  FloatingInput,
  FloatingTextarea,
} from "../components/shared/DynamicForm";
import CustomButton from "../components/shared/CustomButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Get In Touch
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Have a question or need a custom quote? Our team is here to help.
            Reach out to us and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {[
              {
                icon: Phone,
                title: "Phone",
                lines: ["+91-XXX-XXX-XXXX", "+91-XXX-XXX-XXXX"],
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["info@thecorptees.com", "sales@thecorptees.com"],
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: MapPin,
                title: "Address",
                lines: ["Indore, Madhya Pradesh", "India - 452001"],
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Clock,
                title: "Business Hours",
                lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
                color: "bg-purple-50 text-purple-600",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-white rounded-xl border border-slate-200"
              >
                <div
                  className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                {item.lines.map((line, lidx) => (
                  <p key={lidx} className="text-sm text-slate-500">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Follow Us
              </h3>
              <div className="flex gap-2">
                {["Fb", "Ig", "In", "X"].map((label, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-slate-500">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Send us a Message
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FloatingInput
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <FloatingInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FloatingInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <FloatingInput
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Bulk Order Inquiry"
                    />
                  </div>

                  <div className="mb-6">
                    <FloatingTextarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                      rows={5}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <CustomButton
                    type="submit"
                    size="lg"
                    fullWidth
                    icon={Send}
                    iconPosition="right"
                  >
                    Send Message
                  </CustomButton>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
