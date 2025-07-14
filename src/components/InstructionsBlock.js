function InstructionsBlock() {
  return (
    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
      <div className="mb-4">
        <h4 className="font-bold text-blue-800 mb-3 text-base sm:text-lg flex items-center">
          🧭 How to get the coordinates:
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-100">
            <p className="mb-3 font-semibold text-blue-700 flex items-center text-sm sm:text-base">
              💻 On Web:
            </p>
            <ol className="list-decimal ml-5 space-y-1 text-gray-700 text-xs sm:text-sm">
              <li>Go to https://maps.google.com</li>
              <li>Right-click on the location</li>
              <li>Click on the coordinates shown</li>
              <li>Paste it here</li>
            </ol>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-100">
            <p className="mb-3 font-semibold text-blue-700 flex items-center text-sm sm:text-base">
              📱 On Phone:
            </p>
            <ol className="list-decimal ml-5 space-y-1 text-gray-700 text-xs sm:text-sm">
              <li>Open Google Maps app</li>
              <li>Tap and hold the location</li>
              <li>The coordinates should show in the search bar</li>
              <li>Paste it here</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-3 text-base sm:text-lg flex items-center">
          🗺️ How to get the encoded polyline route:
        </h4>
        <ol className="list-decimal ml-5 space-y-2 text-gray-700 text-xs sm:text-sm">
          <li>Go to <span className="font-mono bg-gray-100 px-1 sm:px-2 py-1 rounded text-xs break-all">https://developers.google.com/maps/documentation/utilities/polylineutility</span></li>
          <li>Click the starting location → <strong>"Add Location"</strong></li>
          <li>Add intersections or curves → <strong>"Add Location"</strong></li>
          <li>Continue mapping until the end</li>
          <li>Copy the encoded polyline and paste it here</li>
        </ol>
      </div>
    </div>
  );
}

export default InstructionsBlock;
