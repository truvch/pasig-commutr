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

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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

  const validateContactForm = () => {
    return (
      contactForm.name.trim() !== '' &&
      contactForm.email.trim() !== '' &&
      contactForm.subject.trim() !== '' &&
      contactForm.message.trim() !== ''
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

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
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

  const resetContactForm = () => {
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return {
    newRouteForm,
    reportForm,
    contactForm,
    isSubmitting,
    submitSuccess,
    submitError,
    setIsSubmitting,
    setSubmitSuccess,
    setSubmitError,
    handleNewRouteChange,
    handleReportChange,
    handleContactChange,
    validateNewRouteForm,
    validateReportForm,
    validateContactForm,
    resetNewRouteForm,
    resetReportForm,
    resetContactForm,
  };
}

export default useFormState;
