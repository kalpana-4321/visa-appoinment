"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Check,
  X,
  FileCheck2,
  ShieldCheck,
  AlertCircle,
  Download,
} from "lucide-react";

interface UploadedFile {
  name: string;
  size: string;
}

function DocumentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const country = searchParams.get("country") || "Australia";
  const visaType = searchParams.get("visaType") || "Tourist Visa";
  const applicantName = searchParams.get("name") || "Kaladevi Rishidev";

  // Uploaded files state
  const [passportFile, setPassportFile] = useState<UploadedFile | null>({
    name: "Kaladevi_Rishidev_Passport.pdf",
    size: "1.2 MB",
  });
  const [photoFile, setPhotoFile] = useState<UploadedFile | null>({
    name: "Passport_Photo_WhiteBg.jpg",
    size: "420 KB",
  });
  const [supportingFiles, setSupportingFiles] = useState<UploadedFile[]>([
    { name: "Bank_Statement_3Months.pdf", size: "2.8 MB" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "passport" | "photo" | "supporting"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    if (type === "passport") {
      setPassportFile({ name: file.name, size: sizeStr });
    } else if (type === "photo") {
      setPhotoFile({ name: file.name, size: sizeStr });
    } else {
      setSupportingFiles((prev) => [...prev, { name: file.name, size: sizeStr }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `GP-${Math.floor(10000 + Math.random() * 90000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
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
            <Link
              href={`/travel?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}`}
              className="hover:text-blue-600 transition-colors"
            >
              Travel Itinerary
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Document Upload</span>
          </nav>

          {isSubmitted ? (
            /* SUBMISSION SUCCESS CARD */
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 sm:p-12 shadow-sm text-center animate-scale-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900">
                Application Successfully Submitted!
              </h1>

              <p className="mt-3 text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Your visa application for <span className="font-bold text-slate-900">{country}</span> has been securely transmitted to the immigration processing queue.
              </p>

              {/* Reference ID box - NO BADGES */}
              <div className="mt-8 mx-auto max-w-md rounded-xl border border-slate-200 bg-slate-50 p-6 text-left">
                <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Application Reference ID
                  </span>
                  <span className="font-mono text-base font-extrabold text-blue-600">
                    {referenceId}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p>• Applicant: <span className="font-semibold text-slate-800">{applicantName}</span></p>
                  <p>• Destination: <span className="font-semibold text-slate-800">{country}</span> ({visaType})</p>
                  <p>• Submission Date: <span className="font-semibold text-slate-800">Nov 23, 2026</span></p>
                  <p>• Status: <span className="font-semibold text-emerald-700">Verification in progress</span></p>
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-500 max-w-md mx-auto">
                A confirmation receipt with your tracking link has been sent to your registered email address. You can also track this anytime on our homepage.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => alert(`Receipt downloaded for reference ${referenceId}`)}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Confirmation Receipt</span>
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm shadow-blue-600/20"
                >
                  <span>Return to Homepage</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* DOCUMENT UPLOAD & SUMMARY VIEW */
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                    Step 3 of 3
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                    Document Upload & Final Review
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload legible color copies of your travel documents.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">Progress: Step 3 (Final)</span>
                </div>
              </div>

              {/* Stepper bar */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="h-2 rounded-full bg-blue-600"></div>
                <div className="h-2 rounded-full bg-blue-600"></div>
                <div className="h-2 rounded-full bg-blue-600"></div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                {/* 1. Passport Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      1. Passport Information Page Copy *
                    </h2>
                    {passportFile && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Must clearly show your photo, full name, passport number, issue and expiry dates. Format: PDF, JPG, PNG (Max 10MB).
                  </p>

                  {passportFile ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{passportFile.name}</p>
                          <p className="text-xs text-slate-400">{passportFile.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPassportFile(null)}
                        className="text-xs text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Remove uploaded passport"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 cursor-pointer transition-colors text-center">
                      <UploadCloud className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-slate-700">Click to select passport file</span>
                      <span className="text-xs text-slate-400 mt-0.5">PDF or High-resolution Image</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "passport")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 2. Passport Photo Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      2. Recent Passport-Style Photograph *
                    </h2>
                    {photoFile && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Color photograph taken against a white background, neutral expression without headgear. Format: JPG, PNG.
                  </p>

                  {photoFile ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{photoFile.name}</p>
                          <p className="text-xs text-slate-400">{photoFile.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPhotoFile(null)}
                        className="text-xs text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Remove uploaded photo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 cursor-pointer transition-colors text-center">
                      <UploadCloud className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-slate-700">Click to select passport photo</span>
                      <span className="text-xs text-slate-400 mt-0.5">JPG or PNG</span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "photo")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 3. Supporting Documents Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      3. Supporting Documents (Optional / Recommended)
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">Bank statements, itinerary, flight reservation</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    {supportingFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-500" />
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{file.name}</p>
                            <p className="text-xs text-slate-400">{file.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSupportingFiles((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-xs text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer transition-colors text-xs font-semibold text-slate-700">
                      <UploadCloud className="h-4 w-4 text-blue-600" />
                      <span>Add another supporting document</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "supporting")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Application Review Summary */}
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h2 className="text-base font-bold text-slate-900 mb-4">
                    Review Application Summary
                  </h2>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-semibold text-slate-900">{applicantName}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Destination & Visa:</span>
                      <span className="font-semibold text-slate-900">{country} — {visaType}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Documents Attached:</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Ready for verification
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Estimated Turnaround:</span>
                      <span className="font-semibold text-slate-900">3 to 5 business days</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  By clicking Submit Application, you certify that all information submitted is true and accurate according to your original passport and official documentation.
                </p>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/travel?country=${encodeURIComponent(country)}&visaType=${encodeURIComponent(visaType)}&name=${encodeURIComponent(applicantName)}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting || !passportFile || !photoFile}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-press"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Application...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function DocumentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <DocumentContent />
    </Suspense>
  );
}
