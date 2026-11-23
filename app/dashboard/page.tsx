"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  Globe,
  ArrowRight,
  Search,
  UserCheck,
} from "lucide-react";
import TrackModal from "@/components/TrackModal";

interface Application {
  id: number;
  reference_id: string;
  full_name: string;
  email: string;
  destination: string;
  visa_type: string;
  departure_date: string;
  return_date: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; fullName: string; email: string } | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackRef, setTrackRef] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (meData.success && meData.user) {
          setUser(meData.user);
        }

        const appRes = await fetch("/api/applications");
        const appData = await appRes.json();
        if (appData.success && Array.isArray(appData.applications)) {
          setApplications(appData.applications);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                  Client Portal
                </p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {user ? `Welcome back, ${user.fullName}` : "My Visa Applications"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  {user ? user.email : "Track and manage your international visa filings in Neon PostgreSQL."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/apply"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm shadow-blue-600/20"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Application</span>
                </Link>
              </div>
            </div>

            {/* Application List */}
            <div className="mt-10">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Active & Past Applications
              </h2>

              {loading ? (
                <div className="py-16 text-center text-sm text-slate-500">
                  Connecting to Neon Database...
                </div>
              ) : applications.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <FileText className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No Applications Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You haven't submitted any visa applications yet. Start your first application in less than 5 minutes.
                  </p>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <span>Start Application</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-slate-100">
                  {applications.map((app) => (
                    <div
                      key={app.id || app.reference_id}
                      className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors hover:bg-slate-50/50 rounded-xl px-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-extrabold text-blue-600">
                            {app.reference_id}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {app.destination}
                          </span>
                          <span className="text-xs text-slate-500">
                            • {app.visa_type}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500">
                          Applicant: <span className="font-medium text-slate-700">{app.full_name}</span>
                          {app.departure_date && ` • Travel: ${app.departure_date}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-medium">Status</p>
                          <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-emerald-600" />
                            <span>{app.status || "Under Review"}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setTrackRef(app.reference_id)}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors btn-press cursor-pointer"
                        >
                          <Search className="h-3.5 w-3.5 text-slate-400" />
                          <span>Track</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {trackRef && (
        <TrackModal isOpen={!!trackRef} onClose={() => setTrackRef(null)} initialRef={trackRef} />
      )}
    </div>
  );
}
