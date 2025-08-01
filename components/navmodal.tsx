// ExampleWithModalButton.tsx
import React, { useState } from "react";
import Modal from "./Modal"; // adjust the import path as needed
import { ArrowRight } from "lucide-react";

const BrandLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex justify-center items-center font-bold text-2xl text-[#3a3ad9] shadow-brand">
      G
    </div>
    <span className="text-xl font-bold text-[#242878]">Glomni Designs</span>
  </div>
);

const NavbarModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-3 py-2 rounded-full bg-green-600 text-white font-bold shadow hover:bg-green-700 hover:text-white transition"
        onClick={() => setOpen(true)}
      >
        Get Started
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-3 border-b border-gray-100 bg-gray-50">
          <BrandLogo />
        </div>
        {/* Modal Body/Form */}
        <form className="px-7 py-6">
          <h2 className="text-lg font-bold mb-1 text-[#242878]">Submit Your Details</h2>
          <p className="text-gray-700 mb-6 text-sm">
            Looking to do interiors? Let's get started. Fill out the details and get started.
          </p>
          <div className="space-y-4">
            {/* Name Input */}
            <input
              className="w-full border border-gray-200 px-4 py-3 rounded-lg text-base focus:border-[#3a3ad9] focus:outline-none placeholder-gray-500"
              placeholder="Name"
              required
            />
            
            {/* Email Input */}
            <input
              className="w-full border border-gray-200 px-4 py-3 rounded-lg text-base focus:border-[#3a3ad9] focus:outline-none placeholder-gray-500"
              placeholder="Email ID"
              type="email"
              required
            />
            
            {/* Phone Input */}
            <div className="flex">
              <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  🇮🇳 +91
                </span>
              </div>
              <input
                className="flex-1 border border-gray-200 px-4 py-3 rounded-r-lg text-base focus:border-[#3a3ad9] focus:outline-none placeholder-gray-500"
                placeholder="Phone number"
                type="tel"
                required
              />
            </div>
            
            {/* Property Name Input */}
            <input
              className="w-full border border-gray-200 px-4 py-3 rounded-lg text-base focus:border-[#3a3ad9] focus:outline-none placeholder-gray-500"
              placeholder="Property Name"
              required
            />
            
            {/* WhatsApp Updates Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#3a3ad9] bg-gray-100 border-gray-300 rounded focus:ring-[#3a3ad9] focus:ring-2"
                defaultChecked
              />
              <span className="text-sm text-gray-700">
                Send me updates on WhatsApp
              </span>
            </label>
          </div>
          
          {/* Submit Button */}
          <button
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow hover:bg-green-700 hover:text-white transition"
            type="submit"
          >
            Get a Callback <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </form>
      </Modal>
    </>
  );
};

export { Modal, NavbarModal };
