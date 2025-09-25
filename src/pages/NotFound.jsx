import { Link } from "react-router-dom";
import { assets } from "../assets/assets.mjs";

/**
 * NotFound page component.
 *
 * Renders a 404 error page with an image, message,
 * and a link to navigate back home.
 *
 * @returns {JSX.Element}
 */

export default function NotFound() {
  return (
    <>
      {" "}
      <div className="min-h-screen py-25 bg-background flex flex-col items-center justify-center text-center px-4">
        <img
          src={assets.no_page_found}
          alt="Page not found"
          className="w-fit sm:max-w-lg mb-6"
        />
        <h1 className="text-2xl sm:text-3xl text-text font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-text/80 text-lg mb-6">
          The sands shift, the winds change, but your way home is never lost.
          Click below to return.
        </p>
        <Link
          to="/"
          className="bg-primary text-text px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
