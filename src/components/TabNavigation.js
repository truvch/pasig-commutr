function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center border-b border-gray-200 mb-6 sm:mb-8">
      <button 
        className={`py-3 sm:py-4 px-4 sm:px-8 font-semibold text-base sm:text-lg border-b-3 transition-all duration-200 ${activeTab === 'contribute' 
          ? 'border-purple-600 text-purple-700 bg-purple-50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'} rounded-t-lg mb-2 sm:mb-0`}
        onClick={() => setActiveTab('contribute')}
      >
        🚍 Contribute a New Route
      </button>
      <button 
        className={`py-3 sm:py-4 px-4 sm:px-8 font-semibold text-base sm:text-lg border-b-3 transition-all duration-200 ${activeTab === 'report' 
          ? 'border-purple-600 text-purple-700 bg-purple-50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'} rounded-t-lg sm:ml-2`}
        onClick={() => setActiveTab('report')}
      >
        🚨 Report a Wrong Route
      </button>
    </div>
  );
}

export default TabNavigation;
