import InstructionsBlock from '../components/InstructionsBlock';

function ReportRouteForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting 
}) {
  return (
    <div className="bg-gradient-to-br from-red-25 to-orange-25 p-4 sm:p-6 lg:p-8 rounded-xl border border-red-100 max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
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
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
            placeholder="e.g., Pasig-Quiapo"
            required
          />
        </div>
      
        <div>
          <label htmlFor="incorrectStationLocation" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
            Location of the incorrect station <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="incorrectStationLocation" 
            name="incorrectStationLocation"
            value={formData.incorrectStationLocation}
            onChange={onChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
            placeholder="Describe the location of the incorrect station"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="correctStartingCoordinates" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Correct Starting Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="correctStartingCoordinates" 
              name="correctStartingCoordinates"
              value={formData.correctStartingCoordinates}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              placeholder="e.g., 14.590258, 121.085006"
              required
            />
          </div>
          
          <div>
            <label htmlFor="correctEndingCoordinates" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
              Correct Ending Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="correctEndingCoordinates" 
              name="correctEndingCoordinates"
              value={formData.correctEndingCoordinates}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
              placeholder="e.g., 14.579788, 121.082668"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="correctEncodedPolyline" className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
            Correct Encoded Polyline Route <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="correctEncodedPolyline" 
            name="correctEncodedPolyline"
            value={formData.correctEncodedPolyline}
            onChange={onChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
            placeholder="Paste the correct encoded polyline here"
            required
          ></textarea>
        </div>
        
        <InstructionsBlock />
        
        <div className="text-center">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '⏳ Submitting...' : '📝 Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportRouteForm;
