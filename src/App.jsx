import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Dashboard from './pages/Dashboard';
import Character from './pages/Character';
import Reports from './pages/Progress';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Achievements';
import Quests from './pages/Quests';
import Progress from './pages/Progress';


<AuthProvider>
  <UserProvider>
    <ThemeProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/character" element={<Character />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </UserProvider>
</AuthProvider>
