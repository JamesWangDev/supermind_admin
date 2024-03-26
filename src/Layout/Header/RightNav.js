import React, { useContext, useState } from "react";
import Link from "next/link";
import { RiFullscreenExitLine, RiFullscreenFill, RiGlobalLine, RiMoonLine, RiSearchLine } from "react-icons/ri";
import { Button, Col } from "reactstrap";
import useOutsideDropdown from "../../Utils/Hooks/CustomHooks/useOutsideDropdown";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import Language from "./Language";
import NotificationBox from "./NotificationBox";
import ProfileNav from "./ProfileNav";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import QuickLinks from "./QuickLinks";
import SettingContext from "@/Helper/SettingContext";
import { createNewConnectedAccount } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import Btn from "@/Elements/Buttons/Btn";

const RightNav = ({ setMode, setOpenSearchBar }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [isOrderCreate] = usePermissionCheck(["create"], "order");
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const { settingObj } = useContext(SettingContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFullScreen = () => {

    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      setIsFullScreen(prev => prev = true);
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      setIsFullScreen(prev => prev = false);
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const createConnectedAccount = () => {
    setIsLoading(true);
    request({url: createNewConnectedAccount})
      .then(response => {
        setIsLoading(false);
        window.open(response.data.url, '_blank');
      })
  }

  return (
    <Col className="nav-right pull-right right-header p-0">
      <div className="header-btns d-none d-lg-flex">
        <QuickLinks isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible}/>
        <Btn loading={isLoading} onClick={createConnectedAccount} className="btn btn-primary">{t("Connect Stripe")}</Btn>
      </div>
      <ul className="nav-menus" ref={ref}>
        <li>
          <span className="header-search" onClick={() => setOpenSearchBar(true)}>
            <RiSearchLine />
          </span>
        </li>
        <li>
          <a className="global-box" href={settingObj?.general?.site_url} target="_blank">
            <RiGlobalLine />
          </a>
        </li>
        <li>
          <div className="full-screen-box">
          {isFullScreen?
            <RiFullscreenExitLine className="header-fullscreen" onClick={toggleFullScreen} />
            :
            <RiFullscreenFill className="header-fullscreen" onClick={toggleFullScreen} />
          }
          </div>
        </li>
        <Language isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
        <NotificationBox isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
        <li>
          <div className="mode">
            <RiMoonLine className="ri-moon-line" onClick={() => setMode((prev) => !prev)} />
          </div>
        </li>
        <ProfileNav isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
      </ul>
    </Col>
  );
};

export default RightNav;
