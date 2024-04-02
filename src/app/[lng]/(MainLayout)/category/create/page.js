"use client"
import React, { useContext } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Category } from "@/Utils/AxiosUtils/API";
import CategoryForm from "@/Components/category/CategoryForm";
import TreeForm from "@/Components/category/TreeForm";
import request from "@/Utils/AxiosUtils";
import SuccessHandle from "@/Utils/CustomFunctions/SuccessHandle";
import TableTitle from "@/Components/Table/TableTitle";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CategoryCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation((data) => request({ url: Category, data, method: "post" }), {
    onSuccess: (resData) => {
      SuccessHandle(resData, router, `${i18Lang}/category/create`, t("CategoryCreatedSuccessfully"));
      queryClient.invalidateQueries({ queryKey: [`${i18Lang}/category/create`] });
    },
  });
  return (
    <>
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <TableTitle moduleName="Category" type={'product'} onlyTitle={true} />
              <TreeForm type={"product"} isLoading={isLoading} />
            </CardBody>
          </Card>
        </Col>
        <Col xl="8">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("AddCategory")}</h5>
              </div>
              <CategoryForm loading={isLoading} mutate={mutate} type={"product"} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoryCreate;

