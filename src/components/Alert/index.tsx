'use client';

import { useAlert } from '@/contexts/AlertContext';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export default function Alert() {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5" />;
      case 'error':
        return <FaExclamationCircle className="w-5 h-5" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5" />;
      default:
        return <FaInfoCircle className="w-5 h-5" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center p-4 rounded-lg border-2 shadow-lg transform transition-all duration-300 animate-in slide-in-from-right-10 ${getBgColor(alert.type)}`}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(alert.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
          <button
            onClick={() => removeAlert(alert.id)}
            className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity"
            aria-label="Fechar alerta"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}