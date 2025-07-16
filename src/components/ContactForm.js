import useFormState from '../hooks/useFormState.js';
import { submitContactForm } from '../utils/formSubmission.js';
import NotificationMessage from './NotificationMessage.js';

function ContactForm() {
  const {
    contactForm,
    isSubmitting,
    submitSuccess,
    submitError,
    setIsSubmitting,
    setSubmitSuccess,
    setSubmitError,
    handleContactChange,
    resetContactForm,
  } = useFormState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitContactForm(contactForm, {
      setIsSubmitting,
      setSubmitError,
      setSubmitSuccess,
      resetForm: resetContactForm,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">Contact Our Team</h3>
        <p className="text-neutral-600">
          Have questions or need help with your contribution?
        </p>
      </div>
      
      {submitSuccess && (
        <NotificationMessage 
          type="success" 
          message="Your message has been sent successfully! We'll get back to you soon."
          onClose={() => setSubmitSuccess(false)}
        />
      )}
      
      {submitError && (
        <NotificationMessage 
          type="error" 
          message={submitError}
          onClose={() => setSubmitError('')}
        />
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-neutral-700 mb-2 font-medium">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-neutral-700 mb-2 font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-neutral-700 mb-2 font-medium">Subject</label>
          <input 
            type="text" 
            id="subject" 
            name="subject"
            value={contactForm.subject}
            onChange={handleContactChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="What is this about?"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-neutral-700 mb-2 font-medium">Message</label>
          <textarea 
            id="message" 
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>
        <div className="text-center pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition duration-200 shadow-md w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
