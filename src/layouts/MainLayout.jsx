import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = () => {
  const [windowHeight, setWindowHeight] = useState("100vh");

  // Update height when window resizes or zooms
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    updateHeight();

    // Add event listeners
    window.addEventListener("resize", updateHeight);

    // Some browsers fire resize on zoom
    // For browsers that don't, we can use the wheel event with ctrl/cmd key
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || e.metaKey) {
        // Small delay to ensure zoom completes
        setTimeout(updateHeight, 100);
      }
    });

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("wheel", updateHeight);
    };
  }, []);

  return (
    <div
      className="flex min-h-screen w-full bg-gray-100"
      style={{ height: windowHeight, maxHeight: windowHeight }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <main
        className="flex-1 overflow-y-auto bg-[#ecf0f1] ml-[7rem] md:ml-[18rem] transition-all duration-300"
        style={{
          height: windowHeight,
          maxHeight: windowHeight,
          paddingLeft: "10%",
          paddingRight: "0%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
