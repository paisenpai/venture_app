import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/**
 * A component that renders its children in a portal outside the normal DOM hierarchy
 * to avoid overflow/positioning issues with menus
 */
const MenuPortal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  // Ensure portal root exists
  let portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = "portal-root";
    document.body.appendChild(portalRoot);
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!portalRoot.contains(event.target) || portalRoot === event.target) {
        // Close handled at the parent level
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [portalRoot]);

  return ReactDOM.createPortal(children, portalRoot);
};

MenuPortal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default MenuPortal;
