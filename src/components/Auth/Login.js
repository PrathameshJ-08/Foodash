import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useUserContext } from "../../utils/userContext";

import CloseIcon from "@mui/icons-material/Close";
import SignUp from "./SignUp";

const Login = ({
  setShowForm,
  setShowLogin,
  showLogin,
  setShowSignUp,
  showSignUp,
}) => {
  const { user, updateUser } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("abc@gmail.com");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateUser({ name: user.displayName });

      setLoginSuccess(true);
      setLoginError(null);
      navigate("/rlist");
    } catch (err) {
      console.error("Login error:", err);

      setLoginError("Incorrect email or password. Please try again.");
      setLoginSuccess(false);
      setEmail("");
      setPassword("");
    }
  };

  const handleShowSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowLogin(false);
    setShowSignUp(false);
  };

  return (
    <>
      {showLogin && (
        <div className="p-0 m-0 right-0 top-0 absolute md:w-[418px] w-screen  h-screen">
          <div className="z-50 pointer-events-auto  h-screen max-w-[418px] right-0 p-10 bg-slate-100 rounded-md shadow-md absolute">
            <p
              className="absolute top-4 left-4 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </p>

            <form onSubmit={handleLogin}>
              <h1 className="mt-16 text-3xl font-bold">Login</h1>
              <div className="text-sm pt-4">
                or{" "}
                <span
                  className="text-teal-600 hover:text-teal-400 active:text-teal-800 cursor-pointer underline"
                  onClick={handleShowSignUp}
                >
                  create an account
                </span>
              </div>
              <div className="text-sm py-3 mb-6 border-b-2 border-gray-900 w-8"></div>

              {loginSuccess && (
                <div className="bg-green-100 text-green-700 p-2 mb-4 rounded-md">
                  {`Welcome ${
                    user.name || ""
                  }! Login successful! Redirecting...`}
                </div>
              )}

              {loginError && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md">
                  {loginError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 text-sm mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded-xl hover:bg-teal-600 mt-4"
              >
                Login
              </button>
            </form>

            <div className="text-xs text-slate-400">
              By clicking on Login, I accept the terms & Conditions & Privacy
              Policy
            </div>
          </div>
        </div>
      )}

      {showSignUp && (
        <SignUp
          setShowForm={setShowForm}
          setShowSignUp={setShowSignUp}
          showSignUp={showSignUp}
        />
      )}
    </>
  );
};

export default Login;
