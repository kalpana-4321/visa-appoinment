"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Clock,
  FileCheck,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Plane,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const destinations = [
  { name: "France", src: "/france.png", days: "3–5 days", type: "Schengen Visa" },
  { name: "United States", src: "/usa1.png", days: "2–4 days", type: "ESTA / B1 / B2" },
  { name: "Dubai (UAE)", src: "/dubai.png", days: "24–48 hrs", type: "Tourist eVisa" },
  { name: "Australia", src: "/austrila3.png", days: "3–5 days", type: "eVisitor / ETA" },
  { name: "India", src: "/india.png", days: "2–4 days", type: "e-Visa" },
  { name: "Japan", src: "/japan2.png", days: "4–6 days", type: "eVisa" },
  { name: "Germany", src: "/germany.png", days: "3–5 days", type: "Schengen Visa" },
  { name: "Italy", src: "/italy.png", days: "3–5 days", type: "Schengen Visa" },
];

const visaCategories = [
  {
    title: "Tourist Visa",
    icon: Plane,
    desc: "For holidays, family visits, sightseeing, and short-term recreational leisure travel.",
    duration: "Up to 90 days",
    validity: "6 months to 1 year",
    target: "Tourist Visa",
  },
  {
    title: "Business Visa",
    icon: Briefcase,
    desc: "For corporate conferences, trade meetings, partner negotiations, and investor visits.",
    duration: "30 to 90 days",
    validity: "Multiple entry available",
    target: "Business Visa",
  },
  {
    title: "Student Visa",
    icon: GraduationCap,
    desc: "For university admissions, exchange semesters, language academies, and vocational courses.",
    duration: "Full course duration",
    validity: "Extendable with enrollment",
    target: "Student Visa",
  },
];

const faqs = [
  {
    question: "How long does the digital visa application process take?",
    answer:
      "Most digital visas (eVisas and electronic travel authorizations) are processed and approved within 24 to 72 business hours depending on the destination country's immigration department.",
  },
  {
    question: "Do I need to visit an embassy or consulate in person?",
    answer:
      "For majority of eVisa eligible countries (including Australia, UAE, India, and electronic Schengen/ESTA entries), the entire process is 100% digital. No embassy appointments or physical passport submissions are required.",
  },
  {
    question: "How do I receive my approved visa?",
    answer:
      "Once approved by immigration authorities, your official electronic visa document is immediately sent as a secure PDF to your registered email address and updated in your GlobePass tracking portal.",
  },
  {
    question: "Is my personal data and passport information secure?",
    answer:
      "Yes. GlobePass utilizes 256-bit SSL encryption, SOC-2 compliant secure document pipelines, and does not store unencrypted biometric or financial details.",
  },
];

export default function Home() {
  const router = useRouter();
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold tracking-wide text-blue-600 mb-3">
              Trusted Worldwide Visa Facilitation
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
              Apply for your visa{" "}
              <span className="block text-blue-600">Fast, Simple & Secure</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
              Skip agency queues, avoid paperwork headaches, and submit in minutes. Receive your official travel visa delivered directly to your email.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors btn-press"
              >
                <span>Start Application</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setEligibilityOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors btn-press"
              >
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>Instant Eligibility Check</span>
              </button>
            </div>

            {/* Credibility statement - no badges */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">200,000+ Visas Processed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>99.4% Approval Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY & TRUST MARKS */}
        <section className="bg-slate-50 border-b border-slate-200/80 py-8">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
              Bank-grade security & verified global payment methods
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80">
              <img src="/ssl.png" alt="SSL Secure" className="h-6 w-auto object-contain" />
              <img src="/visa.png" alt="Visa" className="h-6 w-auto object-contain" />
              <img src="/mastercard.png" alt="Mastercard" className="h-6 w-auto object-contain" />
              <img src="/stripe.png" alt="Stripe" className="h-6 w-auto object-contain" />
              <img src="/norton.png" alt="Norton Secured" className="h-6 w-auto object-contain" />
              <img src="/tata.png" alt="Tata" className="h-6 w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* DESTINATIONS SECTION */}
        <section id="countries" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Explore Destinations
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Choose Your Destination
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Discover visa processing times and eligibility requirements for popular global destinations.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {destinations.map((dest) => (
                <div
                  key={dest.name}
                  onClick={() => router.push(`/apply?country=${encodeURIComponent(dest.name)}`)}
                  className="group interactive-card cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-between"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 p-1.5 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <img
                      src={dest.src}
                      alt={dest.name}
                      className="h-16 w-16 rounded-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{dest.type}</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      Average {dest.days}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>Apply for {dest.name}</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <span>View all supported destinations and visa categories</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* VISA TYPES SECTION */}
        <section id="visa-types" className="py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Visa Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Select by Purpose of Travel
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Whether for tourism, business meetings, or international academic studies, we streamline your application.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {visaCategories.map((visa) => {
                const IconComponent = visa.icon;
                return (
                  <div
                    key={visa.title}
                    className="rounded-2xl border border-slate-200 bg-white p-7 interactive-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <IconComponent className="h-6 w-6" />
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-slate-900">
                        {visa.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {visa.desc}
                      </p>

                      <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Stay Duration:</span>
                          <span className="font-semibold text-slate-800">{visa.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Validity:</span>
                          <span className="font-semibold text-slate-800">{visa.validity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 pt-4">
                      <Link
                        href={`/apply?visaType=${encodeURIComponent(visa.target)}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors btn-press"
                      >
                        <span>Apply for {visa.title}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Simple 3-Step Process
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How GlobePass Works
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                We eliminated confusing embassy paper forms and replaced them with an intuitive 3-step digital journey.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-lg">
                  1
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Select Destination & Purpose
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Choose your destination country, visa category, and check instant eligibility criteria before starting.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-lg">
                  2
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Fill Details & Upload Files
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Provide your passport data and upload clear photos or PDF copies. Our automated checker validates formatting immediately.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-lg">
                  3
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Receive Visa in Your Inbox
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Government immigration clears your application and we deliver the official authorization document straight to your email.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm"
              >
                <span>Get Started in 5 Minutes</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING & GUARANTEE SECTION */}
        <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Transparent Pricing
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Clear Fees, Zero Hidden Costs
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Know exactly what you pay before submitting. All fees include official government embassy fee and 24/7 dedicated assistance.
              </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 interactive-card">
                <h3 className="text-xl font-bold text-slate-900">Standard Processing</h3>
                <p className="text-sm text-slate-500 mt-1">Recommended for standard trips planned 2+ weeks ahead</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$39</span>
                  <span className="text-sm text-slate-500">+ government fee</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>3 to 5 business days processing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Complete document pre-check</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Live application status tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Full money-back processing guarantee</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/apply"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors btn-press"
                  >
                    <span>Choose Standard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 interactive-card relative shadow-md shadow-blue-600/5">
                <h3 className="text-xl font-bold text-slate-900">Express Priority</h3>
                <p className="text-sm text-slate-500 mt-1">For urgent departures and upcoming travel dates</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-blue-600">$79</span>
                  <span className="text-sm text-slate-500">+ government fee</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Priority expedited 24-hr queue</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Dedicated immigration specialist review</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>SMS and WhatsApp instant updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Free re-application if dates change</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/apply"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors btn-press shadow-sm"
                  >
                    <span>Choose Express</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-blue-600">
                Got Questions?
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-slate-200 bg-white transition-all overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Instant Eligibility Modal */}
      {eligibilityOpen && (
        <EligibilityModal
          isOpen={eligibilityOpen}
          onClose={() => setEligibilityOpen(false)}
        />
      )}
    </div>
  );
}
