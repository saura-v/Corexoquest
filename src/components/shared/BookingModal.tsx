"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Mail, Phone, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Web Design & Development",
  "Mobile App Development",
  "SEO Optimization",
  "PPC & Paid Advertising",
  "Social Media Management",
  "Content Marketing",
  "Graphic Design & Branding",
  "E-Commerce Development",
  "UI/UX Design",
  "Email Marketing",
  "Cloud & DevOps",
  "Data Analytics",
  "General Consultation",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", preferredDate: "", preferredTime: "", message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStep(1);
      setForm({
        name: "", email: "", phone: "", company: "",
        service: "", preferredDate: "", preferredTime: "", message: "",
      });
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Consultation booked! We'll confirm within 24 hours.");
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[#00D4FF] transition-colors";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg glass border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#8B5CF6]/10 border-b border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
                Book a Free Consultation
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                30-min strategy call — no obligation
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6]" : "bg-[var(--border-color)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }}>
          <div className="p-6 space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <User size={12} /> Full Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <Mail size={12} /> Email *
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <Phone size={12} /> Phone
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <Briefcase size={12} /> Company
                    </label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
                    Service Interested In *
                  </label>
                  <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <Calendar size={12} /> Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                      <Clock size={12} /> Preferred Time
                    </label>
                    <select name="preferredTime" value={form.preferredTime} onChange={handleChange} className={inputClass}>
                      <option value="">Select time (NPT)</option>
                      {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Briefly describe what you're looking to achieve..."
                    className={inputClass + " resize-none"}
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : step === 1 ? "Next →" : "Book Consultation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
