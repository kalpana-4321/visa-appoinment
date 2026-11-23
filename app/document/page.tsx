
import {
  FaRegFilePdf,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";

import { IoIosArrowRoundBack } from "react-icons/io";

export default function DocumentUpload() {
  return (
    <div className="min-h-screen bg-[#E8DCC8] p-5 pb-20">
      <div className="mx-auto min-h-[1500px] w-full max-w-6xl rounded-3xl bg-white p-8">

       
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-blue-600">
              DOCUMENT UPLOAD
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#172B4D]">
              Upload Your Documents
            </h1>

            <p className="mt-2 text-gray-500">
              Upload the required documents to complete your visa application.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Step 3 of 4
          </span>
        </div>

        
        <div className="mt-8 flex gap-3">
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-blue-600"></div>
          <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
        </div>

        
        <div className="mt-10 rounded-2xl border border-gray-200 p-7">
          <h2 className="text-xl font-bold text-[#172B4D]">
            Required Documents
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Upload clear and readable copies of your documents.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">

           
            <div className="rounded-xl border border-gray-300 p-6">
              <FaRegFilePdf className="text-2xl text-blue-600" />

              <h3 className="mt-4 font-semibold text-[#172B4D]">
                Passport Copy
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Upload your valid passport copy.
              </p>

              <label className="mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
                <FaCloudUploadAlt className="text-3xl text-gray-400" />

                <span className="mt-3 text-sm font-medium text-gray-600">
                  Click to upload passport
                </span>

                <span className="mt-1 text-xs text-gray-400">
                  PDF, JPG or PNG
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </label>
            </div>

            
            <div className="rounded-xl border border-gray-300 p-6">
              <FaRegFilePdf className="text-2xl text-blue-600" />

              <h3 className="mt-4 font-semibold text-[#172B4D]">
                Passport Size Photo
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Upload your recent passport-size photograph.
              </p>

              <label className="mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
                <FaCloudUploadAlt className="text-3xl text-gray-400" />

                <span className="mt-3 text-sm font-medium text-gray-600">
                  Click to upload photo
                </span>

                <span className="mt-1 text-xs text-gray-400">
                  JPG or PNG
                </span>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                />
              </label>
            </div>

           
            <div className="rounded-xl border border-gray-300 p-6 md:col-span-2">
              <FaFileAlt className="text-2xl text-blue-600" />

              <h3 className="mt-4 font-semibold text-[#172B4D]">
                Supporting Documents
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Upload additional documents such as bank statements,
                invitation letters, or other required documents.
              </p>

              <label className="mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-500">
                <FaCloudUploadAlt className="text-3xl text-gray-400" />

                <span className="mt-3 text-sm font-medium text-gray-600">
                  Click to upload supporting documents
                </span>

                <span className="mt-1 text-xs text-gray-400">
                  PDF, JPG or PNG
                </span>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

       
        <div className="mt-8 rounded-2xl border border-gray-200 p-7">
          <h2 className="text-xl font-bold text-[#172B4D]">
            Application Summary
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Review your application information before submission.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">
                Personal Information
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                <FaCheckCircle /> Completed
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">
                Travel Information
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                <FaCheckCircle /> Completed
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Document Upload
              </span>

              <span className="text-sm font-medium text-orange-500">
                Pending
              </span>
            </div>
          </div>
        </div>

        
        <div className="mt-8 rounded-2xl border border-gray-200 p-7">
          <h2 className="text-xl font-bold text-[#172B4D]">
            Application Status
          </h2>

          <div className="mt-5 flex items-center gap-3 rounded-xl bg-orange-50 p-5">
            <div className="h-3 w-3 rounded-full bg-orange-500"></div>

            <div>
              <p className="font-semibold text-orange-700">
                Not Submitted
              </p>

              <p className="mt-1 text-sm text-orange-600">
                Your application is waiting for document upload and submission.
              </p>
            </div>
          </div>
        </div>

        
        <div className="mt-10 flex items-center justify-between">
          <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50">
            <IoIosArrowRoundBack className="text-xl" />
            Previous
          </button>

          <button className="rounded-xl bg-[#172B4D] px-7 py-3 font-semibold text-white hover:bg-blue-900">
            Submit Application
          </button>
        </div>

       
        <p className="mt-16 text-center text-sm text-gray-400">
          © 2026 GlobePass. All rights reserved.
        </p>

      </div>
    </div>
  );
}
