
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-8">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-2">
            Please login to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
