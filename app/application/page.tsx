"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

function ApplicationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const country = searchParams.get("country") || "Australia";
  const visaType = searchParams.get("visaType") || "Tourist Visa";

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "1998-05-14",
    gender: "Female",
    passportNumber: "N12345678",
    nationality: "Nepali",
    passportType: "Ordinary",
    issueDate: "2022-01-10",
    expiryDate: "2032-01-09",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if logged in & check draft
  useEffect(() => {
    // 1. Check logged-in user
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setFormData((prev) => ({
            ...prev,
            fullName: prev.fullName || data.user.fullName || "",
            email: prev.email || data.user.email || "",
          }));
        }
      })
      .catch(() => {});

    // 2. Load draft if exists
    try {
      const saved = localStorage.getItem("gp_app_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Valid email is required";
    if (!formData.passportNumber.trim()) newErrors.passportNumber = "Passport number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Persist to local draft for consistency across step 1, 2, and 3
    try {
      const draft = {
        ...formData,
        destination: country,
        visaType: visaType,
      };
      localStorage.setItem("gp_app_draft", JSON.stringify(draft));
    } catch {}

    router.push(
      `/travel?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/apply" className="hover:text-blue-600 transition-colors">
              Visa Setup
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Personal Information</span>
          </nav>

          {/* Stepper Header */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                  Step 1 of 3
                </p>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Personal & Passport Information
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Destination: <span className="font-semibold text-slate-800">{country}</span> — Visa:{" "}
                  <span className="font-semibold text-blue-600">{visaType}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">Progress: Step 1</span>
              </div>
            </div>

            {/* Stepper bar */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="h-2 rounded-full bg-blue-600"></div>
              <div className="h-2 rounded-full bg-slate-200"></div>
              <div className="h-2 rounded-full bg-slate-200"></div>
            </div>

            <form onSubmit={handleNext} className="mt-8 space-y-8">
              {/* Personal Details Section */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-5">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Applicant Personal Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Legal Name (as printed on passport) *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Kaladevi Rishidev"
                      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all ${
                        errors.fullName ? "border-rose-500 ring-2 ring-rose-100" : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977 9800000000"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Passport Details Section */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-5">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>Passport & Nationality Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Passport Number *
                    </label>
                    <input
                      type="text"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      placeholder="e.g. N12345678"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 font-mono outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all uppercase"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nationality *
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="Nepali">Nepali</option>
                      <option value="Indian">Indian</option>
                      <option value="Filipino">Filipino</option>
                      <option value="British">British</option>
                      <option value="American">American</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Passport Issue Date *
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Passport Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/apply?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Link>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors btn-press"
                >
                  <span>Continue to Travel Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ApplicationContent />
    </Suspense>
  );
}
