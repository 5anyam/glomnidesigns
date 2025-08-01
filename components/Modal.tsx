import React, { useRef, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-gray-300 bg-opacity-70 transition-all">
      <div
        ref={ref}
        className="bg-white w-full max-w-md mx-2 rounded-2xl shadow-2xl relative p-0 overflow-auto max-h-[90vh] animate-fade-in-up"
      >
        {children}
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-[#3a3ad9] text-lg font-bold"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
