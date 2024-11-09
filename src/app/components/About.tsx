// components/About.js
export default function About() {
  return (
    <section className="bg-gray-100 pt-[100px] dark:bg-gray-800 py-16">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">About Our Alumni Network</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Our alumni network is a community of passionate individuals who have excelled in their respective
          fields. From innovative tech startups to corporate leaders, our alumni have made a significant impact in
          their industries. We believe in the power of mentorship and collaboration, and we strive to provide a platform
          where our alumni can connect, learn, and grow together.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Mentorship</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our alumni offer valuable mentorship to students and fellow alumni, fostering the growth of the next
              generation of leaders.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Networking</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The network provides an excellent opportunity for professionals to connect, collaborate, and share ideas
              in various fields.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Career Development</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our alumni also play a key role in helping each other with career development opportunities, job referrals,
              and advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
