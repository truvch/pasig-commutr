import { useState } from 'react';
import useFormState from '../hooks/useFormState';
import { submitNewRoute, submitReport } from '../utils/formSubmission';
import NotificationMessage from '../components/NotificationMessage';
import TabNavigation from '../components/TabNavigation';
import ContributeRouteForm from '../components/ContributeRouteForm';
import ReportRouteForm from '../components/ReportRouteForm';
import ContactForm from '../components/ContactForm';

function Contribute() {
  const [activeTab, setActiveTab] = useState('contribute');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Contribute to PasigCommutr
          </h1>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-gray-100 max-w-5xl mx-auto">
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Success Message */}
        {submitSuccess && (
          <NotificationMessage 
            type="success"
            message="Your submission has been received successfully. Thank you for contributing!"
            onClose={() => setSubmitSuccess(false)}
          />
        )}
        
        {/* Error Message */}
        {submitError && (
          <NotificationMessage 
            type="error"
            message={submitError}
            onClose={() => setSubmitError('')}
          />
        )}
        
        {/* Contribute New Route Form */}
        {activeTab === 'contribute' && (
          <ContributeRouteForm 
            formData={newRouteForm}
            onChange={handleNewRouteChange}
            onSubmit={handleSubmitNewRoute}
            isSubmitting={isSubmitting}
          />
        )}
        
        {/* Report Wrong Route Form */}
        {activeTab === 'report' && (
          <ReportRouteForm 
            formData={reportForm}
            onChange={handleReportChange}
            onSubmit={handleSubmitReport}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
      
      <ContactForm />
      
      </div>
    </div>
  );
}

export default Contribute;