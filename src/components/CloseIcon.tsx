// CloseIcon.tsx
import React from "react";

type Props = {
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
};

const CloseIcon: React.FC<Props> = ({ size = 24, color = "currentColor", onClick, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={`cursor-pointer ${className || ""}`}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default CloseIcon;
