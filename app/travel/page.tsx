
import { FaPlane } from "react-icons/fa";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function TravelInformation() {
  return (
    <div className="min-h-screen bg-[#E8DCC8] p-5 pb-20">

      
      <div className="mx-auto min-h-[1200px] w-full max-w-6xl rounded-3xl bg-white p-8">

        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#172B4D]">
            Travel Information
          </h1>

          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-blue-700">
            Step 2 of 4
          </button>
        </div>

        
        <p className="mt-1 text-gray-500">
          Please provide your travel details and accommodation information.
        </p>

       
        <div className="mt-6 flex w-full gap-2">
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
        </div>

       
        <div className="mt-8 rounded-xl border border-gray-300 bg-white p-6">

          <div className="flex items-center gap-2">
            <FaPlane className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">
              Travel Details
            </h2>
          </div>

          <div className="mt-6 space-y-5">

            
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm text-gray-400">
                  Destination Country
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400">
                  <option value="">Select destination country</option>
                  <option>Australia</option>
                  <option>Japan</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Dubai</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Visa Type
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400">
                  <option value="">Select visa type</option>
                  <option>Tourist Visa</option>
                  <option>Business Visa</option>
                  <option>Student Visa</option>
                  <option>Work Visa</option>
                  <option>Transit Visa</option>
                </select>
              </div>

            </div>

           
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm text-gray-400">
                  Travel Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Return Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-400"
                />
              </div>

            </div>

           
            <div>
              <label className="text-sm text-gray-400">
                Purpose of Visit
              </label>
              <textarea
                rows={4}
                placeholder="Please describe the purpose of your visit..."
                className="mt-2 w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
              />
            </div>

          </div>
        </div>

        
        <div className="mt-6 rounded-xl border border-gray-300 bg-white p-6">

          <h2 className="font-semibold text-gray-800">
            Accommodation Details
          </h2>

          <div className="mt-5">

            <label className="text-sm text-gray-400">
              Accommodation Address
            </label>

            <textarea
              rows={4}
              placeholder="Enter hotel name, street address, city and postal code..."
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-500 placeholder:text-gray-400"
            />

          </div>
        </div>

        
        <div className="mt-8 flex items-center justify-between">

          <button className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 text-gray-600 hover:bg-gray-100">
            <IoIosArrowRoundBack size={22} />
            Previous
          </button>

          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
            Next Step
            <IoIosArrowRoundForward size={22} />
          </button>

        </div>

        
        <div className="mt-12 border-t border-gray-200 pt-5 text-center">
          <p className="text-sm text-gray-400">
            © 2026 GlobePass. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
