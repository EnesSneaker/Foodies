import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import RegisterAuth from "../../auth/RegisterAuth";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterAuth(
      username,
      userEmail,
      userPassword,
      navigate,
      props.setUser,
      setUsernameError,
      setUserEmailError,
      setUserPasswordError
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Foodies
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up for your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  // onBlur={() => setUsernameError(!validateString(username))}
                  className={`${
                    !usernameError
                      ? "border-gray-300 ring-blue-500"
                      : "border-red-500 ring-red-500"
                  } bg-gray-50 border rounded-lg text-gray-900 sm:text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 block w-full`}
                  placeholder="Enter your username"
                  required
                />
                {usernameError && (
                  <p className="text-red-500">Username is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="text"
                  onChange={(e) => setUserEmail(e.target.value)}
                  // onBlur={() => setUserEmailError(!validateString(userEmail))}
                  className={`${
                    !userEmailError
                      ? "border-gray-300 ring-blue-500"
                      : "border-red-500 ring-red-500"
                  } bg-gray-50 border rounded-lg text-gray-900 sm:text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 block w-full`}
                  placeholder="Enter your email"
                  required
                />
                {userEmailError && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  // onBlur={() =>
                  //   setUserPasswordError(!validateString(userPassword))
                  // }
                  className={`${
                    !userPasswordError
                      ? "border-gray-300 ring-blue-500"
                      : "border-red-500 ring-red-500"
                  } bg-gray-50 border rounded-lg text-gray-900 sm:text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 block w-full`}
                  placeholder="Enter password"
                  required
                />
                {userPasswordError && (
                  <p className="text-red-500">Password is required</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href=""
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full text-grey bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already an account yet?{" "}
                <a
                  href=""
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
