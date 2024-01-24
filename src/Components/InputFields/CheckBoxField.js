import { Field } from "formik";
import React from "react";
import { FormGroup } from "reactstrap";
import InputWrapper from "../../Utils/HOC/InputWrapper";

const CheckBoxField = ({ name, helpertext }) => {
  return (
    <FormGroup switch className="ps-0 form-switch form-check">
      <label className="switch">
        <Field type="checkbox" name={name} />
        <span className="switch-state"></span>
      </label>
      {helpertext && <p className="help-text">{helpertext}</p>}
    </FormGroup>
  );
};

export default InputWrapper(CheckBoxField);
