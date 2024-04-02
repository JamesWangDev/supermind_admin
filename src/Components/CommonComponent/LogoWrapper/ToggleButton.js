import React from "react";
import { RiAppsLine } from "react-icons/ri";

const ToggleButton = ({ setSidebarOpen }) => {
  return (
    <div className="toggle-sidebar">
      <RiAppsLine onClick={() => setSidebarOpen((prev) => !prev)} />
    </div>
  );
};

export default ToggleButton;
