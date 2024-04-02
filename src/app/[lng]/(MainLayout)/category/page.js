"use client";
import { useContext, useRef, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import TreeForm from "@/Components/category/TreeForm";
import { Category, CategoryExportAPI, CategoryImportAPI } from "@/Utils/AxiosUtils/API";
import CategoryForm from "@/Components/category/CategoryForm";
import { RiLockLine } from "react-icons/ri";
import TableTitle from "@/Components/Table/TableTitle";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";
import useCreate from "@/Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CategoryCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [create] = usePermissionCheck(["create"]);
  const refRefetch = useRef()
  const[resetData, setResetData] = useState(false)
  const { mutate, isLoading } = useCreate(Category, false, false, false, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refRefetch?.current?.call()
      setResetData(true)
    }
  });
  return (
    <>
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <TableTitle moduleName="Category" type={'product'} onlyTitle={true} importExport={{ importUrl: CategoryImportAPI, exportUrl: CategoryExportAPI}}/>
              <TreeForm type={"product"} isLoading={isLoading} ref={refRefetch} />
            </CardBody>
          </Card>
        </Col>
        <Col xl="8">
          <Card className={create ? "" : "nopermission-parent"}>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("AddCategory")}</h5>
              </div>
              <CategoryForm loading={isLoading} mutate={mutate} key={resetData} type={"product"} />
            </CardBody>
            <div className="no-permission"><div><RiLockLine /><h3>{t("NoPermission")}</h3></div></div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoryCreate;
