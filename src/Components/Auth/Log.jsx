import React, { useContext, useState } from "react";
import { SideIcon } from "./SideIcon";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import myContext from "../../context/Data/myContext";

export const Log = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setErrMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { CurrentUser } = context;

  if (CurrentUser) {
    localStorage.setItem("userId", CurrentUser[0].id)
  }

  const Login = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        setEmail("");
        setPass("");
        setErrMsg("");

        toast.success("Logged In Successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          setErrMsg("invalid email");
        }
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setErrMsg("Email not Found");
        }
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          setErrMsg("Wrong Password");
        } else {
          toast.error("Try again");
        }
      });
  };

  return (
    <div className="flex h-screen">
      <Toaster position="top-right" reverseOrder={true} />
      {/* <!-- Left Pane --> */}
      <SideIcon />
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Welcome Back !
          </h1>
          
          <form onSubmit={Login} className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
          <div>{error}</div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Don't Have a Account?{" "}
              <Link to="/register" className="text-black hover:underline">
                Resister Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
