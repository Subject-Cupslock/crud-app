import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-neutral-400 hover:text-black transition cursor-pointer"
          aria-label="Закрыть"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};
