import { useState } from 'react';
import useFormState from '../hooks/useFormState';
import { submitNewRoute, submitReport } from '../utils/formSubmission';
import NotificationMessage from '../components/NotificationMessage';
import ContributeRouteForm from '../components/ContributeRouteForm';
import ReportRouteForm from '../components/ReportRouteForm';
import ContactForm from '../components/ContactForm';
import jeepIconImg from '../assets/jeepney.png';
import uvIconImg from '../assets/uvexpress.png';

function Contribute() {
  const [activeTab, setActiveTab] = useState(null); // null means no form selected yet
  const [showHelp, setShowHelp] = useState(false);
  const {
    newRouteForm,
    reportForm,
    isSubmitting,
    submitSuccess,
    submitError,
    setIsSubmitting,
    setSubmitSuccess,
    setSubmitError,
    handleNewRouteChange,
    handleReportChange,
    resetNewRouteForm,
    resetReportForm,
  } = useFormState();

  const handleBackToSelection = () => {
    setActiveTab(null);
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const handleSubmitNewRoute = async (e) => {
    e.preventDefault();
    await submitNewRoute(newRouteForm, {
      setIsSubmitting,
      setSubmitError,
      setSubmitSuccess,
      resetForm: resetNewRouteForm,
    });
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    await submitReport(reportForm, {
      setIsSubmitting,
      setSubmitError,
      setSubmitSuccess,
      resetForm: resetReportForm,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
            Help Improve PasigCommutr
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Your local knowledge makes our route data better for everyone. 
            Share new routes or report issues to help fellow commuters navigate Pasig more easily.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8">
            <NotificationMessage 
              type="success"
              message="Your submission has been received successfully. Thank you for contributing!"
              onClose={() => setSubmitSuccess(false)}
            />
          </div>
        )}
        
        {/* Error Message */}
        {submitError && (
          <div className="mb-8">
            <NotificationMessage 
              type="error"
              message={submitError}
              onClose={() => setSubmitError('')}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          
          {/* Selection Screen */}
          {!activeTab && (
            <div className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">
                  How would you like to help?
                </h2>
                <p className="text-neutral-600">
                  Choose the type of contribution you'd like to make
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                
                {/* Add New Route Card */}
                <div 
                  onClick={() => setActiveTab('contribute')}
                  className="group cursor-pointer bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                      <div className="bg-primary-500 rounded-full p-4 mr-3">
                        <img src={jeepIconImg} alt="Transport" className="w-8 h-8" />
                      </div>
                      <div className="bg-primary-500 rounded-full p-4">
                        <img src={uvIconImg} alt="UV Express" className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-3">
                      Add New Route
                    </h3>
                    <p className="text-primary-700 mb-4">
                      Know a jeepney or UV Express route that's not in our system? 
                      Help us add it to benefit other commuters.
                    </p>
                    <div className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                      <span>Get Started</span>
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Report Issue Card */}
                <div 
                  onClick={() => setActiveTab('report')}
                  className="group cursor-pointer bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="bg-accent-500 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-accent-800 mb-3">
                      Report an Issue
                    </h3>
                    <p className="text-accent-700 mb-4">
                      Found incorrect route information? Report it so we can 
                      keep our data accurate and helpful for everyone.
                    </p>
                    <div className="inline-flex items-center text-accent-600 font-semibold group-hover:text-accent-700">
                      <span>Report Now</span>
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Section */}
          {activeTab && (
            <div className="border-t border-neutral-200">
              {/* Form Header */}
              <div className="bg-neutral-50 px-6 sm:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={handleBackToSelection}
                    className="mr-4 p-2 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">
                    {activeTab === 'contribute' ? 'Add New Route' : 'Report an Issue'}
                  </h3>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                {activeTab === 'contribute' && (
                  <ContributeRouteForm 
                    formData={newRouteForm}
                    onChange={handleNewRouteChange}
                    onSubmit={handleSubmitNewRoute}
                    isSubmitting={isSubmitting}
                  />
                )}
                
                {activeTab === 'report' && (
                  <ReportRouteForm 
                    formData={reportForm}
                    onChange={handleReportChange}
                    onSubmit={handleSubmitReport}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-lg p-2 mr-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">Need Help?</h3>
                  <p className="text-neutral-600">Get assistance or contact our team</p>
                </div>
              </div>
              <svg 
                className={`w-6 h-6 text-neutral-400 transform transition-transform ${showHelp ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showHelp && (
              <div className="border-t border-neutral-200 p-6 sm:p-8 bg-neutral-50">
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribute;