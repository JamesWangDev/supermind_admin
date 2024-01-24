
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../Components/CommonComponent/LogoWrapper/Logo";
import ToggleButton from "../../Components/CommonComponent/LogoWrapper/ToggleButton";
import RightNav from "./RightNav";
import SettingContext from "@/Helper/SettingContext";
import Image from "next/image";
import logoOne from '../../../public/assets/images/logo/1.png'
import SearchBar from "./SearchBar";

const Header = ({ setMode, setLtr, settingData }) => {
  const { state, sidebarOpen, setSidebarOpen } = useContext(SettingContext);
  const [mounted, setMounted] = useState(true);
  const [openSearchBar, setOpenSearchBar] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [])
  return (
    <div className={`page-header ${sidebarOpen ? "close_icon" : ""}`}>
      <div className={`header-wrapper m-0 ${mounted ? 'skeleton-header' : ""}`}>
        <div className="header-logo-wrapper p-0">
          <div className="logo-wrapper">
            <Logo settingData={settingData} />
          </div>
          <ToggleButton setSidebarOpen={setSidebarOpen} />
          <a className="d-lg-none d-block mobile-logo">
            <Image src={state?.setDarkLogo?.original_url || logoOne} height={21} width={120} alt="Dark Logo" />
          </a>
        </div>
        <SearchBar openSearchBar={openSearchBar} setOpenSearchBar={setOpenSearchBar} />
        <RightNav setMode={setMode} setLtr={setLtr} openSearchBar={openSearchBar} setOpenSearchBar={setOpenSearchBar} />
      </div>
    </div>
  );
};

export default Header;
