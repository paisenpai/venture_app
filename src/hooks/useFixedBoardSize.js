import { useMemo } from "react";

/**
 * Custom hook to ensure consistent board dimensions across all views
 */
const useFixedBoardSize = () => {
  return useMemo(
    () => ({
      width: "w-[360px]",
      height: "h-[240px]", // Increased height from 220px to 240px
      widthPx: "360px",
      heightPx: "240px", // Increased height from 220px to 240px
    }),
    []
  );
};

export default useFixedBoardSize;
