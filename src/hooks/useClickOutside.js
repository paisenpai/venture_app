import { useEffect } from "react";

/**
 * Hook that alerts when you click outside of the passed ref element
 * @param {React.RefObject} ref - React ref object for the element to detect clicks outside of
 * @param {Function} callback - Function to call when a click outside is detected
 */
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
