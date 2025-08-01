"use client";

import { useState } from "react";

type Room = "livingRoom" | "kitchen" | "bedroom" | "bathroom" | "dining";

interface FormState {
  livingRoom: number;
  kitchen: number;
  bedroom: number;
  bathroom: number;
  dining: number;
  packageType: string;
  includeFurniture?: boolean;
}

const steps = [
  "Rooms to Design",
  "Design Package", 
  "Additional Options",
  "Estimate & Details",
];

const roomIcons = {
  livingRoom: "🛋️",
  kitchen: "🍳", 
  bedroom: "🛏️",
  bathroom: "🚿",
  dining: "🍽️"
};

export default function MultiStepEstimateForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    livingRoom: 1,
    kitchen: 1,
    bedroom: 1,
    bathroom: 1,
    dining: 1,
    packageType: "",
    includeFurniture: false,
  });

  const handleIncrement = (room: Room) =>
    setForm((prev) => ({ ...prev, [room]: prev[room] + 1 }));

  const handleDecrement = (room: Room) =>
    setForm((prev) => ({ ...prev, [room]: Math.max(1, prev[room] - 1) }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        setForm((prev) => ({
          ...prev,
          [name]: target.checked,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: target.value,
        }));
      }
    } else if (target instanceof HTMLSelectElement) {
      setForm((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const calculateEstimate = () => {
    let pricePerRoom = {
      livingRoom: 200000,
      kitchen: 180000,
      bedroom: 150000,
      bathroom: 120000,
      dining: 160000,
    };
    let base =
      form.livingRoom * pricePerRoom.livingRoom +
      form.kitchen * pricePerRoom.kitchen +
      form.bedroom * pricePerRoom.bedroom +
      form.bathroom * pricePerRoom.bathroom +
      form.dining * pricePerRoom.dining;

    if (form.packageType === "premium") base *= 1.2;
    if (form.packageType === "luxury") base *= 1.5;

    if (form.includeFurniture) base += 100000;

    return base;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Interior Design Cost Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Get your personalized estimate in just a few steps</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
          {/* Premium Stepper */}
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((_, idx) => (
                <div key={idx} className="flex-1 relative">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    idx <= currentStep 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-4 sm:top-5 left-8 sm:left-10 w-full h-0.5 transition-all duration-300 ${
                      idx < currentStep ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-center">
              {steps.map((label, idx) => (
                <div key={label} className={`transition-colors duration-300 ${
                  idx <= currentStep ? "text-indigo-600" : "text-gray-400"
                }`}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] sm:min-h-[300px]">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Which rooms need a makeover?
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Select the number of rooms for each type</p>
                </div>
                
                <div className="grid gap-3">
                  {(["livingRoom", "kitchen", "bedroom", "bathroom", "dining"] as Room[]).map((room) => (
                    <div key={room} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-lg sm:text-xl">{roomIcons[room]}</span>
                          <span className="text-sm sm:text-lg font-semibold text-gray-800 capitalize">
                            {room.replace(/([A-Z])/g, " $1")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrement(room)}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white font-bold text-sm sm:text-lg hover:shadow-md active:scale-95 transition-all duration-200"
                            aria-label={`Decrease ${room}`}
                          >
                            −
                          </button>
                          <span className="w-8 sm:w-10 text-center text-sm sm:text-lg font-bold text-indigo-600 bg-indigo-50 rounded px-1 py-1">
                            {form[room]}
                          </span>
                          <button
                            onClick={() => handleIncrement(room)}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold text-sm sm:text-lg hover:shadow-md active:scale-95 transition-all duration-200"
                            aria-label={`Increase ${room}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Choose Your Design Package
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Select the level of luxury you desire</p>
                </div>

                <div className="grid gap-4">
                  {["basic", "premium", "luxury"].map((pkg) => (
                    <label key={pkg} className="cursor-pointer">
                      <input
                        type="radio"
                        name="packageType"
                        value={pkg}
                        checked={form.packageType === pkg}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        form.packageType === pkg
                          ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 capitalize">{pkg} Package</h3>
                            <p className="text-sm text-gray-600">
                              {pkg === "basic" && "Essential design elements"}
                              {pkg === "premium" && "Enhanced with premium finishes"}
                              {pkg === "luxury" && "Ultra-premium with custom details"}
                            </p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 ${
                            form.packageType === pkg
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-gray-300"
                          }`}>
                            {form.packageType === pkg && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Additional Services
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Enhance your experience with premium add-ons</p>
                </div>

                <label className="cursor-pointer block">
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    form.includeFurniture
                      ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}>
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        name="includeFurniture"
                        checked={!!form.includeFurniture}
                        onChange={handleChange}
                        className="w-6 h-6 text-indigo-600 rounded mt-1"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">🪑 Furniture Selection Service</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Our experts will curate and source premium furniture pieces that perfectly complement your design
                        </p>
                        <div className="text-indigo-600 font-semibold mt-2">+ ₹1,00,000</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Your Custom Estimate
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Here's your personalized interior design quote</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 sm:p-8 space-y-4">
                  <div className="grid gap-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Selected Rooms:</span>
                      <span className="text-gray-900">
                        {(["livingRoom", "kitchen", "bedroom", "bathroom", "dining"] as Room[]).map(
                          (room, i) => (
                            <span key={room}>
                              {room.replace(/([A-Z])/g, " $1")}: {form[room]}
                              {i < 4 ? ", " : ""}
                            </span>
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Design Package:</span>
                      <span className="text-gray-900 capitalize">
                        {form.packageType || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Furniture Service:</span>
                      <span className="text-gray-900">{form.includeFurniture ? "Yes" : "No"}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl sm:text-2xl font-bold text-gray-800">Total Estimate:</span>
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{calculateEstimate().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200">
                  🎨 Request Detailed Proposal
                </button>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 gap-4">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              className="bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all duration-200 w-full sm:w-auto"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={currentStep === steps.length - 1}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
