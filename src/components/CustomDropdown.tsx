import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options: Option[];
  label?: string;
  disabled?: boolean;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string | number) => {
    // 🔹 Create a synthetic React.ChangeEvent to match your handleChange signature
    const syntheticEvent = {
      target: {
        name,
        value: val,
        type: "select-one",
      },
    } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

    onChange(syntheticEvent);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-xs ${className} mx-1`}
      style={{ minWidth: "100px" }}
    >
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`border border-gray-400 dark:border-gray-700 rounded px-2 py-[4px]
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
          cursor-pointer select-none truncate
          ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
          }
          transition-all duration-150`}
      >
        {selectedOption ? selectedOption.label : "-- Select Points--"}
      </div>

      {/* Dropdown Options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 
    border border-gray-400 dark:border-gray-600 rounded shadow-md
    max-h-40 overflow-y-auto
    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
    dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500
    dark:hover:scrollbar-thumb-gray-500"
            style={{
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "rgba(156, 163, 175, 0.7) transparent", // gray-400 thumb
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-2 py-[4px] cursor-pointer truncate 
                  ${
                    value === opt.value
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  } transition-colors duration-150`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
