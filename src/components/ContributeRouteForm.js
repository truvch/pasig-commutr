import InstructionsBlock from '../components/InstructionsBlock.js';

function ContributeRouteForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting 
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="routeName" className="block text-neutral-700 mb-2 font-semibold">
              Name of the Route <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="routeName" 
              name="routeName"
              value={formData.routeName}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
              placeholder="e.g., Pasig-Quiapo"
              required
            />
          </div>
          
          <div>
            <label htmlFor="vehicleType" className="block text-neutral-700 mb-2 font-semibold">
              Type of Vehicle <span className="text-red-500">*</span>
            </label>
            <select 
              id="vehicleType" 
              name="vehicleType"
              value={formData.vehicleType}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="Jeepney">🚍 Jeepney</option>
              <option value="UV Express">🚐 UV Express</option>
            </select>
          </div>
        </div>
      
        <div>
          <label htmlFor="routeDescription" className="block text-neutral-700 mb-2 font-semibold">
            Description of the route location <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="routeDescription" 
            name="routeDescription"
            value={formData.routeDescription}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
            placeholder="Describe the route with key landmarks, stops, etc."
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startingCoordinates" className="block text-neutral-700 mb-2 font-semibold">
              Starting Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="startingCoordinates" 
              name="startingCoordinates"
              value={formData.startingCoordinates}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
              placeholder="e.g., 14.578110, 121.085455"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endingCoordinates" className="block text-neutral-700 mb-2 font-semibold">
              Ending Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="endingCoordinates" 
              name="endingCoordinates"
              value={formData.endingCoordinates}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
              placeholder="e.g., 14.589987, 121.088997"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="encodedPolyline" className="block text-neutral-700 mb-2 font-semibold">
            Encoded Polyline Route <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="encodedPolyline" 
            name="encodedPolyline"
            value={formData.encodedPolyline}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm"
            placeholder="Paste the encoded polyline here"
            required
          ></textarea>
        </div>
        
        <InstructionsBlock />
        
        <div className="text-center pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition duration-200 shadow-lg w-full sm:w-auto ${
              isSubmitting ? 'opacity-75 cursor-not-allowed transform-none' : ''
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
