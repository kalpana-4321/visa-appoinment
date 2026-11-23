"use client";

import { useState, useEffect } from "react";
import { X, Search, CheckCircle2, Clock, FileText, ArrowRight } from "lucide-react";

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackModal({ isOpen, onClose }: TrackModalProps) {
  const [refId, setRefId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id="track-modal-title" className="text-xl font-bold text-slate-900">
          Track Your Application
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter your GlobePass Application Reference ID to check live status.
        </p>

        <form onSubmit={handleSearch} className="mt-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                placeholder="e.g. GP-84920 or your email"
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors btn-press flex items-center gap-1.5"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </div>
        </form>

        {searched && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Application Reference
                </p>
                <p className="font-mono text-sm font-bold text-slate-800">
                  {refId.toUpperCase().includes("GP") ? refId.toUpperCase() : `GP-${refId.slice(0, 5).toUpperCase() || "72941"}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Status
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  In Processing
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Application Submitted & Verified
                  </p>
                  <p className="text-xs text-slate-500">Nov 22, 2026 — 10:30 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Embassy Verification & Document Review
                  </p>
                  <p className="text-xs text-slate-500">Currently in progress • Est. completion 48 hrs</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-40">
                <FileText className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Visa Issuance & Delivery
                  </p>
                  <p className="text-xs text-slate-400">Electronic visa sent directly to email</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
