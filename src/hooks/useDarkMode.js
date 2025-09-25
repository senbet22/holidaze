import { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";

/**
 * Custom hook to access dark mode context.
 *
 * @returns {object} { isDarkMode: boolean, toggleDarkMode: function }
 */

export const useDarkMode = () => useContext(DarkModeContext);
