import React, { useState } from "react";

import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import CloseIcon from "@mui/icons-material/Close";

import { useUserContext } from "../../utils/userContext";
import Login from "./Login";

const SignUp = ({
  setShowForm,
  setShowLogin,
  showLogin,
  setShowSignUp,
  showSignUp,
}) => {
  const { updateUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // console.log("User data signup:", auth.currentUser);

      updateUser({ name });
      setName("");
      setEmail("");
      setPassword("");
      setSuccessMessage("Signup successful! You can now log in.");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleShowLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowSignUp(false);
  };
  return (
    <>
      {showSignUp && (
        <div className="p-0 m-0 right-0 top-0 absolute w-[418px] h-screen">
          <div className="z-50 pointer-events-auto  max-w-[418px] h-screen right-0 p-10 bg-slate-100 rounded-md shadow-md absolute">
            <p
              className="absolute top-4 left-4 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </p>
            <form onSubmit={handleSubmit}>
              <h1 className="mt-16 text-3xl font-bold">Sign up</h1>
              {successMessage && (
                <div className="text-green-600 mt-2 mb-4">{successMessage}</div>
              )}
              <div className="text-sm pt-4">
                or{" "}
                <span
                  className="text-teal-600 hover:text-teal-400 active:text-teal-800 cursor-pointer underline"
                  onClick={handleShowLogin}
                >
                  login to your account
                </span>
              </div>
              <div className="text-sm py-3 mb-6 border-b-2 border-gray-900 w-8"></div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <label className="block text-gray-600 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded-xl hover:bg-teal-600 mt-4"
              >
                Sign Up
              </button>
            </form>
            <div className="text-xs text-slate-400">
              By clicking on Sign Up, I accept the terms & Conditions & Privacy
              Policy
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <Login
          setShowForm={setShowForm}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />
      )}
    </>
  );
};

export default SignUp;
