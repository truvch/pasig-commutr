function ContactForm() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 max-w-4xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Contact Us</h2>
        <p className="text-base sm:text-lg text-gray-600 px-4">
          Have questions or want to contribute in other ways? Reach out to our team.
        </p>
      </div>
      <form className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
            placeholder="Your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Message</label>
          <textarea 
            id="message" 
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="text-center">
          <button 
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
