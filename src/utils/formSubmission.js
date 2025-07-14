async function submitNewRoute(formData, { setIsSubmitting, setSubmitError, setSubmitSuccess, resetForm }) {
  if (!validateNewRouteForm(formData)) {
    setSubmitError('All fields are required.');
    return;
  }
  
  try {
    setIsSubmitting(true);
    setSubmitError('');
    
    const response = await fetch('http://localhost:3001/contribute-route', {
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
      setSubmitError('Cannot connect to server. Make sure the backend is running on port 3001.');
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
    
    const response = await fetch('http://localhost:3001/contribute-report', {
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
      setSubmitError('Cannot connect to server. Make sure the backend is running on port 3001.');
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

export { submitNewRoute, submitReport };
