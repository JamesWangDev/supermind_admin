'use client'
import React, { useContext, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import { RiCoinsLine } from "react-icons/ri";
import { Form, Formik } from "formik";
import SelectUser from "@/Components/Wallet/SelectUser";
import SeleteWalletPrice from "@/Components/Wallet/SeleteWalletPrice";
import UserTransationsTable from "@/Components/Wallet/UserTransationsTable";
import { PointCredit, PointDebit, PointUserTransations } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { YupObject, nameSchema } from "@/Utils/Validation/ValidationSchemas";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Point = () => {
  const [isValue, setIsValue] = useState("");
  const [credit, debit] = usePermissionCheck(["credit", "debit"]);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const refRefetch = useRef();
  const { mutate: createPointCredit, isLoading: creditLoader } = useCreate(PointCredit, false, "/point", false, () => {
    refRefetch.current.call();
  });
  const { mutate: createPointDebit, isLoading: debitLoader } = useCreate(PointDebit, false, "/point", false, () => {
    refRefetch.current.call();
  });
  return (
    <div className="save-back-button">
      <Formik
        initialValues={{
          consumer_id: "",
          showBalance: "",
          balance: "",
        }}
        validationSchema={YupObject({ consumer_id: nameSchema })}
        onSubmit={(values, { setFieldValue }) => {
          if (isValue == "credit") {
            createPointCredit(values);
          } else {
            createPointDebit(values);
          }
          setFieldValue("balance", "");
        }}
      >
        {({ values, handleSubmit, setFieldValue, errors }) => (
          <>
            <Form>
              <Row>
                <SelectUser title={t("SelectCustomer")} values={values} setFieldValue={setFieldValue} errors={errors} name={"consumer_id"} role="consumer" />
                <SeleteWalletPrice values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setIsValue={setIsValue} creditLoader={creditLoader} debitLoader={debitLoader} title={t("Point")} description={t("PointBalance")} selectUser={"consumer_id"} icon={<RiCoinsLine />} isCredit={credit} isDebit={debit} />
              </Row>
            </Form>
            <Col sm="12">{values["consumer_id"] !== "" && <UserTransationsTable url={values["consumer_id"] ? PointUserTransations : ""} moduleName="UserTransations" setFieldValue={setFieldValue} userIdParams={true} ref={refRefetch} dateRange={true} paramsProps={{ consumer_id: values["consumer_id"] ? values["consumer_id"] : null }} />}</Col>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Point;