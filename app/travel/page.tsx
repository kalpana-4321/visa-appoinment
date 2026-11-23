"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plane,
  Building,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react";

function TravelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const country = searchParams.get("country") || "Australia";
  const visaType = searchParams.get("visaType") || "Tourist Visa";

  const [formData, setFormData] = useState({
    destination: country,
    visaCategory: visaType,
    departureDate: "2026-12-15",
    returnDate: "2027-01-05",
    purpose: "Tourism and holiday visit with family, exploring major tourist sights.",
    hotelName: "Grand Harbour View Hotel",
    address: "124 Circular Quay, Sydney, NSW 2000",
  });

  const [applicantName, setApplicantName] = useState("Kaladevi Rishidev");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gp_app_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fullName) setApplicantName(parsed.fullName);
        setFormData((prev) => ({
          ...prev,
          destination: parsed.destination || country,
          visaCategory: parsed.visaType || visaType,
          departureDate: parsed.departureDate || prev.departureDate,
          returnDate: parsed.returnDate || prev.returnDate,
          purpose: parsed.purpose || prev.purpose,
          hotelName: parsed.hotelName || prev.hotelName,
          address: parsed.address || prev.address,
        }));
      }
    } catch {}
  }, [country, visaType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const saved = localStorage.getItem("gp_app_draft");
      const current = saved ? JSON.parse(saved) : {};
      const updated = {
        ...current,
        destination: formData.destination,
        visaType: formData.visaCategory,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        purpose: formData.purpose,
        hotelName: formData.hotelName,
        hotelAddress: `${formData.hotelName}, ${formData.address}`,
      };
      localStorage.setItem("gp_app_draft", JSON.stringify(updated));
    } catch {}

    router.push(
      `/document?country=${encodeURIComponent(formData.destination)}&visaType=${encodeURIComponent(formData.visaCategory)}`
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
            <Link
              href={`/application?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`}
              className="hover:text-blue-600 transition-colors"
            >
              Personal Details
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Travel Itinerary</span>
          </nav>

          {/* Stepper Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                  Step 2 of 3
                </p>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Travel & Accommodation Details
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Applicant: <span className="font-semibold text-slate-800">{applicantName}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">Progress: Step 2</span>
              </div>
            </div>

            {/* Stepper bar */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="h-2 rounded-full bg-blue-600"></div>
              <div className="h-2 rounded-full bg-blue-600"></div>
              <div className="h-2 rounded-full bg-slate-200"></div>
            </div>

            <form onSubmit={handleNext} className="mt-8 space-y-8">
              {/* Flight & Travel Dates */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-5">
                  <Plane className="h-5 w-5 text-blue-600" />
                  <span>Trip Schedule & Purpose</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Destination Country *
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="Australia">Australia</option>
                      <option value="Japan">Japan</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Dubai">Dubai</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Visa Category *
                    </label>
                    <select
                      name="visaCategory"
                      value={formData.visaCategory}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Transit Visa">Transit Visa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Intended Arrival Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Return Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Detailed Purpose of Visit *
                    </label>
                    <textarea
                      rows={3}
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      placeholder="Describe your planned travel activities, places you intend to visit..."
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Accommodation Section */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-5">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Stay & Accommodation Details</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Hotel Name or Host Resident *
                    </label>
                    <input
                      type="text"
                      name="hotelName"
                      value={formData.hotelName}
                      onChange={handleChange}
                      placeholder="e.g. Hilton Sydney or Host Family Name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Address in Destination Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, city, state and postal code"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/application?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Link>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors btn-press"
                >
                  <span>Continue to Document Upload</span>
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

export default function TravelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <TravelContent />
    </Suspense>
  );
}
