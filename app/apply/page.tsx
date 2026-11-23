
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CiGlobe } from "react-icons/ci";
import { RiNotification2Line } from "react-icons/ri";
import {
  FaRegUserCircle,
  FaPlane,
  FaBusinessTime,
  FaGraduationCap,
  FaLongArrowAltRight,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVisa, setSelectedVisa] = useState("");

  const countries = [
    { name: "Australia", image: "/coralhouse.png" },
    { name: "Japan", image: "/japanhouse.png" },
    { name: "United Kingdom", image: "/ukhouse.png" },
    { name: "United States", image: "/usastatus.png" },
  ];

  const handleContinue = () => {
    if (!selectedCountry || !selectedVisa) {
      return;
    }

    router.push(
      `/application?country=${encodeURIComponent(selectedCountry)}&visaType=${encodeURIComponent(selectedVisa)}`
    );
  };

  return (
    <div className="min-h-screen bg-[#E8DCC8] p-5 pb-[500px]">
      <div className="mx-auto min-h-[1800px] w-full max-w-[1440px] rounded-3xl bg-white px-5 py-6 shadow-sm sm:px-8 lg:px-10">

        {/* Navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CiGlobe className="text-3xl text-blue-600" />
            <h1 className="text-2xl font-bold">
              globe<span className="text-blue-600">Pass</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <RiNotification2Line className="text-2xl text-gray-700" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <FaRegUserCircle className="text-2xl text-blue-400" />
            </div>
          </div>
        </div>

       
        <div className="mt-5 h-px w-full bg-gray-200"></div>

        
        <div className="mt-7 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-gray-500">
              APPLICATION PORTAL
            </h1>

            <p className="mt-2 text-3xl font-bold text-black">
              Let's get started!
            </p>

            <p className="mt-2 text-gray-400">
              Your journey begins with a few simple steps.
            </p>
          </div>

          
          <div className="flex h-30 w-30 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <img
              src="/passport-1.png"
              alt="Passport"
              className="h-28 w-28 object-contain"
            />
          </div>
        </div>

        
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-gray-800">
              Your application progress
            </p>

            <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-600">
              0%
            </span>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
            <div className="h-full w-0 rounded-full bg-cyan-500"></div>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Complete each step to submit your application.
          </p>
        </div>

       
        <div className="mt-10">
          <p className="text-2xl font-bold text-blue-600">
            Choose your destination
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Where would you like to travel?
          </p>
        </div>

        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {countries.map((country) => (
            <button
              type="button"
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`group relative h-64 overflow-hidden rounded-2xl text-left transition sm:h-72 ${
                selectedCountry === country.name
                  ? "border-4 border-blue-600 ring-2 ring-blue-200"
                  : "border-4 border-transparent hover:border-blue-300"
              }`}
            >
              <img
                src={country.image}
                alt={country.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-end justify-end p-5">
                <p className="rounded-lg bg-white/80 px-4 py-2 text-xl font-bold text-black">
                  {country.name}
                </p>
              </div>

              {selectedCountry === country.name && (
                <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                  Selected
                </span>
              )}
            </button>
          ))}
        </div>

        
        <div className="mt-7 h-px w-full bg-gray-300"></div>

        
        <div className="mt-7 rounded-2xl px-7 py-3">
          <h1 className="text-2xl font-bold text-black">
            Select your visa types
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Choose the visa type that matches your travel purpose.
          </p>
        </div>

       
        <button
          type="button"
          onClick={() => setSelectedVisa("Tourist Visa")}
          className={`mt-4 flex w-full items-center justify-start gap-5 rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
            selectedVisa === "Tourist Visa"
              ? "border-blue-600 ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50">
            <FaPlane className="text-2xl text-gray-500" />
          </div>

          <div>
            <p className="text-lg font-semibold text-black">
              Tourist Visa
            </p>
            <p className="mt-2 text-sm text-gray-500">
              For holidays and visiting family
            </p>
          </div>

          {selectedVisa === "Tourist Visa" && (
            <span className="ml-auto text-sm font-semibold text-blue-600">
              Selected
            </span>
          )}
        </button>

       
        <button
          type="button"
          onClick={() => setSelectedVisa("Business Visa")}
          className={`mt-4 flex w-full items-center justify-start gap-5 rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
            selectedVisa === "Business Visa"
              ? "border-blue-600 ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50">
            <FaBusinessTime className="text-2xl text-gray-500" />
          </div>

          <div>
            <p className="text-lg font-semibold text-black">
              Business Visa
            </p>
            <p className="mt-2 text-sm text-gray-500">
              For business trips and meetings
            </p>
          </div>

          {selectedVisa === "Business Visa" && (
            <span className="ml-auto text-sm font-semibold text-blue-600">
              Selected
            </span>
          )}
        </button>

       
        <button
          type="button"
          onClick={() => setSelectedVisa("Student Visa")}
          className={`mt-4 flex w-full items-center justify-start gap-5 rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
            selectedVisa === "Student Visa"
              ? "border-blue-600 ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50">
            <FaGraduationCap className="text-2xl text-gray-500" />
          </div>

          <div>
            <p className="text-lg font-semibold text-black">
              Student Visa
            </p>
            <p className="mt-2 text-sm text-gray-500">
              For education and study abroad
            </p>
          </div>

          {selectedVisa === "Student Visa" && (
            <span className="ml-auto text-sm font-semibold text-blue-600">
              Selected
            </span>
          )}
        </button>

        
        <div className="mt-5 text-center text-sm text-gray-500">
          {selectedCountry && selectedVisa ? (
            <p>
              Selected: <span className="font-semibold text-blue-600">{selectedCountry}</span>
              {" — "}
              <span className="font-semibold text-blue-600">{selectedVisa}</span>
            </p>
          ) : (
            <p>Please select a country and visa type to continue.</p>
          )}
        </div>

       
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedCountry || !selectedVisa}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 p-5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <span className="text-lg font-semibold">
            Continue Application
          </span>

          <FaLongArrowAltRight className="text-xl" />
        </button>

        <p className="mt-4 text-center">
          © 2026 GlobePass. Secure, Simple & Trusted.
        </p>
      </div>
    </div>
  );
}
