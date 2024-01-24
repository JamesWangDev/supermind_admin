import React, { useContext, useEffect, useState } from "react";
import { addDays } from 'date-fns';
import { Col, Input, Label, Row } from "reactstrap";
import { DateRange } from "react-date-range";
import CheckBoxField from "../InputFields/CheckBoxField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import { dateFormate } from "../../Utils/CustomFunctions/DateFormate";
import useOutsideDropdown from "../../Utils/Hooks/CustomHooks/useOutsideDropdown";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const GeneralTabContent = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const [state, setState] = useState([{
    startDate: new Date(values['start_date']),
    endDate: addDays(new Date(values['end_date']), 1),
    key: 'selection'
  }
  ]);
  useEffect(() => {
    if (state[0].startDate == state[0].endDate) {
      const updateDate = addDays(new Date(state[0].startDate), 1)
      setFieldValue("start_date", state[0].startDate)
      setFieldValue("end_date", updateDate)
    } else {
      setFieldValue("start_date", state[0].startDate)
      setFieldValue("end_date", state[0].endDate)
    }
  }, [state])

  return (
    <>
      <SimpleInputField nameList={[{ name: "title", require: "true", placeholder: t("EnterTitle") }, { name: "description", require: "true", placeholder: t("EnterDescription") }, { name: "code", require: "true", placeholder: t("EnterCode") }]} />
      <SearchableSelectInput
        nameList={[
          {
            name: "type",
            title: "Type",
            require: "true",
            inputprops: {
              name: "type",
              id: "type",
              options: [
                { id: "free_shipping", name: "Free Shipping" },
                { id: "fixed", name: "Fixed" },
                { id: "percentage", name: "Percentage" },
              ],
            },
          },
        ]}
      />
      {values["type"] !== "free_shipping" && <SimpleInputField nameList={[{ name: "amount", type: "number", require: "true", inputaddon: "true", placeholder: t("EnterAmount") }]} />}
      <CheckBoxField name="is_expired" title="IsExpired" />
      {values["is_expired"] && (
        <>
          <div className="input-error" ref={ref}>
            <Row className="mb-4 align-items-center">
              <Col sm={2}><Label className="col-form-label form-label-title">{t("StartDate")}</Label></Col>
              <Col sm={10}>
                {isComponentVisible == "startDate" && <DateRange
                  onChange={item => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  definedRangesWrapper={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />}
                <Input value={dateFormate(values['start_date'], true)} readOnly onClick={() => setIsComponentVisible((prev) => (prev != "startDate" ? "startDate" : ""))} />
              </Col>
            </Row>
          </div>
          <div className="input-error">
            <Row className="mb-4 align-items-center">
              <Col sm={2}><Label className="col-form-label form-label-title">{t("EndDate")}</Label></Col>
              <Col sm={10}>
                {isComponentVisible == 'endDate' && <DateRange
                  onChange={item => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  definedRangesWrapper={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />}
                <Input placeholder="YYYY-DD-MM" value={dateFormate(values['end_date'], true)} readOnly onClick={() => setIsComponentVisible((prev) => (prev != "endDate" ? "endDate" : ""))} />
              </Col>
            </Row>
          </div>
        </>
      )}
      <CheckBoxField name="is_first_order" title="IsFirstOrder" />
      <CheckBoxField name="status" />
    </>
  );
};

export default GeneralTabContent;
