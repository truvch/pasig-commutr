import API_BASE_URL from '../config/api.js';

async function submitNewRoute(formData, { setIsSubmitting, setSubmitError, setSubmitSuccess, resetForm }) {
  if (!validateNewRouteForm(formData)) {
    setSubmitError('All fields are required.');
    return;
  }
  
  try {
    setIsSubmitting(true);
    setSubmitError('');
    
    const response = await fetch(`${API_BASE_URL}/contribute-route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    setSubmitSuccess(true);
    resetForm();
    
  } catch (error) {
    console.error('Submit error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setSubmitError('Cannot connect to server. Please check your internet connection and try again.');
    } else {
      setSubmitError(error.message);
    }
  } finally {
    setIsSubmitting(false);
  }
}

async function submitReport(formData, { setIsSubmitting, setSubmitError, setSubmitSuccess, resetForm }) {
  if (!validateReportForm(formData)) {
    setSubmitError('All fields are required.');
    return;
  }
  
  try {
    setIsSubmitting(true);
    setSubmitError('');
    
    const response = await fetch(`${API_BASE_URL}/contribute-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    setSubmitSuccess(true);
    resetForm();
    
  } catch (error) {
    console.error('Submit error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setSubmitError('Cannot connect to server. Please check your internet connection and try again.');
    } else {
      setSubmitError(error.message);
    }
  } finally {
    setIsSubmitting(false);
  }
}

async function submitContactForm(formData, { setIsSubmitting, setSubmitError, setSubmitSuccess, resetForm }) {
  if (!validateContactForm(formData)) {
    setSubmitError('All fields are required.');
    return;
  }
  
  try {
    setIsSubmitting(true);
    setSubmitError('');
    
    const response = await fetch(`${API_BASE_URL}/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    setSubmitSuccess(true);
    resetForm();
    
  } catch (error) {
    console.error('Submit error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setSubmitError('Cannot connect to server. Please check your internet connection and try again.');
    } else {
      setSubmitError(error.message);
    }
  } finally {
    setIsSubmitting(false);
  }
}

function validateNewRouteForm(formData) {
  return (
    formData.routeName.trim() !== '' &&
    formData.vehicleType.trim() !== '' &&
    formData.routeDescription.trim() !== '' &&
    formData.startingCoordinates.trim() !== '' &&
    formData.endingCoordinates.trim() !== '' &&
    formData.encodedPolyline.trim() !== ''
  );
}

function validateReportForm(formData) {
  return (
    formData.routeName.trim() !== '' &&
    formData.incorrectStationLocation.trim() !== '' &&
    formData.correctStartingCoordinates.trim() !== '' &&
    formData.correctEndingCoordinates.trim() !== '' &&
    formData.correctEncodedPolyline.trim() !== ''
  );
}

function validateContactForm(formData) {
  return (
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.subject.trim() !== '' &&
    formData.message.trim() !== ''
  );
}

export { submitNewRoute, submitReport, submitContactForm };
