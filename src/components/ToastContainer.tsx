import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Award, Star } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'badge' | 'level' | 'points';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mostrar el toast con animación de entrada
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto ocultar el toast después del tiempo especificado
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'badge':
        return <Award className="w-6 h-6 text-yellow-500" />;
      case 'level':
        return <Star className="w-6 h-6 text-purple-500" />;
      case 'points':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'badge':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'level':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'points':
        return 'bg-gradient-to-r from-green-400 to-blue-500';
      default:
        return 'bg-gradient-to-r from-blue-400 to-purple-500';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 z-50 ${
        isVisible && !isExiting
          ? 'transform translate-y-0 opacity-100'
          : 'transform translate-y-2 opacity-0'
      }`}
    >
      <div className={`h-1 rounded-t-lg ${getBgColor()}`} />
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export interface ToastMessage {
  id: string;
  type: 'badge' | 'level' | 'points';
  title: string;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={onRemoveToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
export { Toast };
