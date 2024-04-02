"use client";
import PermissionForm from "@/Components/Role/PermissionForm";
import I18NextContext from "@/Helper/I18NextContext";
import { role } from "@/Utils/AxiosUtils/API";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const UserUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useUpdate(role,params?.updateId,`/${i18Lang}/role`);
  return (
    params?.updateId && (
      <Row>
        <Col xxl="8" lg="10" className="m-auto">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("UpdateRole")}</h5>
              </div>
              <PermissionForm
                mutate={mutate}
                updateId={params?.updateId}
                loading={isLoading}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default UserUpdate;
