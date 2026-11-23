"use client";

import { useState, useEffect, Suspense } from "react";
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
  Download,
  AlertCircle,
} from "lucide-react";

interface UploadedDoc {
  fileName: string;
  fileSize: string;
  mimeType: string;
  documentType: string;
  fileData?: string;
  uploaded?: boolean;
}

function DocumentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const countryParam = searchParams.get("country") || "Australia";
  const visaTypeParam = searchParams.get("visaType") || "Tourist Visa";

  const [draft, setDraft] = useState<any>({
    fullName: "Kaladevi Rishidev",
    email: "kaladevi@example.com",
    phone: "+977 9800000000",
    dob: "1998-05-14",
    gender: "Female",
    passportNumber: "N12345678",
    nationality: "Nepali",
    destination: countryParam,
    visaType: visaTypeParam,
    departureDate: "2026-12-15",
    returnDate: "2027-01-05",
    purpose: "Holiday and family visit",
    hotelAddress: "Grand Harbour View Hotel, Sydney",
  });

  const [passportDoc, setPassportDoc] = useState<UploadedDoc | null>(null);
  const [photoDoc, setPhotoDoc] = useState<UploadedDoc | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<UploadedDoc[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gp_app_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setDraft((prev: any) => ({
          ...prev,
          ...parsed,
          destination: parsed.destination || countryParam,
          visaType: parsed.visaType || visaTypeParam,
        }));
      }
    } catch {}
  }, [countryParam, visaTypeParam]);

  // Convert File to Base64 and upload to API
  const processAndUploadFile = async (
    file: File,
    docType: "passport" | "photo" | "supporting"
  ): Promise<UploadedDoc | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const sizeFormatted = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(1)} KB`;

        const docObj: UploadedDoc = {
          fileName: file.name,
          fileSize: sizeFormatted,
          mimeType: file.type || "application/octet-stream",
          documentType: docType,
          fileData: base64Data,
          uploaded: true,
        };

        resolve(docObj);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: "passport" | "photo" | "supporting"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const uploaded = await processAndUploadFile(file, docType);
    if (!uploaded) return;

    if (docType === "passport") {
      setPassportDoc(uploaded);
    } else if (docType === "photo") {
      setPhotoDoc(uploaded);
    } else {
      setSupportingDocs((prev) => [...prev, uploaded]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const docsPayload: UploadedDoc[] = [];
      if (passportDoc) docsPayload.push(passportDoc);
      if (photoDoc) docsPayload.push(photoDoc);
      supportingDocs.forEach((d) => docsPayload.push(d));

      const payload = {
        fullName: draft.fullName,
        email: draft.email,
        phone: draft.phone,
        dob: draft.dob,
        gender: draft.gender,
        passportNumber: draft.passportNumber,
        nationality: draft.nationality,
        passportIssueDate: draft.issueDate,
        passportExpiryDate: draft.expiryDate,
        destination: draft.destination,
        visaType: draft.visaType,
        departureDate: draft.departureDate,
        returnDate: draft.returnDate,
        purpose: draft.purpose,
        hotelAddress: draft.hotelAddress,
        documents: docsPayload,
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.referenceId) {
        setReferenceId(data.referenceId);
        setIsSubmitted(true);
        try {
          localStorage.removeItem("gp_app_draft");
        } catch {}
      } else {
        setErrorMessage(data.error || "Failed to submit application to database.");
      }
    } catch {
      setErrorMessage("Network error connecting to Neon database. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              href={`/application?country=${encodeURIComponent(draft.destination)}&visaType=${encodeURIComponent(draft.visaType)}`}
              className="hover:text-blue-600 transition-colors"
            >
              Personal Details
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link
              href={`/travel?country=${encodeURIComponent(draft.destination)}&visaType=${encodeURIComponent(draft.visaType)}`}
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
                Your visa application for <span className="font-bold text-slate-900">{draft.destination}</span> has been stored in Neon PostgreSQL and assigned to immigration processing.
              </p>

              {/* Reference ID box - NO BADGES */}
              <div className="mt-8 mx-auto max-w-md rounded-xl border border-slate-200 bg-slate-50 p-6 text-left space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Application Reference ID
                  </span>
                  <span className="font-mono text-base font-extrabold text-blue-600">
                    {referenceId}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p>• Applicant: <span className="font-semibold text-slate-800">{draft.fullName}</span></p>
                  <p>• Destination: <span className="font-semibold text-slate-800">{draft.destination}</span> ({draft.visaType})</p>
                  <p>• Passport Number: <span className="font-semibold text-slate-800">{draft.passportNumber}</span></p>
                  <p>• Documents Stored: <span className="font-semibold text-emerald-700">Persisted in Neon DB</span></p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm shadow-blue-600/20"
                >
                  <span>View in My Applications</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                >
                  <span>Return to Homepage</span>
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
                    Upload your passport page and photo to attach to your Neon application record.
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

              {errorMessage && (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                {/* 1. Passport Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      1. Passport Information Page Copy *
                    </h2>
                    {passportDoc && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Attached
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Must clearly show your photo, full name, passport number, issue and expiry dates.
                  </p>

                  {passportDoc ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{passportDoc.fileName}</p>
                          <p className="text-xs text-slate-400">{passportDoc.fileSize}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPassportDoc(null)}
                        className="text-xs text-slate-400 hover:text-rose-600 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 cursor-pointer transition-colors text-center">
                      <UploadCloud className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-slate-700">Click to upload passport file</span>
                      <span className="text-xs text-slate-400 mt-0.5">PDF, JPG, or PNG (stored in Neon DB)</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, "passport")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 2. Passport Photo Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      2. Passport-Style Photograph *
                    </h2>
                    {photoDoc && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Attached
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Color photograph taken against a light background with neutral expression.
                  </p>

                  {photoDoc ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{photoDoc.fileName}</p>
                          <p className="text-xs text-slate-400">{photoDoc.fileSize}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPhotoDoc(null)}
                        className="text-xs text-slate-400 hover:text-rose-600 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 cursor-pointer transition-colors text-center">
                      <UploadCloud className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-slate-700">Click to upload passport photo</span>
                      <span className="text-xs text-slate-400 mt-0.5">JPG or PNG image</span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, "photo")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 3. Supporting Documents Upload Area */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-900">
                      3. Supporting Documents (Optional)
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">Bank statements, return flight ticket</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    {supportingDocs.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-500" />
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{file.fileName}</p>
                            <p className="text-xs text-slate-400">{file.fileSize}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSupportingDocs((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-xs text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer transition-colors text-xs font-semibold text-slate-700">
                      <UploadCloud className="h-4 w-4 text-blue-600" />
                      <span>Attach additional document</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, "supporting")}
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
                      <span className="font-semibold text-slate-900">{draft.fullName}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Destination & Visa:</span>
                      <span className="font-semibold text-slate-900">{draft.destination} — {draft.visaType}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Passport Number:</span>
                      <span className="font-semibold text-slate-900">{draft.passportNumber}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Travel Window:</span>
                      <span className="font-semibold text-slate-900">{draft.departureDate} to {draft.returnDate}</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Database Destination:</span>
                      <span className="font-semibold text-emerald-700">Neon PostgreSQL (Branch: production)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/travel?country=${encodeURIComponent(draft.destination)}&visaType=${encodeURIComponent(draft.visaType)}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 transition-all btn-press"
                  >
                    {isSubmitting ? (
                      <span>Saving to Neon Database...</span>
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
