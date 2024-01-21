import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SideIcon } from "./SideIcon";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Toaster,toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [error, setErrMsg] = useState("");
  const [valid, setValid] = useState(false);
  const Navigate = useNavigate();


  const validation = (e) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    // Password validation using regular expression
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const isValid = passwordRegex.test(newPassword);

    setValid(isValid);
  };

  const signIn = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        const cartValue = 0;
        addDoc(collection(db, "users"), {
          username: name,
          email: email,
          number: number,
          password: pass,
          cart: cartValue,
          uid: user.uid,
        })
          .then(() => {
            setEmail("");
            setErrMsg("");
            setName("");
            setNumber("");
            setPass("");
            toast.success('Registered Successfully')
            setTimeout(() => {
              Navigate("/login");
            }, 500);
          })
          .catch((error) => {
            toast.error("Something is wrong")
            setErrMsg(error.message);
          });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrMsg("User already exist");
        } else {
          setErrMsg("There might be something wrong with your Cradentials");
        }
      });
  };

  return (
    <>
      <div className="flex h-screen">
        <Toaster position="top-right" reverseOrder={true} />
        {/* <!-- Left Pane --> */}
        <SideIcon />
        {/* <!-- Right Pane --> */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Create Account
            </h1>
            {error && (
              <>
                <div className="text-sm text-red-500 text-center">{error}</div>
              </>
            )}
          
              
            <form onSubmit={signIn} className="space-y-4">
              {/* <!-- Your form elements go here --> */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  pattern="[1-9]{1}[0-9]{9}"
                  maxLength={10}
                  placeholder="+91"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={pass}
                  onChange={validation}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <p
                  className={`text-xs ${
                    valid ? "text-green-500" : "text-red-500"
                  } pt-2 pl-2`}
                >
                  {" "}
                  {valid
                    ? "Password is strong"
                    : "(A-Z) (a-z) (@-#) (0-9)"}{" "}
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-black hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
