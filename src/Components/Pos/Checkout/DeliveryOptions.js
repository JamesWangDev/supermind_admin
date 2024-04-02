import React, { useContext } from "react";
import { RiTruckLine } from "react-icons/ri";
import { Col, Input, Label, Row } from "reactstrap";
import CheckoutCard from "./common/CheckoutCard";
import SettingContext from "@/Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const DeliveryOptions = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext)
  return (
    <CheckoutCard icon={<RiTruckLine />}>
      <div className="checkout-title">
        <h4>{t("DeliveryOption")}</h4>
      </div>
      {values['consumer_id'] ? <div className="checkout-detail">
        <Row className="g-4">
          <Col xxl={6}>
            <div className="delivery-option">
              <div className="delivery-category">
                <div className="shipment-detail w-100">
                  <div className="form-check custom-form-check hide-check-box">
                    <Input className="form-check-input" type="radio" name="standard" id="standard1" onChange={() => {
                      setFieldValue("delivery_description", `${state?.setDelivery?.default?.title} | ${state?.setDelivery?.default?.description}`);
                      setFieldValue('isTimeSlot', false)
                      setFieldValue("delivery_interval", null);
                    }} />
                    <Label className="form-check-label" htmlFor="standard1">
                      {state?.setDelivery?.default?.title} | {state?.setDelivery?.default?.description}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {state?.setDelivery?.same_day_delivery &&
            <>
              <Col xxl={6}>
                <div className="delivery-option">
                  <div className="delivery-category">
                    <div className="shipment-detail w-100">
                      <div className="form-check custom-form-check hide-check-box">
                        <Input className="form-check-input" type="radio" name="standard" id="standard2" onChange={() => {
                          setFieldValue("delivery_description", `${state?.setDelivery?.same_day?.title} | ${state?.setDelivery?.same_day?.description}`);
                          setFieldValue('isTimeSlot', true)
                          setFieldValue("delivery_interval", null);
                        }} />
                        <Label className="form-check-label" htmlFor="standard2">
                          {state?.setDelivery?.same_day?.title} | {state?.setDelivery?.same_day?.description}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" className={`future-box ${values['isTimeSlot'] ? 'show' : ""}`}>
                <div className="future-option">
                  <div className="delivery-items">
                    <div>
                      <h4>{t("Selecttimingslot")}:</h4>
                      <ul>
                        {state?.setDelivery?.same_day_intervals.length > 0 && state?.setDelivery?.same_day_intervals.map((elem, i) => (
                          <li className={`${values['delivery_interval'] == elem?.description ? "active" : ""}`} onClick={() => {
                            setFieldValue('delivery_interval', elem?.description)
                          }} key={i}>
                            <a href="#javascript">{elem?.description}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          }
        </Row>
      </div >
        : <div className="empty-box">
          <h2>{t("NoDeliveryOptionFound")}</h2>
        </div>}
    </CheckoutCard >
  );
}

export default DeliveryOptions;
