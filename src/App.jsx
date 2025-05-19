import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

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

// Layout and fallback
import Sidebar from './components/Sidebar'; // Import Sidebar component
import NotFound from './pages/NotFound'; // Import NotFound page for fallback

const App = () => (
  <Router>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />

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

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </Router>
);

export default App;
