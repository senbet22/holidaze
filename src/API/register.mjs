import { optionPost } from "./requestOptions.mjs";
import { API_AUTH_REGISTER } from "./constants.mjs";

/**
 * Registers a new user account.
 *
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {boolean} venueManager - Whether user is a venue manager
 * @returns {Promise<Object>} Registration data or field-specific errors
 * @throws {Error} If network error occurs
 */

export const registerUser = async (
  name,
  email,
  password,
  venueManager = false
) => {
  try {
    const options = optionPost({
      name,
      email,
      password,
      venueManager,
    });
    const response = await fetch(API_AUTH_REGISTER, options);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.response = { data };
      throw error;
    }

    return data;
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
