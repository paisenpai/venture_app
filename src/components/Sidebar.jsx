import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dashboardIcon from '../assets/icons/Dashboard.svg';
import questIcon from '../assets/icons/Quest.svg';
import achievementsIcon from '../assets/icons/Achievements.svg';
import progressIcon from '../assets/icons/Progress.svg';
import characterIcon from '../assets/icons/Character.svg';
import settingsIcon from '../assets/icons/Settings.svg';
import FullLogoIcon from '../assets/icons/FullLogo.svg';

const links = [
  { label: 'Dashboard', icon: dashboardIcon, path: '/' },
  { label: 'Quests', icon: questIcon, path: '/quests' },
  { label: 'Achievements', icon: achievementsIcon, path: '/achievements' },
  { label: 'Progress', icon: progressIcon, path: '/progress' },
  { label: 'Character', icon: characterIcon, path: '/character' },
];

const buttonBase =
  "w-16 h-16 p-4 bg-stone-50 rounded-full shadow-2xl flex items-center justify-start mb-4 transition-all duration-200";
const iconBase = "w-14 h-14 object-contain";

function SidebarButton({ icon, label, selected, showText, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        ${buttonBase}
        w-full flex-row items-center
        ${showText && selected ? 'bg-indigo-100 shadow-2xl' : 'bg-transparent shadow-none'}
        ${className}
      `}
      style={{ minWidth: '4rem', minHeight: '4rem' }}
      data-state={selected ? "Selected" : "NotSelected"}
      data-show-icon="true"
      data-show-text={showText ? "true" : "false"}
      type="button"
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        <img className={iconBase} src={icon} alt={label} />
      </div>
      {showText && (
        <span className="ml-4 text-left text-indigo-900 text-2xl font-bold font-['Typold'] flex-1">
          {label}
        </span>
      )}
    </button>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef();

  // Handlers to prevent flicker/glitch
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setExpanded(false), 150);
  };

  // Collapsed (base) form
  if (!expanded) {
    return (
      <aside
        className="fixed left-0 top-0 h-screen w-[7rem] bg-white shadow-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex flex-col justify-between items-center z-30"
        onMouseEnter={handleMouseEnter}
        style={{ minWidth: '7rem' }}
      >
        <div className="flex flex-col justify-between items-center w-full h-full py-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img className="w-14 h-14 rounded-xl mb-8" src="/Logo.svg" alt="Logo" />
          </div>
          {/* Nav buttons */}
          <div className="flex flex-col items-center flex-1 justify-center w-full">
            {links.map((link) => (
              <SidebarButton
                key={link.path}
                icon={link.icon}
                label={link.label}
                selected={location.pathname === link.path}
                showText={false}
                onClick={() => navigate(link.path)}
              />
            ))}
          </div>
          {/* Settings button */}
          <SidebarButton
            icon={settingsIcon}
            label="Settings"
            selected={location.pathname === '/settings'}
            showText={false}
            onClick={() => navigate('/settings')}
          />
        </div>
      </aside>
    );
  }

  // Expanded form (on hover)
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[18rem] bg-white shadow-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex flex-col justify-between items-center z-30 transition-all duration-300"
      style={{ minWidth: '18rem' }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex flex-col justify-between items-center w-full h-full py-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img className="h-14 mb-8" src={FullLogoIcon} alt="Venture Full Logo" />
        </div>
        {/* Nav buttons */}
        <div className="flex flex-col items-start flex-1 justify-center w-full pl-5">
          {links.map((link) => (
            <SidebarButton
              key={link.path}
              icon={link.icon}
              label={link.label}
              selected={location.pathname === link.path}
              showText={true}
              onClick={() => navigate(link.path)}
            />
          ))}
        </div>
        {/* Settings button */}
        <SidebarButton
          icon={settingsIcon}
          label="Settings"
          selected={location.pathname === '/settings'}
          showText={expanded}
          onClick={() => navigate('/settings')}
        />
      </div>
    </aside>
  );
}
