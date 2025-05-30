import { useEffect } from "react";

/**
 * Hook that calls a function when the escape key is pressed
 * @param {Function} callback - Function to call when escape key is pressed
 */
export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") callback();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [callback]);
};

export default useEscapeKey;
