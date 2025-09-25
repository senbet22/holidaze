/**
 * Session storage utilities for user authentication and profile data.
 */

export function getAccessToken() {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}

/**
 * Gets user's profile name from session storage.
 *
 * @returns {string|null} Profile name or null if not found
 */
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
