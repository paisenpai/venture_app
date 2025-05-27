import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { initializeResponsiveVars } from "./utils/responsiveUtils";

const App = () => {
  // Initialize responsive CSS variables
  useEffect(() => {
    const cleanup = initializeResponsiveVars();
    return cleanup;
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
