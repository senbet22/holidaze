import { useState } from "react";
import { loginUser } from "../API/login"; // Import the login service
import { registerUser } from "../API/register"; // Import the Register service
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
      aria-label={state === "Sign Up" ? "Sign Up Form" : "Login Form"}
      className="py-10 flex items-center h-svh bg-linear-to-b from-20% from-primary/70 to-70% to-secondary"
    >
      <title>Auth</title>
      <div className="flex flex-col bg-secondary text-text gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl text-sm shadow-lg">
        <header className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h1>
          <img
            className="h-10 w-10"
            src={isDarkMode ? assets.dunestay_dark_logo : assets.dunestay_logo}
            alt="DuneStay logo"
          />
        </header>

        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book a stay at{" "}
          <strong>DuneStay</strong>
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              className="border bg-background/40 border-accent rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-700 bg-background px-2 rounded-md mt-1"
              >
                {errors.name}
              </p>
            )}
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            className="border bg-background/40 border-accent rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-red-700 bg-background px-2 rounded-md mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            className="border bg-background/40 border-accent rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-red-700 bg-background px-2 rounded-md mt-1"
            >
              {errors.password}
            </p>
          )}
        </div>

        {state === "Sign Up" && (
          <div className="w-full mt-2">
            <input
              id="venue-manager"
              type="checkbox"
              checked={venueManager}
              onChange={() => setVenueManager(!venueManager)}
              className="h-4 w-4"
              aria-describedby="venue-manager-desc"
            />
            <label
              htmlFor="venue-manager"
              className="ml-2 cursor-pointer font-medium"
            >
              Register as a Venue Manager
            </label>
            <p
              id="venue-manager-desc"
              className="text-xs text-secondry mt-1 ml-6"
            >
              Venue managers can create and manage properties on DuneStay
            </p>
          </div>
        )}

        <button
          type="submit"
          className="bg-accent hover:bg-primary text-background w-full py-2 rounded-md cursor-pointer text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {errors.general && (
          <p className="text-red-700 bg-background px-2 rounded-md">
            {errors.general}
          </p>
        )}

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setState("Login");
                setErrors({});
              }}
              className="text-accent underline cursor-pointer"
            >
              Login Here
            </button>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <button
              type="button"
              onClick={() => {
                setState("Sign Up");
                setErrors({});
              }}
              className="text-accent underline cursor-pointer"
            >
              Click here
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Auth;
