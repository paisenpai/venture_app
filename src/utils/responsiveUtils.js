/**
 * Initialize CSS variables for responsive sizing
 * This sets CSS variables that can be used throughout the application
 */
export const initializeResponsiveVars = () => {
  const updateVars = () => {
    // Get viewport dimensions
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Calculate proportional sizes
    const rootElement = document.documentElement;

    // Set responsive card sizes based on screen size
    let cardHeight, cardWidth;

    // Height calculations
    if (vh <= 640) {
      cardHeight = 200; // Small screens (minimum viable height)
    } else if (vh <= 768) {
      cardHeight = 240; // Medium screens
    } else {
      cardHeight = 240; // Large screens
    }

    // Width calculations
    if (vw <= 640) {
      cardWidth = Math.min(vw - 32, 340); // Small screens (full width minus margins)
    } else {
      cardWidth = 360; // Medium and larger screens
    }

    // Set CSS variables
    rootElement.style.setProperty("--card-height", `${cardHeight}px`);
    rootElement.style.setProperty("--card-width", `${cardWidth}px`);
    rootElement.style.setProperty("--viewport-height", `${vh}px`);
  };

  // Set initial values
  updateVars();

  // Update on resize and orientation change
  window.addEventListener("resize", updateVars);
  window.addEventListener("orientationchange", updateVars);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", updateVars);
    window.removeEventListener("orientationchange", updateVars);
  };
};

/**
 * Hook to ensure responsive variables are set
 */
export const useResponsiveVars = () => {
  useEffect(() => {
    const cleanup = initializeResponsiveVars();
    return cleanup;
  }, []);
};
