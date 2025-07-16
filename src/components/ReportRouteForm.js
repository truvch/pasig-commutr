import InstructionsBlock from '../components/InstructionsBlock.js';

function ReportRouteForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting 
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition shadow-sm"
            placeholder="e.g., Pasig-Quiapo"
            required
          />
        </div>
      
        <div>
          <label htmlFor="incorrectStationLocation" className="block text-neutral-700 mb-2 font-semibold">
            Location of the incorrect station <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="incorrectStationLocation" 
            name="incorrectStationLocation"
            value={formData.incorrectStationLocation}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition shadow-sm"
            placeholder="Describe the location of the incorrect station"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="correctStartingCoordinates" className="block text-neutral-700 mb-2 font-semibold">
              Correct Starting Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="correctStartingCoordinates" 
              name="correctStartingCoordinates"
              value={formData.correctStartingCoordinates}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition shadow-sm"
              placeholder="e.g., 14.590258, 121.085006"
              required
            />
          </div>
          
          <div>
            <label htmlFor="correctEndingCoordinates" className="block text-neutral-700 mb-2 font-semibold">
              Correct Ending Location Coordinates <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="correctEndingCoordinates" 
              name="correctEndingCoordinates"
              value={formData.correctEndingCoordinates}
              onChange={onChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition shadow-sm"
              placeholder="e.g., 14.579788, 121.082668"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="correctEncodedPolyline" className="block text-neutral-700 mb-2 font-semibold">
            Correct Encoded Polyline Route <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="correctEncodedPolyline" 
            name="correctEncodedPolyline"
            value={formData.correctEncodedPolyline}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition shadow-sm"
            placeholder="Paste the correct encoded polyline here"
            required
          ></textarea>
        </div>
        
        <InstructionsBlock />
        
        <div className="text-center pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 transform hover:scale-105 transition duration-200 shadow-lg w-full sm:w-auto ${
              isSubmitting ? 'opacity-75 cursor-not-allowed transform-none' : ''
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
