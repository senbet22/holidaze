import axios from "axios";
import { API_AUTH_LOGIN } from "./constants.mjs";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_AUTH_LOGIN, {
      email,
      password,
    });
    return response.data;
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
