import { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const types = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle size={20} />,
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle size={20} />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <Info size={20} />,
    },
  };

  const config = types[type] || types.success;

  return (
    <div
      className={`fixed top-4 right-4 ${config.bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-slide-in`}
    >
      {config.icon}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded p-1">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
