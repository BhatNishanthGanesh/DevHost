import Link from "next/link";
import { ShuffleGrid } from "./components/shufflegrid";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
            Empowering Connections
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">
          Smart Alumni-Student Platform for Career Growth
          </h3>
          <p className="text-base md:text-md text-justify text-slate-700 my-4 md:my-6">
          Educational institutions often struggle to tap into alumni networks fully. Our platform bridges students with alumni, creating a supportive community for mentorship, career guidance, and valuable connections.
          </p>
          <Link
            href="/Login/student"
            className="relative inline-block px-4 py-2 font-medium group items-center"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-br from-blue-800 to-blue-900 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative flex items-center justify-center text-black group-hover:text-white">
              Get Started <FaArrowAltCircleRight className="ml-2" />
            </span>
          </Link>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
};

export default Home;
