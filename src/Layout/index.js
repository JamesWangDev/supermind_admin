'use client'
import React, { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Container } from "reactstrap";
import ConvertPermissionArr from "../Utils/CustomFunctions/ConvertPermissionArr";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { replacePath } from "../Utils/CustomFunctions/ReplacePath";
import I18NextContext from "@/Helper/I18NextContext";

const Layout = (props) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);
  useEffect(() => {
    if (i18Lang == "") {
      setI18Lang(props.lng);
    }
  }, [props.lng]);
  const [mode, setMode] = useState(false);
  const [ltr, setLtr] = useState(true);
  const router = useRouter();
  const path = usePathname();
  let data1 = {};
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) data1 = localStorage.getItem("account") && JSON.parse(localStorage.getItem("account"));
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    mode ? document.body.classList.add("dark-only") : document.body.classList.remove("dark-only");
  }, [mode, ltr]);
  useEffect(() => {
    const securePaths = mounted && ConvertPermissionArr(data1?.permissions);
    if (mounted && !securePaths.find((item) => item?.name == replacePath(path?.split("/")[2]))) {
      router.push("/403");
    }
  }, [data1]);
  return (
    <>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header setMode={setMode} setLtr={setLtr} settingData={'settingData'} />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">
            <Container fluid={true}>
              {props.children}
            </Container>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
