"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plane,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowRight,
  Check,
  ChevronRight,
  Shield,
  FileText,
} from "lucide-react";

const countryList = [
  { name: "Australia", image: "/coralhouse.png", time: "3–5 days" },
  { name: "Japan", image: "/japanhouse.png", time: "4–6 days" },
  { name: "United Kingdom", image: "/ukhouse.png", time: "3–5 days" },
  { name: "United States", image: "/usastatus.png", time: "2–4 days" },
  { name: "France", image: "/france.png", time: "3–5 days" },
  { name: "Dubai", image: "/dubai.png", time: "24–48 hrs" },
];

const visaTypes = [
  {
    id: "Tourist Visa",
    name: "Tourist Visa",
    icon: Plane,
    desc: "For holidays, vacations, sightseeing, and visiting friends or family.",
    details: "Valid for up to 90 days of continuous travel",
  },
  {
    id: "Business Visa",
    name: "Business Visa",
    icon: Briefcase,
    desc: "For corporate conferences, trade meetings, partner contracts, and investor trips.",
    details: "Single or multiple entry options available",
  },
  {
    id: "Student Visa",
    name: "Student Visa",
    icon: GraduationCap,
    desc: "For university enrollment, language schools, and recognized academic programs.",
    details: "Valid for entire duration of academic course",
  },
  {
    id: "Transit Visa",
    name: "Transit Visa",
    icon: Clock,
    desc: "For airport layovers and short stopovers while traveling to a third country.",
    details: "Valid for up to 72 hours transit period",
  },
];

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedVisa, setSelectedVisa] = useState<string>("");

  useEffect(() => {
    const countryParam = searchParams.get("country");
    const visaParam = searchParams.get("visaType");

    if (countryParam) setSelectedCountry(countryParam);
    if (visaParam) setSelectedVisa(visaParam);
  }, [searchParams]);

  // Compute progress
  let progress = 10;
  if (selectedCountry) progress += 45;
  if (selectedVisa) progress += 45;

  const handleContinue = () => {
    if (!selectedCountry || !selectedVisa) return;
    router.push(
      `/application?country=${encodeURIComponent(selectedCountry)}&visaType=${encodeURIComponent(selectedVisa)}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Start Application</span>
          </nav>

          {/* Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                  Step 1: Select Visa & Destination
                </p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Where would you like to travel?
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Choose your destination country and preferred visa category to begin.
                </p>
              </div>

              {/* Progress Indicator - Clean, NO BADGES */}
              <div className="w-full sm:w-48 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                  <span className="font-medium">Setup Progress</span>
                  <span className="font-bold text-blue-600">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Step 1: Destination Selection */}
            <div className="mt-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  1. Select Destination Country
                </h2>
                {selectedCountry && (
                  <span className="text-xs font-semibold text-blue-600">
                    Selected: {selectedCountry}
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {countryList.map((country) => {
                  const isSelected = selectedCountry === country.name;
                  return (
                    <button
                      type="button"
                      key={country.name}
                      onClick={() => setSelectedCountry(country.name)}
                      className={`group relative overflow-hidden rounded-xl text-left border-2 transition-all p-3 flex flex-col justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="h-32 w-full rounded-lg overflow-hidden bg-slate-100 relative">
                        <img
                          src={country.image}
                          alt={country.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <p className={`font-bold text-sm ${isSelected ? "text-blue-600" : "text-slate-900"}`}>
                          {country.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">Est. {country.time}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Visa Category Selection */}
            <div className="mt-12">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  2. Select Visa Category
                </h2>
                {selectedVisa && (
                  <span className="text-xs font-semibold text-blue-600">
                    Selected: {selectedVisa}
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visaTypes.map((visa) => {
                  const Icon = visa.icon;
                  const isSelected = selectedVisa === visa.id;
                  return (
                    <button
                      type="button"
                      key={visa.id}
                      onClick={() => setSelectedVisa(visa.id)}
                      className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-bold text-sm ${isSelected ? "text-blue-600" : "text-slate-900"}`}>
                            {visa.name}
                          </h3>
                          {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                        </div>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          {visa.desc}
                        </p>
                        <p className="mt-2 text-xs font-medium text-slate-500">
                          {visa.details}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selection Summary and Continue Button */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {selectedCountry && selectedVisa ? (
                  <p className="text-sm text-slate-700">
                    Applying for: <span className="font-bold text-slate-900">{selectedCountry}</span> —{" "}
                    <span className="font-bold text-blue-600">{selectedVisa}</span>
                  </p>
                ) : (
                  <p className="text-sm text-slate-500">
                    Please select both a destination country and a visa category to continue.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedCountry || !selectedVisa}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all btn-press"
              >
                <span>Continue to Personal Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ApplyContent />
    </Suspense>
  );
}
