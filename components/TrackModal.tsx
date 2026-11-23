"use client";

import { useState, useEffect } from "react";
import { X, Search, CheckCircle2, Clock, FileText, AlertCircle } from "lucide-react";

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef?: string;
}

interface ApplicationData {
  reference_id: string;
  full_name: string;
  destination: string;
  visa_type: string;
  status: string;
  created_at: string;
}

interface DocumentData {
  id: number;
  document_type: string;
  file_name: string;
  file_size: string;
  storage_url?: string;
}

export default function TrackModal({ isOpen, onClose, initialRef }: TrackModalProps) {
  const [refId, setRefId] = useState(initialRef || "");
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [error, setError] = useState("");

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setApplication(null);
    setDocuments([]);

    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (data.success && data.application) {
        setApplication(data.application);
        setDocuments(data.documents || []);
      } else {
        setError(data.error || "Application not found. Try searching for sample 'GP-84920'.");
      }
    } catch {
      setError("Network error connecting to Neon database. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialRef) {
      setRefId(initialRef);
      performSearch(initialRef);
    }
  }, [isOpen, initialRef]);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(refId);
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
          Enter your GlobePass Application Reference ID (e.g. <span className="font-mono text-slate-700">GP-84920</span>) to check live status from Neon DB.
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
              {loading ? "Checking..." : "Track"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {application && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Application Reference
                </p>
                <p className="font-mono text-sm font-bold text-slate-800">
                  {application.reference_id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Live Status
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  {application.status}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-700 space-y-1">
              <p>Applicant: <span className="font-semibold text-slate-900">{application.full_name}</span></p>
              <p>Destination: <span className="font-semibold text-slate-900">{application.destination}</span> — {application.visa_type}</p>
              <p>Submitted: <span className="font-semibold text-slate-900">{new Date(application.created_at).toLocaleDateString()}</span></p>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Application Logged in Neon Postgres
                  </p>
                  <p className="text-xs text-slate-500">Record verified in database</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Embassy Verification & Document Review
                  </p>
                  <p className="text-xs text-slate-500">{application.status} • Est. completion 48 hrs</p>
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

            {documents.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Uploaded Documents ({documents.length})
                </p>
                <div className="space-y-1.5">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs text-slate-700"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="truncate font-medium">{doc.file_name}</span>
                        <span className="text-slate-400">({doc.file_size})</span>
                      </div>
                      {doc.storage_url ? (
                        <a
                          href={doc.storage_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium shrink-0 ml-2"
                        >
                          View File
                        </a>
                      ) : (
                        <span className="text-slate-400 shrink-0 ml-2">Stored</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
