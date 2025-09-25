import { optionPost } from "./requestOptions.mjs";
import { API_AUTH_LOGIN } from "./constants.mjs";

/**
 * Authenticates user login via API.
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Login response with user data and access token
 * @throws {Error} If login fails or network error occurs
 */

export const loginUser = async (email, password) => {
  try {
    const options = optionPost({ email, password });
    const response = await fetch(API_AUTH_LOGIN, options);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    if (error.response) {
      const errorData = error.response.data;
      const errorMessage = `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`;
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};
