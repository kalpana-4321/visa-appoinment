"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const router = useRouter();
  const [nationality, setNationality] = useState("India");
  const [destination, setDestination] = useState("Australia");
  const [purpose, setPurpose] = useState("Tourist");
  const [checked, setChecked] = useState(false);

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

  const handleApplyNow = () => {
    onClose();
    router.push(`/apply?country=${encodeURIComponent(destination)}&purpose=${encodeURIComponent(purpose)}`);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="eligibility-modal-title"
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

        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Fast Verification</span>
        </div>

        <h2 id="eligibility-modal-title" className="text-xl font-bold text-slate-900">
          Instant Visa Eligibility Check
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Find out in seconds if you qualify for electronic visa or visa on arrival.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Passport / Nationality
            </label>
            <select
              value={nationality}
              onChange={(e) => {
                setNationality(e.target.value);
                setChecked(true);
              }}
              className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="India">India</option>
              <option value="Nepal">Nepal</option>
              <option value="Philippines">Philippines</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Other">Other Countries</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Destination Country
            </label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setChecked(true);
              }}
              className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Germany">Germany (Schengen)</option>
              <option value="Dubai">Dubai (UAE)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Travel Purpose
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Tourist", "Business", "Student"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setPurpose(item);
                    setChecked(true);
                  }}
                  className={`rounded-xl py-2 px-3 text-xs font-semibold transition-all border ${
                    purpose === item
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Eligibility Result Box */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-emerald-900">
                You are Eligible for Electronic Processing
              </p>
              <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                Citizens of {nationality} traveling to {destination} for {purpose.toLowerCase()} purposes can complete the standard digital application in ~5 minutes with no physical embassy visit.
              </p>
              <ul className="mt-2.5 space-y-1 text-xs text-emerald-900">
                <li>• Estimated turnaround: 2 to 4 business days</li>
                <li>• Digital entry approval delivered to your email</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyNow}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm shadow-blue-600/20"
          >
            <span>Proceed to Apply</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
