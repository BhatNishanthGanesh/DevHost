
export default function ReportError() {
  return (
    <section className="bg-gray-50 pt-[100px] min-h-screen dark:bg-gray-900 py-16">
      <div className="max-w-screen-md mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Report an Error</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Encountered an issue? Please let us know, and we'll resolve it as quickly as possible.
        </p>
        <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="error-description" className="text-gray-700 dark:text-gray-300">Describe the Error</label>
            <textarea
              id="error-description"
              className="w-full mt-2 p-3 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:hover:bg-red-600 dark:focus:ring-red-500"
          >
            Report Error
          </button>
        </form>
      </div>
    </section>
  );
}
