import { getAccessToken } from "./sessionStorage.mjs";
import { API_KEY } from "./constants.mjs";

/**
 * HTTP request options for API calls.
 *
 * Provides configured fetch options for different HTTP methods with proper headers,
 * authorization tokens, and API keys where required.
 */

export const optionGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const optionGetProfile = () => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
    "X-Noroff-API-Key": API_KEY,
  },
});

export const optionPost = (postReq) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
    "X-Noroff-API-Key": API_KEY,
  },
  body: JSON.stringify(postReq),
});

export const optionPut = (putReq) => ({
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
    "X-Noroff-API-Key": API_KEY,
  },
  body: JSON.stringify(putReq),
});

export const optionDelete = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
    "X-Noroff-API-Key": API_KEY,
  },
};
