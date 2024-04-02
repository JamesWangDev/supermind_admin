import { Col, Label } from 'reactstrap'
import { Field } from 'formik'
import { ReactstrapRadio } from '../../ReactstrapFormik'
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const ShowAddress = ({ item, data, type, index }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Col xxl={6} md={6}>
            <Label htmlFor={`address-${type}-${index}`}>
                <div className="delivery-address-box">
                    <div>
                        <div className="form-check">
                            <Field component={ReactstrapRadio} id={`address-${type}-${index}`} className="form-check-input" type="radio" name={`${type}_address_id`} value={item.id} />
                        </div>
                        <ul className="delivery-address-detail">
                            <li>
                                <h4 className="fw-semibold">{item?.title}</h4>
                            </li>
                            <li>
                                <p className="text-content">
                                    <span className="text-title">{t("Address")} : </span>
                                    {item?.street} {item?.state?.name}, {item?.country?.name}
                                </p>
                            </li>
                            <li>
                                <h6 className="text-content">
                                    <span className="text-title">{t("PinCode")} :</span> {item?.pincode}
                                </h6>
                            </li>
                            <li>
                                <h6 className="text-content mb-0">
                                    <span className="text-title">{t("Phone")} :</span> {data?.country_code && `+${data?.country_code}`} {data?.phone}
                                </h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </Label>
        </Col >
    )
}

export default ShowAddress