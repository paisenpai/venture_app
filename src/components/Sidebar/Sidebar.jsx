import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FullLogo from '/src/assets/icons/FullLogo.svg';
import Logo from '/src/assets/icons/Logo.svg'; // <-- Import Logo.svg
import SideBarButton from './SideBarButton';

const links = [
  { label: 'Dashboard', type: 'dashboard', path: '/' },
  { label: 'Quests', type: 'quest', path: '/quests' },
  { label: 'Achievements', type: 'achievements', path: '/achievements' },
  { label: 'Progress', type: 'progress', path: '/progress' },
  { label: 'Character', type: 'character', path: '/character' },
];

function Sidebar() {
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
      aria-label="Sidebar Navigation"
      className={`fixed left-0 top-0 h-screen shadow-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex flex-col items-center z-30
        bg-white transition-all duration-300
        ${expanded ? 'w-[18rem] min-w-[18rem]' : 'w-[7rem] min-w-[7rem]'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="w-full flex flex-col items-center pt-8">
        <div className="mb-8">
          <img
            src={expanded ? FullLogo : Logo} // <-- Use Logo.svg when collapsed
            alt="Logo"
            className={`rounded-xl ${expanded ? 'h-14' : 'w-14 h-14'}`}
          />
        </div>
      </div>
      {/* Nav buttons */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <nav className={`flex flex-col items-center w-full ${expanded ? 'pl-4' : 'pl-0'}`}>
          {links.map(({ label, type, path }) => (
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
              className={!expanded ? 'justify-center' : ''}
            />
          ))}
        </nav>
      </div>
      {/* Settings button */}
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

export default Sidebar;
