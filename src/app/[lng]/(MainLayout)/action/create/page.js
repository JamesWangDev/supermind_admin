'use client'

import AllActionTabs from "@/Components/Superpower/ActionSuperpower/AllActionTabs";
import { Card, Col, Row } from "reactstrap";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext, useState } from "react";
import TabTitle from "@/Components/Coupon/TabTitle";
import { CreateActionTabTitleListData } from "@/Data/TabTitleListData";

const ActionsCreate = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");

    return (
        <Row className="theme-form theme-form-2 mega-form vertical-tabs">
            <Col>
            <Card>
                <div className="title-header option-title">
                <h5>{t("Actions")}</h5>
                </div>
                <Row>
                <Col xl="3" lg="4">
                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={CreateActionTabTitleListData} />
                </Col>
                <AllActionTabs activeTab={activeTab} />
                </Row>
            </Card>
            </Col>
        </Row>
        );
    };

export default ActionsCreate