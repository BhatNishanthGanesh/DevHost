// components/Contact.js
export default function Contact() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-[100px] py-16">
      <div className="max-w-screen-md mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Have any questions or want to get in touch with our alumni? Fill out the form below, and we'll get back to you as soon as possible.
        </p>
        <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              id="message"
              className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:hover:bg-green-600 dark:focus:ring-green-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
