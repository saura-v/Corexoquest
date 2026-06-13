"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "9779716390682";

  const messages = [
    "Hi! I'm interested in your services 👋",
    "I'd like a free digital audit",
    "Tell me about your web development packages",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="glass border border-[#25D366]/30 rounded-2xl p-4 w-72 shadow-2xl animate-scale-in">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[var(--border-color)]">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold font-display text-[var(--text-primary)]">
                Corexoquest
              </p>
              <p className="text-xs text-[#25D366]">● Online — Quick Reply</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-3">
            Hi there! 👋 How can we help you today?
          </p>
          <div className="space-y-2">
            {messages.map((msg) => (
              <a
                key={msg}
                href={`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:border-[#25D366]/40 hover:text-[var(--text-primary)] transition-all duration-200"
              >
                {msg}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 relative group"
        style={{ boxShadow: "0 0 20px rgba(37, 211, 102, 0.4)" }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle size={24} className="text-white" />
      </button>
    </div>
  );
}
