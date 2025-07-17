import React, { useEffect } from "react";
import { ToastType } from "../hooks/useToast";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
}) => {
  const getToastStyles = () => {
    const baseStyles = "px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 max-w-sm";
    
    switch (type) {
      case "success":
        return `${baseStyles} bg-green-500`;
      case "error":
        return `${baseStyles} bg-red-500`;
      case "warning":
        return `${baseStyles} bg-yellow-500`;
      case "info":
        return `${baseStyles} bg-blue-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📄";
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon()}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 font-bold text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
