"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white pt-14 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Globe className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-slate-900">
                Globe<span className="text-blue-600">Pass</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
              Global online visa assistance and appointment booking platform. Streamlining international travel clearance for travelers and enterprises worldwide.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
                Protected Payments
              </p>
              <div className="flex flex-wrap items-center gap-4 grayscale opacity-70">
                <img src="/visa.png" alt="Visa" className="h-4 w-auto object-contain" />
                <img src="/mastercard.png" alt="Mastercard" className="h-4 w-auto object-contain" />
                <img src="/stripe.png" alt="Stripe" className="h-4 w-auto object-contain" />
                <img src="/ssl.png" alt="SSL Encrypted" className="h-4 w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3.5">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/apply?country=Australia" className="hover:text-blue-600 transition-colors">
                  Australia Visa
                </Link>
              </li>
              <li>
                <Link href="/apply?country=Japan" className="hover:text-blue-600 transition-colors">
                  Japan e-Visa
                </Link>
              </li>
              <li>
                <Link href="/apply?country=United%20Kingdom" className="hover:text-blue-600 transition-colors">
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/apply?country=United%20States" className="hover:text-blue-600 transition-colors">
                  United States ESTA/B1
                </Link>
              </li>
              <li>
                <Link href="/apply?country=Dubai" className="hover:text-blue-600 transition-colors">
                  Dubai (UAE) Entry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3.5">
              Services & Portal
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/apply" className="hover:text-blue-600 transition-colors">
                  Start New Application
                </Link>
              </li>
              <li>
                <Link href="/application" className="hover:text-blue-600 transition-colors">
                  Applicant Details Form
                </Link>
              </li>
              <li>
                <Link href="/travel" className="hover:text-blue-600 transition-colors">
                  Travel Itinerary Form
                </Link>
              </li>
              <li>
                <Link href="/document" className="hover:text-blue-600 transition-colors">
                  Document Upload Center
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-600 transition-colors">
                  Client Portal Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3.5">
              Account & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/login" className="hover:text-blue-600 transition-colors">
                  Account Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-blue-600 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-blue-600 transition-colors">
                  Password Recovery
                </Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 GlobePass Inc. All rights reserved. Registered Travel Facilitation Provider.</p>
          <p>Bank-grade 256-bit SSL encrypted data transmission.</p>
        </div>
      </div>
    </footer>
  );
}
