import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import TypedGreetings from "./TypedGreetings";
import { Link } from "react-router-dom";

const TravelAILogin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 ">
      <div>
      <div className="rounded-lg p-8 max-w-m w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full overflow-hidden mb-4 border border-black">
            <img
              src="src\assets\images\chatbot1.jpg"
              alt="Travel.AI Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl text-black font-bold"><TypedGreetings /></h1>
          <p className="text-black text-3xl font-bold">I&apos;m Travel.AI</p>
          <p className="text-black text-2xl font-bold">
            Your personal travel buddy!
          </p>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-full mb-4 font-semibold hover:bg-blue-600 transition-colors">
          {/* Replace Link with a tag or routing library */}
          <Link to='/phone-login'>Sign in with Phone Number</Link>
        </button>

        <button className="w-full bg-white font-semibold border text-black border-gray-300 py-2 rounded-full shadow-md mb-4 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <FcGoogle className="w-5 h-5 mr-2" />
         <Link to='/chat-section'>Continue with Google</Link>
        </button>

        <button className="w-full bg-white border font-semibold text-black border-gray-300 py-2 rounded-full shadow-md mb-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <IoLogoApple className="w-5 h-5 mr-2" />
          <Link to='/chat-section'>Continue with Apple</Link>
        </button>

        <p className="text-center font-semibold text-sm text-black">
          Don&apos;t have an account?{" "}
          <Link to='/' className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center font-semibold text-sm text-gray-400 mt-4">
          By continuing, you agree to our
          <Link to='/' className="text-blue-400 hover:underline">
            {" "}
            User Agreement{" "}
          </Link>
          and
          <a href="#" className="text-blue-400 hover:underline">
            {" "}
            Privacy Policy
          </a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default TravelAILogin;
