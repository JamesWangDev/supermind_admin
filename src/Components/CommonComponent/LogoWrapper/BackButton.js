import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const BackButton = ({ setSidebarOpen }) => {
  return (
    <div className="back-btn">
      <FaAngleLeft onClick={() => setSidebarOpen((prev) => !prev)} />
    </div>
  );
};

export default BackButton;
