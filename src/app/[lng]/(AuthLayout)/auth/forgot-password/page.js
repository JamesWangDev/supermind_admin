"use client";
import React, { useContext, useState } from "react";
import { Col } from "reactstrap";
import { Field, Form, Formik } from "formik";
import ShowBox from "@/Elements/Alerts&Modals/ShowBox";
import LoginBoxWrapper from "@/Utils/HOC/LoginBoxWrapper";
import useHandleForgotPassword, {
  ForgotPasswordSchema,
} from "@/Utils/Hooks/Auth/useForgotPassword";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Btn from "@/Elements/Buttons/Btn";
import { ReactstrapInput } from "@/Components/ReactstrapFormik";

const ForgotPassword = () => {
  const [showBoxMessage, setShowBoxMessage] = useState();
  const { mutate, isLoading } = useHandleForgotPassword(setShowBoxMessage);

  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <div className="box-wrapper">
      <ShowBox showBoxMessage={showBoxMessage} />
      <LoginBoxWrapper>
        <div className="log-in-title">
          <h4>{t("ForgotPassword")}</h4>
        </div>
        <div className="input-box">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => mutate(values)}
          >
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field
                    name="email"
                    component={ReactstrapInput}
                    className="form-control"
                    id="email"
                    placeholder="Email Address"
                    label="EmailAddress"
                  />
                </Col>
                <Col sm="12">
                  <Btn
                    title="SendEmail"
                    className="btn btn-animation w-100 justify-content-center"
                    type="submit"
                    color="false"
                    loading={Number(isLoading)}
                  />
                </Col>
              </Form>
            )}
          </Formik>
        </div>
      </LoginBoxWrapper>
    </div>
  );
};
export default ForgotPassword;
