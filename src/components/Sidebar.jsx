import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/quest", label: "Quests" },
    { path: "/achievements", label: "Achievements" },
    { path: "/progress", label: "Progress" },
    { path: "/character", label: "Character" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        isHovered ? 'w-80' : 'w-28'
      } h-[1024px] py-10 bg-white rounded-tr-[36px] rounded-br-[36px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-start items-center gap-28`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className="w-80 h-[1024px] py-10 bg-white rounded-tr-[36px] rounded-br-[36px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-center items-center gap-28">
          <div
            data-property-1="Default"
            data-show-logo-typface="true"
            className="inline-flex justify-center items-center gap-5"
          >
            <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 flex-wrap content-center">
              <img
                className="w-14 h-14 rounded-xl shadow-[1px_1px_3.299999952316284px_0px_rgba(38,33,110,0.64)]"
                src="https://placehold.co/60x60"
                alt="Logo"
              />
            </div>
            <div className="w-36 h-14 flex justify-center items-center flex-wrap content-center">
              <img
                className="flex-1 h-10"
                src="https://placehold.co/143x40"
                alt="Logo Typeface"
              />
            </div>
          </div>
          <div className="self-stretch pl-5 flex flex-col justify-center items-start gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-4 text-lg font-medium text-gray-700 hover:text-blue-500"
              >
                <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div
          data-property-1="Default"
          data-show-logo-typface="false"
          className="inline-flex justify-center items-center gap-5"
        >
          <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 flex-wrap content-center">
            <img
              className="w-14 h-14 rounded-xl shadow-[1px_1px_3.299999952316284px_0px_rgba(38,33,110,0.64)]"
              src="https://placehold.co/60x60"
              alt="Logo"
            />
          </div>
        </div>
      )}
      <div className="self-stretch flex flex-col justify-center items-center gap-8">
        <aside className="sidebar">
          <ul className="menu list">
            {links.map((link) => (
              <li key={link.path} className="menu-item">
                <Link to={link.path} className="menu-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div
        data-show-icon="true"
        data-show-text="false"
        data-state="NotSelected"
        className="pt-28 rounded-[32px] inline-flex justify-center items-center"
      >
        <div className="w-8 h-8 flex justify-center items-center flex-wrap content-center"></div>
      </div>
    </div>
  );
}

export default Sidebar;
