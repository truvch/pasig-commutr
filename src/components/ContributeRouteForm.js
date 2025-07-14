import InstructionsBlock from '../components/InstructionsBlock';

function ContributeRouteForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting 
}) {
  return (
    <div className="bg-gradient-to-br from-purple-25 to-indigo-25 p-4 sm:p-6 lg:p-8 rounded-xl border border-purple-100 max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="routeName" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Name of the Route <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="routeName" 
              name="routeName"
              value={formData.routeName}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              placeholder="e.g., Pasig-Quiapo"
              required
            />
          </div>
          
          <div>
            <label htmlFor="vehicleType" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Type of Vehicle <span className="text-red-500">*</span>
            </label>
            <select 
              id="vehicleType" 
              name="vehicleType"
              value={formData.vehicleType}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="Jeepney">🚍 Jeepney</option>
              <option value="UV Express">🚐 UV Express</option>
            </select>
          </div>
        </div>
      
        <div>
          <label htmlFor="routeDescription" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
            Description of the route location <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="routeDescription" 
            name="routeDescription"
            value={formData.routeDescription}
            onChange={onChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
            placeholder="Describe the route with key landmarks, stops, etc."
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="startingCoordinates" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Starting Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="startingCoordinates" 
              name="startingCoordinates"
              value={formData.startingCoordinates}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              placeholder="e.g., 14.578110, 121.085455"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endingCoordinates" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Ending Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="endingCoordinates" 
              name="endingCoordinates"
              value={formData.endingCoordinates}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              placeholder="e.g., 14.589987, 121.088997"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="encodedPolyline" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
            Encoded Polyline Route <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="encodedPolyline" 
            name="encodedPolyline"
            value={formData.encodedPolyline}
            onChange={onChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
            placeholder="Paste the encoded polyline here"
            required
          ></textarea>
        </div>
        
        <InstructionsBlock />
        
        <div className="text-center">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '⏳ Submitting...' : '🚀 Submit New Route'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContributeRouteForm;
