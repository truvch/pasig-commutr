function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">Contact Our Team</h3>
        <p className="text-neutral-600">
          Have questions or need help with your contribution?
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-neutral-700 mb-2 font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Your email address"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-neutral-700 mb-2 font-medium">Message</label>
          <textarea 
            id="message" 
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="How can we help you?"
          ></textarea>
        </div>
        <div className="text-center pt-2">
          <button 
            type="submit"
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition duration-200 shadow-md w-full sm:w-auto"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
