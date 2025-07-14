import { useState } from 'react';

function useFormState() {
  const [newRouteForm, setNewRouteForm] = useState({
    routeName: '',
    vehicleType: '',
    routeDescription: '',
    startingCoordinates: '',
    endingCoordinates: '',
    encodedPolyline: '',
  });

  const [reportForm, setReportForm] = useState({
    routeName: '',
    incorrectStationLocation: '',
    correctStartingCoordinates: '',
    correctEndingCoordinates: '',
    correctEncodedPolyline: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateNewRouteForm = () => {
    return (
      newRouteForm.routeName.trim() !== '' &&
      newRouteForm.vehicleType.trim() !== '' &&
      newRouteForm.routeDescription.trim() !== '' &&
      newRouteForm.startingCoordinates.trim() !== '' &&
      newRouteForm.endingCoordinates.trim() !== '' &&
      newRouteForm.encodedPolyline.trim() !== ''
    );
  };

  const validateReportForm = () => {
    return (
      reportForm.routeName.trim() !== '' &&
      reportForm.incorrectStationLocation.trim() !== '' &&
      reportForm.correctStartingCoordinates.trim() !== '' &&
      reportForm.correctEndingCoordinates.trim() !== '' &&
      reportForm.correctEncodedPolyline.trim() !== ''
    );
  };

  const handleNewRouteChange = (e) => {
    const { name, value } = e.target;
    setNewRouteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetNewRouteForm = () => {
    setNewRouteForm({
      routeName: '',
      vehicleType: '',
      routeDescription: '',
      startingCoordinates: '',
      endingCoordinates: '',
      encodedPolyline: '',
    });
  };

  const resetReportForm = () => {
    setReportForm({
      routeName: '',
      incorrectStationLocation: '',
      correctStartingCoordinates: '',
      correctEndingCoordinates: '',
      correctEncodedPolyline: '',
    });
  };

  return {
    // State
    newRouteForm,
    reportForm,
    isSubmitting,
    submitSuccess,
    submitError,
    // Actions
    setIsSubmitting,
    setSubmitSuccess,
    setSubmitError,
    // Handlers
    handleNewRouteChange,
    handleReportChange,
    // Validators
    validateNewRouteForm,
    validateReportForm,
    // Reset functions
    resetNewRouteForm,
    resetReportForm,
  };
}

export default useFormState;
