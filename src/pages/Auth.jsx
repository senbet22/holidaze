import React, { useState } from "react";
import { registerUser } from "../API/register";
import { loginUser } from "../API/login"; // Import the login service
import { toast } from "react-toastify";
import { assets } from "../assets/assets.mjs";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../hooks/useAuth";

const Auth = () => {
  const { isDarkMode } = useDarkMode();
  const [state, setState] = useState("Login"); // Sets initial state to "Login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({}); // Stores errors as an object
  const navigate = useNavigate();

  const { login } = useAuth();

  const [venueManager, setVenueManager] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrors({}); // Reset errors before request

    if (state === "Sign Up") {
      try {
        const result = await registerUser(name, email, password, venueManager);
        console.log("Registration result:", result);

        // Checks if result contains error information
        if (
          result &&
          typeof result === "object" &&
          (result.general || result.name || result.email || result.password)
        ) {
          setErrors(result);
        } else {
          toast.success("Registration Successful!", {
            autoClose: 2000,
          });
          console.log("Registration successful!");
          setState("Login");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors({ general: error.message });
      }
    } else {
      try {
        const data = await loginUser(email, password);

        const { accessToken, ...userProfile } = data.data;

        if (accessToken) {
          login(accessToken, userProfile);
          toast.success("Login successful!", {
            autoClose: 2000,
          });
          console.log("Login successful:", data);
          navigate("/");
        }
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" py-10 flex items-center h-svh bg-linear-to-b from-20% from-primary/70 to-70% to-secondary"
    >
      <div className="flex flex-col bg-secondary text-text gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl text-sm shadow-lg">
        <p className="flex text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
          <img
            className="h-10 w-10 mx-4"
            src={isDarkMode ? assets.dunestay_dark_logo : assets.dunestay_logo}
            alt=""
          />
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book a stay at
          <b> DuneStay</b>
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && (
              <p className="text-red-700 bg-background px-2 rounded-md">
                {errors.name}
              </p>
            )}
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && (
            <p className="text-red-700 bg-background px-2 rounded-md">
              {errors.email}
            </p>
          )}
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && (
            <p className="text-red-700 bg-background px-2 rounded-md">
              {errors.password}
            </p>
          )}
        </div>

        {state === "Sign Up" && (
          <div className="w-full mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={venueManager}
                onChange={() => setVenueManager(!venueManager)}
                className="h-4 w-4"
              />
              <span>Register as a Venue Manager</span>
            </label>
            <p className="text-xs text-secondry mt-1">
              Venue managers can create and manage properties on DuneStay
            </p>
          </div>
        )}

        <button className="bg-accent hover:bg-primary text-background w-full py-2 rounded-md cursor-pointer text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* General Error */}
        {errors.general && (
          <p className="text-red-700 bg-background px-2 rounded-md">
            {errors.general}
          </p>
        )}

        {state === "Sign Up" ? (
          <p className="">
            Already have an Account?{" "}
            <span
              onClick={() => {
                setState("Login");
                setErrors({});
              }}
              className="text-accent underline cursor-pointer"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="">
            Create a new account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
                setErrors({});
              }}
              className="text-accent underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Auth;
