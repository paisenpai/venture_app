import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

// Sidebar navigation pages
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Achievements from './pages/Achievements';
import Progress from './pages/Progress';
import Character from './pages/Character';
import Settings from './pages/Settings';

// Authentication pages
import Login from './pages/Login';
import Register from './pages/Register';

// Layout
import Sidebar from './components/Sidebar';

// --- BaseTemplate Component ---
const BaseTemplate = ({ children }) => (
  <div className="base-template">
    <header className="base-header">
      <h1>Venture App</h1>
    </header>
    <main className="base-main">{children}</main>
    <footer className="base-footer">
      <small>&copy; {new Date().getFullYear()} Venture App. All rights reserved.</small>
    </footer>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <BaseTemplate>
      <div className="flex">
        {/* Sidebar */}
        {!hideSidebar && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/character" element={<Character />} />
            <Route path="/settings" element={<Settings />} />

            {/* Authentication Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BaseTemplate>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
