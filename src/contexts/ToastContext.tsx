import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// ✅ Toast type definitions
type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000); // auto dismiss after 3s
    },
    [removeToast]
  );

  const toast: ToastContextType = {
    success: (msg) => showToast(msg, "success"),
    error: (msg) => showToast(msg, "error"),
    warning: (msg) => showToast(msg, "warning"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* 🔥 Toast Portal */}
      {createPortal(
        <div className="fixed top-5 right-5 z-50 space-y-3">
          <AnimatePresence>
            {toasts.map(({ id, message, type }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg w-72 font-medium 
                  ${
                    type === "success"
                      ? "bg-green-600 text-white"
                      : type === "error"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
              >
                {type === "success" && <CheckCircle className="w-5 h-5" />}
                {type === "error" && <XCircle className="w-5 h-5" />}
                {type === "warning" && <AlertTriangle className="w-5 h-5" />}
                <span className="text-sm">{message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

// ✅ Custom hook
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
