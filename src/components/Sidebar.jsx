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
    <aside className="w-64 h-screen bg-gray-100 p-4">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
