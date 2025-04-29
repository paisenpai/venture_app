import { Link } from 'react-router-dom';

function Sidebar() {
  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/tasks", label: "Quests" },
    { path: "/achievements", label: "Achievements" },
    { path: "/progress", label: "Progress" },
    { path: "/character", label: "Character" },
    { path: "/settings", label: "Settings" },
  ];

  return (
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
  );
}

export default Sidebar;
