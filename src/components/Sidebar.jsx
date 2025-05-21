import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FullLogoIcon from '../assets/icons/FullLogo.svg';
import settingsIcon from '../assets/icons/Settings.svg';
import SideBarButton from './SideBarButton';

const links = [
  { label: 'Dashboard', type: 'dashboard', path: '/' },
  { label: 'Quests', type: 'quest', path: '/quests' },
  { label: 'Achievements', type: 'achievements', path: '/achievements' },
  { label: 'Progress', type: 'progress', path: '/progress' },
  { label: 'Character', type: 'character', path: '/character' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setExpanded(false), 150);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen shadow-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex flex-col items-center z-30
        ${expanded ? 'w-[18rem]' : 'w-[7rem]'}
        transition-all duration-300`}
      style={{
        minWidth: expanded ? '18rem' : '7rem',
        background: '#FFFFFF',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo always at the top */}
      <div className="w-full flex flex-col items-center pt-8">
        <div className="mb-8">
          <img
            src={expanded ? FullLogoIcon : '/Logo.svg'}
            alt="Venture Logo"
            className={`rounded-xl ${expanded ? 'h-14' : 'w-14 h-14'}`}
          />
        </div>
      </div>
      {/* Nav buttons centered vertically */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <nav
          className={`flex flex-col items-center w-full ${
            expanded ? 'pl-4' : 'pl-0'
          }`}
        >
          {links.map(({ label, type, path }, idx) => (
            <SideBarButton
              key={path}
              type={type}
              label={label}
              selected={
                (type === 'character' && location.pathname.startsWith('/character')) ||
                (type !== 'character' && location.pathname === path)
              }
              showText={expanded}
              onClick={() => navigate(path)}
              // Remove mb-4 between nav buttons
              className={`${!expanded ? 'justify-center' : ''}`}
            />
          ))}
        </nav>
      </div>
      {/* Settings button with margin */}
      <div className="mb-8 w-full flex justify-center">
        <SideBarButton
          type="settings"
          label="Settings"
          selected={location.pathname.startsWith('/settings')}
          showText={expanded}
          onClick={() => navigate('/settings')}
          className="mt-4"
        />
      </div>
    </aside>
  );
}
