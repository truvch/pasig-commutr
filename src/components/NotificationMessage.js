function NotificationMessage({ type, message, onClose }) {
  const isSuccess = type === 'success';
  const baseClasses = `mb-6 sm:mb-8 p-4 sm:p-6 border rounded-xl shadow-md`;
  const typeClasses = isSuccess 
    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200'
    : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-200';
  
  const icon = isSuccess ? '✅' : '❌';
  const title = isSuccess ? 'Success!' : 'Error';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <div className="flex items-start sm:items-center">
        <div className="flex-shrink-0 mt-1 sm:mt-0">
          <span className="text-xl sm:text-2xl">{icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
          <p className="text-sm sm:text-base">{message}</p>
        </div>
        <button 
          className={`ml-2 font-bold text-lg sm:text-xl flex-shrink-0 ${
            isSuccess 
              ? 'text-green-600 hover:text-green-800' 
              : 'text-red-600 hover:text-red-800'
          }`}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default NotificationMessage;
