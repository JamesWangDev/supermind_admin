import React from "react";
import { Col } from "reactstrap";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import { AllCountryCode } from "../../Data/AllCountryCode";

const UserContact = () => {
  return (
    <Col sm="6">
      <div className="country-input mb-4 form-floating">
        <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: "EnterPhoneNumber", require: "true", nolabel: "true" }]} />
        <SearchableSelectInput
          nameList={[
            {
              name: "country_code",
              notitle: "true",
              inputprops: {
                name: "country_code",
                id: "country_code",
                options: AllCountryCode,
              },
            },
          ]}
        />
      </div>
    </Col>
  );
};

export default UserContact;
