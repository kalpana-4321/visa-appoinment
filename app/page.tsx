
"use client";

import { useRouter } from "next/navigation";

import {
  GoArrowRight,
  GoGlobe,
  GoPerson,
  GoShieldCheck,
} from "react-icons/go";

const flags = [
  { src: "/france.png", alt: "France" },
  { src: "/usa1.png", alt: "USA" },
  { src: "/dubai.png", alt: "Dubai" },
  { src: "/austrila3.png", alt: "Australia" },
  { src: "/india.png", alt: "India" },
  { src: "/japan2.png", alt: "Japan" },
  { src: "/corsica.png", alt: "Corsica" },
  { src: "/germany.png", alt: "Germany" },
  { src: "/italy.png", alt: "Italy" },
];

export default function Home() {
  const router = useRouter();

  const handleStartApplication = () => {
    router.push("/apply");
     
  };
  

  return (
    <main className="min-h-screen bg-[#E8DCC8] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto max-w-[1440px] rounded-3xl bg-white px-5 py-6 shadow-sm sm:px-8 lg:px-12">

        
        <nav className="flex flex-col gap-5 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between">

          
          <p className="flex items-center gap-2 whitespace-nowrap text-2xl font-extrabold tracking-tight text-[#172B4D]">
            <GoGlobe size={30} className="text-blue-700" />
            Globe<span className="text-blue-700">Pass</span>
          </p>

         
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium text-gray-600">
            <a href="#countries" className="transition hover:text-blue-700">
              Countries
            </a>
            <a href="#visa-types" className="transition hover:text-blue-700">
              Visa Types
            </a>
            <a href="#how-it-works" className="transition hover:text-blue-700">
              How It Works
            </a>
            <a href="#pricing" className="transition hover:text-blue-700">
              Pricing
            </a>
            <a href="#track" className="transition hover:text-blue-700">
              Track Application
            </a>
          </div>

         
          <div className="flex items-center justify-center gap-3">
            <button className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
              Login
            </button>

            <button
              onClick={handleStartApplication}
              className="whitespace-nowrap rounded-full bg-[#172B4D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Start Application
            </button>
          </div>
        </nav>

       
        <section className="mx-auto flex max-w-4xl flex-col items-center pt-14 text-center sm:pt-20">
          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Trusted by 180,000+ Travellers Worldwide
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-[#172B4D] sm:text-5xl md:text-6xl">
            Apply for your visa
            <span className="block text-blue-700">
              Fast, Simple & Secure
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            Skip agents, avoid paperwork, and apply in minutes.
            <br className="hidden sm:block" />
            Get your visa delivered directly to your email.
          </p>

         
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartApplication}
              className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800"
            >
              Get Started
              <GoArrowRight size={20} />
            </button>

            <span className="px-1 text-sm font-medium text-gray-400">
              OR
            </span>

            <button className="rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-semibold text-gray-700 transition hover:border-gray-500 hover:bg-gray-50">
              Instant Eligibility Check
            </button>
          </div>

         
          <p className="mt-7 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">
              200,000+ Visas Processed
            </span>
            <span className="mx-2 text-gray-300">•</span>
            Money-back Guarantee
          </p>
        </section>

       
        <section className="mx-auto mt-12 max-w-3xl border-y border-gray-100 py-6">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Secure Payments · Trusted Protection
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:gap-x-10">
            <img src="/ssl.png" alt="SSL" className="h-6 w-auto object-contain" />
            <img src="/mastercard.png" alt="Mastercard" className="h-6 w-auto object-contain" />
            <img src="/norton.png" alt="Norton Secured" className="h-6 w-auto object-contain" />
            <img src="/stripe.png" alt="Stripe" className="h-6 w-auto object-contain" />
            <img src="/visa.png" alt="Visa" className="h-6 w-auto object-contain" />
            <img src="/tata.png" alt="Tata" className="h-6 w-auto object-contain" />
          </div>
        </section>

       
        <section
          id="countries"
          className="mx-auto mt-10 max-w-4xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
            Explore Destinations
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#172B4D] sm:text-3xl">
            Choose Your Destination
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Discover visa options for popular destinations around the world.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            {flags.map((flag) => (
              <div
                key={flag.alt}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full border border-gray-200 bg-white p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <img
                    src={flag.src}
                    alt={flag.alt}
                    className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                  />
                </div>

                <span className="text-xs font-medium text-gray-600">
                  {flag.alt}
                </span>
              </div>
            ))}
          </div>
        </section>

        
        <section
          id="how-it-works"
          className="relative z-10 mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-lg sm:px-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">

           
            <div className="flex items-center gap-3">
              <GoGlobe className="shrink-0 text-gray-800" size={34} />
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">Step 1:</p>
                <p className="text-xs text-gray-600">
                  Tell us where you're traveling
                </p>
              </div>
            </div>

            <GoArrowRight
              className="hidden shrink-0 text-gray-400 sm:block"
              size={24}
            />

           
            <div className="flex items-center gap-3">
              <GoPerson className="shrink-0 text-gray-800" size={34} />
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">Step 2:</p>
                <p className="text-xs text-gray-600">
                  Submit your passport & details
                </p>
              </div>
            </div>

            <GoArrowRight
              className="hidden shrink-0 text-gray-400 sm:block"
              size={24}
            />

           
            <div className="flex items-center gap-3">
              <GoShieldCheck className="shrink-0 text-gray-800" size={34} />
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">Step 3:</p>
                <p className="text-xs text-gray-600">
                  Get your visa, fast & hassle-free
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
