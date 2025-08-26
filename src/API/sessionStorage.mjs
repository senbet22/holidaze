/**
 * Retrieves the access token from sessionStorage.
 * @returns {string|null} The access token if it exists, otherwise null.
 */

export function getAccessToken() {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}

export function getProfileName() {
  const storedProfile = sessionStorage.getItem("DunestayProfile");

  if (!storedProfile) return null;

  try {
    const parsedProfile = JSON.parse(storedProfile);
    return parsedProfile?.name || null;
  } catch (error) {
    console.error("Failed to parse DunestayProfile:", error);
    return null;
  }
}
