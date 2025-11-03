import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
              {/* Title */}
              <div className="bg-indigo-600 text-white text-center font-semibold text-lg py-3">
                Confirm Submission
              </div>

              {/* Content */}
              <div className="p-5 text-center text-gray-700 dark:text-gray-200 text-sm">
                Are you sure you want to submit the data?
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 pb-4">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-1.5 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
