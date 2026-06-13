"use client";

import { useState } from "react";
import { Mail, Phone, Building, DollarSign, Eye, Trash2, CheckCircle2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import type { MessageStatus } from "@/types";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date;
}

interface MessagesManagerProps {
  initialMessages: Message[];
}

export default function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"ALL" | MessageStatus>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    if (filter !== "ALL" && m.status !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const markRead = async (id: string) => {
    setLoading(id);
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READ" }),
      });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "READ" } : m));
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoading(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setLoading(id);
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoading(null);
    }
  };

  const statusCounts = {
    ALL: messages.length,
    UNREAD: messages.filter((m) => m.status === "UNREAD").length,
    READ: messages.filter((m) => m.status === "READ").length,
    REPLIED: messages.filter((m) => m.status === "REPLIED").length,
  };

  const statusColor: Record<string, string> = {
    UNREAD: "#F59E0B",
    READ: "#00D4FF",
    REPLIED: "#10B981",
  };

  return (
    <div className="space-y-5 h-full">
      <div>
        <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Contact Messages</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{statusCounts.UNREAD} unread messages</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[#00D4FF] transition-colors" />
        </div>
        <div className="flex gap-2">
          {(["ALL", "UNREAD", "READ", "REPLIED"] as const).map((status) => (
            <button key={status} onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === status ? "bg-[var(--accent-primary)] text-[#04050D]" : "glass border border-[var(--border-color)] text-[var(--text-secondary)]"}`}>
              {status} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Message list */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.length === 0 ? (
            <div className="glass border border-[var(--border-color)] rounded-2xl p-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">No messages found</p>
            </div>
          ) : (
            filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); if (msg.status === "UNREAD") markRead(msg.id); }}
                className={`w-full text-left p-4 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                  selected?.id === msg.id
                    ? "border-[rgba(0,212,255,0.4)] glass"
                    : "glass border-[var(--border-color)]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{msg.name}</span>
                      {msg.status === "UNREAD" && (
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{msg.email}</p>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-1">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: `${statusColor[msg.status]}15`, color: statusColor[msg.status] }}>
                      {msg.status}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="glass border border-[var(--border-color)] rounded-2xl p-6 space-y-5 sticky top-20">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{selected.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{selected.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteMessage(selected.id)}
                    className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {selected.phone && (
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Phone size={13} className="text-[#00D4FF]" />
                    {selected.phone}
                  </div>
                )}
                {selected.company && (
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Building size={13} className="text-[#8B5CF6]" />
                    {selected.company}
                  </div>
                )}
                {selected.service && (
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <CheckCircle2 size={13} className="text-[#10B981]" />
                    {selected.service}
                  </div>
                )}
                {selected.budget && (
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <DollarSign size={13} className="text-[#F59E0B]" />
                    {selected.budget}
                  </div>
                )}
              </div>

              <div className="glass border border-[var(--border-color)] rounded-xl p-4">
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-xs">Message</p>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selected.message}</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your inquiry to Corexoquest`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity"
                >
                  <Mail size={14} /> Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{ background: "#25D366" }}
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="glass border border-[var(--border-color)] rounded-2xl p-10 text-center">
              <Mail size={32} className="text-[var(--text-secondary)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
