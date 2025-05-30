import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FullLogo from "/src/assets/icons/FullLogo.svg";
import Logo from "/src/assets/icons/Logo.svg";
import SideBarButton from "./SideBarButton";
import classNames from "classnames";

const links = [
  { label: "Dashboard", type: "dashboard", path: "/" },
  { label: "Quests", type: "quest", path: "/quests" },
  // Removed achievement link
  { label: "Progress", type: "progress", path: "/progress" },
  { label: "Character", type: "character", path: "/character" },
];

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any pending collapse timeout
    setExpanded(true); // Expand the sidebar
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setExpanded(false), 150); // Collapse the sidebar after a delay
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <aside
      aria-label="Sidebar Navigation"
      className={classNames(
        "fixed left-0 top-0 h-screen shadow-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex flex-col items-center z-30 bg-white transition-all duration-300",
        {
          "w-[18rem] min-w-[18rem]": expanded, // Expanded width
          "w-[7rem] min-w-[7rem]": !expanded, // Collapsed width
        }
      )}
      onMouseEnter={handleMouseEnter} // Expand on hover
      onMouseLeave={handleMouseLeave} // Collapse when mouse leaves
    >
      {/* Logo */}
      <div className="w-full flex flex-col items-center pt-8">
        <div className="mb-8">
          <img
            src={expanded ? FullLogo : Logo}
            alt="App Logo"
            className={classNames("rounded-xl", {
              "h-14": expanded,
              "w-14 h-14": !expanded,
            })}
          />
        </div>
      </div>
      {/* Nav buttons */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <nav
          className={classNames("flex flex-col items-center w-full", {
            "pl-4": expanded,
            "pl-0": !expanded,
          })}
        >
          {links.map(({ label, type, path }) => (
            <SideBarButton
              key={path}
              type={type}
              label={label}
              selected={location.pathname === path} // Highlight the selected button
              showText={expanded} // Show text only when expanded
              onClick={() => navigate(path)} // Navigate to the selected path
              className={!expanded ? "justify-center" : ""}
            />
          ))}
        </nav>
      </div>
      {/* Settings button */}
      <div className="mb-8 w-full flex justify-center">
        <SideBarButton
          type="settings"
          label="Settings"
          selected={location.pathname.startsWith("/settings")}
          showText={expanded}
          onClick={() => navigate("/settings")}
          className="mt-4"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
