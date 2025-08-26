import axios from "axios";
import { API_AUTH_REGISTER } from "./constants.mjs";
export const registerUser = async (
  name,
  email,
  password,
  venueManager = false
) => {
  try {
    const response = await axios.post(API_AUTH_REGISTER, {
      name,
      email,
      password,
      venueManager,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { errors, status, statusCode } = error.response.data;

      if (errors && errors.length > 0) {
        // Handle field-specific errors
        const errorObject = {};
        errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            errorObject[err.path[0]] = err.message;
          }
        });

        // If we extracted field errors, return them
        if (Object.keys(errorObject).length > 0) {
          return errorObject;
        }

        // If no field errors were extracted but errors exist, use the first error message
        if (errors[0] && errors[0].message) {
          return {
            general: `${statusCode || ""}: ${status || ""}. ${
              errors[0].message
            }`,
          };
        }
      }

      // Fallback to a general error using the root-level properties
      return {
        general: `${statusCode || ""}: ${status || ""}. ${
          error.response.data.message || "Registration failed"
        }`,
      };
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};
