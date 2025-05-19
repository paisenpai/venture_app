// Side bar component "NOT DONE YET"
// This component is a sidebar that contains navigation buttons.
// It expands and collapses on hover.
// The sidebar contains a logo and a list of navigation links.


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarButton from './SideBarButton';

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { path: "/dashboard", label: "Dashboard", iconSrc: "/icons/Dashboard.svg" },
    { path: "/quest", label: "Quests", iconSrc: "/icons/quest.svg" },
    { path: "/achievements", label: "Achievements", iconSrc: "/icons/achievements.svg" },
    { path: "/progress", label: "Progress", iconSrc: "/icons/progress.svg" },
    { path: "/character", label: "Character", iconSrc: "/icons/character.svg" },
    { path: "/settings", label: "Settings", iconSrc: "/icons/settings.svg" },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        isHovered ? 'w-80' : 'w-28'
      } h-[1024px] py-10 bg-white rounded-tr-[36px] rounded-br-[36px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-start items-center gap-28`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? <ExpandedSidebar links={links} /> : <CollapsedSidebar />}
    </div>
  );
}

function ExpandedSidebar({ links }) {
  const navigate = useNavigate();

  return (
    <div className="w-80 h-[1024px] py-10 bg-white rounded-tr-[36px] rounded-br-[36px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-center items-center gap-28">
      <LogoWithTypeface />
      <div className="self-stretch pl-5 flex flex-col justify-center items-start gap-8">
        {links.map((link, index) => (
          <SideBarButton
            key={index}
            iconSrc={link.iconSrc}
            label={link.label}
            onClick={() => navigate(link.path)}
          />
        ))}
      </div>
    </div>
  );
}

function CollapsedSidebar() {
  return (
    <div
      data-property-1="Default"
      data-show-logo-typface="false"
      className="inline-flex justify-center items-center gap-5"
    >
      <Logo />
    </div>
  );
}

function LogoWithTypeface() {
  return (
    <div
      data-property-1="Default"
      data-show-logo-typface="true"
      className="inline-flex justify-center items-center gap-5"
    >
      <Logo />
      <div className="w-36 h-14 flex justify-center items-center flex-wrap content-center">
        <img
          className="flex-1 h-10"
          src="https://placehold.co/143x40"
          alt="Logo Typeface"
        />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 flex-wrap content-center">
      <img
        className="w-14 h-14 rounded-xl shadow-[1px_1px_3.299999952316284px_0px_rgba(38,33,110,0.64)]"
        src="https://placehold.co/60x60"
        alt="Logo"
      />
    </div>
  );
}

export default Sidebar;
