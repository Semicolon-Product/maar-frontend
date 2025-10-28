import { motion, AnimatePresence } from "framer-motion";
import type { IndividualActivity } from "./types/superadminType";

interface DocsModalProps {
  open: boolean;
  onClose: () => void;
  currentActivity?: IndividualActivity | null;
}

const DocsModal: React.FC<DocsModalProps> = ({
  open,
  onClose,
  currentActivity,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Box */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-4xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-700 dark:bg-gray-800 px-4 py-3">
              <h2 className="text-white text-lg font-semibold text-center flex-grow text-ellipsis overflow-hidden whitespace-nowrap mr-8">
                {currentActivity
                  ? `${currentActivity.activity_serial_no}. ${currentActivity.activity_name}`
                  : "Document"}
              </h2>

              <button
                onClick={onClose}
                className="text-white text-xl hover:text-red-400 transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              {currentActivity?.document_url ? (
                <iframe
                  src={currentActivity.document_url}
                  title="Document"
                  className="w-full h-[80vh] border-none rounded-md"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  No document available.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default DocsModal;
