import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import request from "../../Utils/AxiosUtils";
import Loader from "../CommonComponent/Loader";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const PermissionTable = ({ values, errors, touched, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [checked, setChecked] = useState();
  const { data, isLoading } = useQuery(["module"], () => request({ url: "module" }), {
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      return data?.data?.map((role) => {
        return {
          name: role.name,
          module_permissions: role.module_permissions.map((permission) => {
            return { permission_id: Number(permission.permission_id), name: permission.name };
          }),
        };
      });
    },
  });
  const handleAllCheckUncheck = (e, permissionArray) => {
    touched.permissions = true;
    setChecked(!checked);
    e.target.checked
      ? values.permissions.push(...permissionArray.filter((permission) => !values.permissions.includes(permission)))
      : permissionArray.map((permission) => {
        values.permissions.splice(values.permissions.indexOf(permission), 1);
      });
  };

  const handleCheckUncheck = (e, id, obj) => {
    touched.permissions = true;
    setChecked(!checked);
    if (e.target.checked) {
      const getIndexId = obj?.module_permissions?.find((elem) => elem.name == "index")
      let removeDup = [id, getIndexId.permission_id]
      !values.permissions.includes(id) && values.permissions.push(...[...new Set(removeDup)])
    } else {
      values.permissions.splice(values.permissions.indexOf(id), 1)
    }
  };

  const handleCheckOnIndex = (permissionTitles) => {
    touched.permissions = true;
    setChecked(!checked);
    let mapArray = permissionTitles?.module_permissions.map((elem) => elem.permission_id)
    let newArr = values?.permissions?.filter((elem) => !mapArray.includes(elem))
    setFieldValue('permissions', [...new Set(newArr)])
  }
  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <div className="mb-3">
        <h4 className="form-label-title">{t("Permissions")}<span className="theme-color ms-2 required-dot">*</span></h4>
        {touched.permissions && !values.permissions.length && errors["permissions"] && <p className="text-danger">{errors["permissions"] && t(`Permissionisrequired`)}</p>}
      </div>
      <div className="theme-form theme-form-2 mega-form">
        <Row className="roles-form g-3">
          {data?.map((permissionTitles, i) => (
            <Col xs="12" key={i}>
              <ul>
                <li>{permissionTitles.name.includes('_')?permissionTitles.name.replace('_',' '):permissionTitles.name}:</li>
                <li>
                  <FormGroup switch>
                    <Input className="checkbox_animated" id={permissionTitles.name} name="permissions" type="switch"
                      checked={permissionTitles.module_permissions.every((data) => values.permissions?.includes(data.permission_id))} onChange={(e) => handleAllCheckUncheck(e, permissionTitles.module_permissions.map((permission) => permission.permission_id))} />
                    <Label className="form-check-label m-0" htmlFor={permissionTitles.name}>{t("All")}</Label>
                  </FormGroup>
                </li>
                {permissionTitles.module_permissions.map((permissionDetails, i) => (
                  <li key={i}>
                    <FormGroup switch>
                      <Input className="checkbox_animated" id={"role" + permissionDetails.permission_id} type="switch" name="permissions" checked={values.permissions?.includes(permissionDetails.permission_id) && true} onChange={(e) => (permissionDetails.name == 'index') && (values.permissions.includes(permissionDetails.permission_id)) ? handleCheckOnIndex(permissionTitles) : handleCheckUncheck(e, permissionDetails.permission_id, permissionTitles)} />
                      <Label className="form-check-label m-0" htmlFor={"role" + permissionDetails.permission_id}>
                        {permissionDetails.name}
                      </Label>
                    </FormGroup>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default PermissionTable;
