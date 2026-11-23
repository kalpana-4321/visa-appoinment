"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu, X, Search, User, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import TrackModal from "./TrackModal";

interface CurrentUser {
  id: number;
  fullName: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch auth session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-90"
            aria-label="GlobePass Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Globe className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-extrabold text-slate-900">
              Globe<span className="text-blue-600">Pass</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
            aria-label="Main Navigation"
          >
            <Link
              href="/#countries"
              className="transition-colors hover:text-blue-600"
            >
              Destinations
            </Link>
            <Link
              href="/#visa-types"
              className="transition-colors hover:text-blue-600"
            >
              Visa Types
            </Link>
            <Link
              href="/#how-it-works"
              className="transition-colors hover:text-blue-600"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="transition-colors hover:text-blue-600"
            >
              Pricing
            </Link>
            <button
              type="button"
              onClick={() => setTrackModalOpen(true)}
              className="flex items-center gap-1.5 transition-colors hover:text-blue-600 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Track Application</span>
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors btn-press"
                >
                  <LayoutDashboard className="h-4 w-4 text-blue-600" />
                  <span>My Applications</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors btn-press cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>

                <Link
                  href="/apply"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 shadow-sm shadow-blue-600/20 btn-press"
                >
                  <span>New Visa</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 btn-press"
                >
                  <User className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/apply"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 shadow-sm shadow-blue-600/20 btn-press"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setTrackModalOpen(true)}
              className="p-2 text-slate-600 hover:text-blue-600"
              aria-label="Track Application"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-5 space-y-4 animate-slide-up shadow-lg">
            <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700">
              <Link
                href="/#countries"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600"
              >
                Destinations
              </Link>
              <Link
                href="/#visa-types"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600"
              >
                Visa Types
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600"
              >
                How It Works
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600"
              >
                Pricing
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrackModalOpen(true);
                }}
                className="flex items-center gap-2 py-2 text-left hover:text-blue-600"
              >
                <Search className="h-4 w-4" />
                <span>Track Application</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                    <span>My Applications</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700"
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Track Application Modal */}
      {trackModalOpen && (
        <TrackModal isOpen={trackModalOpen} onClose={() => setTrackModalOpen(false)} />
      )}
    </>
  );
}
