import { useContext, useEffect, useState } from "react";
import { addDays } from 'date-fns';
import { Col, Input, Label, Row } from "reactstrap";
import CheckBoxField from "../InputFields/CheckBoxField";
import { DateRange } from "react-date-range";
import { dateFormate } from "../../Utils/CustomFunctions/DateFormate";
import useOutsideDropdown from "../../Utils/Hooks/CustomHooks/useOutsideDropdown";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const ProductDateRangePicker = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
    const [state, setState] = useState([{
        startDate: new Date(values['sale_starts_at']),
        endDate: addDays(new Date(values['sale_expired_at']), 1),
        key: 'selection'
    }
    ]);
    useEffect(() => {
        if (state[0].startDate == state[0].endDate) {
            const updateDate = addDays(new Date(state[0].startDate), 1)
            setFieldValue("sale_starts_at", state[0].startDate)
            setFieldValue("sale_expired_at", updateDate)
        } else {
            setFieldValue("sale_starts_at", state[0].startDate)
            setFieldValue("sale_expired_at", state[0].endDate)
        }
    }, [state])
    return (
        <>
            <CheckBoxField name="is_sale_enable" title="SaleStatus" />
            <div className="input-error" ref={ref}>
                <Row className="mb-4 align-items-center g-md-4 g-2">
                    <Col sm={3}><Label className="col-form-label form-label-title">{t("StartDate")}</Label></Col>
                    <Col sm={9}>
                        {isComponentVisible == "startDate" && <DateRange
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            definedRangesWrapper={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                        />}
                        <Input value={dateFormate(values['sale_starts_at'], true)} readOnly onClick={() => setIsComponentVisible((prev) => prev != "startDate" ? "startDate" : "")} />
                    </Col>
                </Row>
            </div>
            <div className="input-error">
                <Row className="mb-4 align-items-center g-md-4 g-2">
                    <Col sm={3}><Label className="col-form-label form-label-title">{t("EndDate")}</Label></Col>
                    <Col sm={9}>
                        {isComponentVisible == 'endDate' && <DateRange
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            definedRangesWrapper={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                        />}
                        <Input placeholder="YYYY-DD-MM" value={dateFormate(values['sale_expired_at'], true)} readOnly onClick={() => setIsComponentVisible((prev) => prev != "endDate" ? "endDate" : "")} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProductDateRangePicker