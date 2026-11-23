import { IoIosArrowRoundForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";

export default function Application() {
  return (
    <div className="min-h-screen bg-[#E8DCC8] p-5 pb-20">

     
      <div className="mx-auto min-h-[1200px] w-full max-w-6xl rounded-3xl bg-white p-8">

       
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#172B4D]">
            Personal Information
          </h1>

          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-blue-700">
            Step 1 of 4
          </button>
        </div>

       
        <p className="mt-1 text-gray-500">
          Please fill in your personal information.
        </p>

        
        <div className="mt-6 flex w-full gap-2">
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
        </div>

        
        <div className="mt-6 rounded-xl border border-gray-300 bg-white p-5">

          <div className="flex items-center gap-2">
            <FaRegUser className="text-blue-600" />
            <p className="font-semibold text-gray-800">
              Personal Details
            </p>
          </div>

          <div className="mt-5 space-y-4">

           
            <div>
              <label className="text-sm text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
              />
            </div>

           
            <div>
              <label className="text-sm text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
              />
            </div>

           
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm text-gray-400">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Gender
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400">
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

            </div>

           
            <div>
              <label className="text-sm text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
              />
            </div>

          </div>
        </div>

       
        <div className="mt-5 rounded-xl border border-gray-300 bg-white p-5">

          <h2 className="font-semibold text-gray-800">
            Passport Details
          </h2>

          <div className="mt-5 space-y-4">

           
            <div>
              <label className="text-sm text-gray-400">
                Passport Number
              </label>
              <input
                type="text"
                placeholder="Enter passport number"
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
              />
            </div>

           
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm text-gray-400">
                  Nationality
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400">
                  <option value="">Select nationality</option>
                  <option>Nepali</option>
                  <option>Indian</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Passport Type
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400">
                  <option value="">Select passport type</option>
                  <option>Ordinary</option>
                  <option>Official</option>
                  <option>Diplomatic</option>
                </select>
              </div>

            </div>

            
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm text-gray-400">
                  Issue Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400"
                />
              </div>

            </div>
            
          </div>
        </div>
<h1 className="mt-5 text-gray-400">Step 1 of 4</h1>
 <div className="mt-6 flex justify-end">
  <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-white">
    Next Step
    <IoIosArrowRoundForward size={22} />
  </button>
</div>

<div className="mt-10 border-t border-gray-200 pt-5 text-center">
  <p className="text-sm text-gray-400">
    © 2026 GlobePass. All rights reserved.
  </p>
</div>
      </div>
     
    </div>
  );
}
