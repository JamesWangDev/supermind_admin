import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Avatar from '@/Components/CommonComponent/Avatar';
import SettingContext from '@/Helper/SettingContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const NumberTable = ({ data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className="tracking-wrapper table-responsive">
            <Table className="product-table">
                <thead>
                    <tr>
                        <th scope="col">{t("Image")}</th>
                        <th scope="col">{t("Name")}</th>
                        <th scope="col">{t("Price")}</th>
                        <th scope="col">{t("Quantity")}</th>
                        <th scope="col">{t("Subtotal")}</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((elem, index) => (
                        <tr key={index}>
                            <td className="product-image">
                                <Avatar customeClass={'img-fluid'} data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.name} />
                            </td>
                            <td>
                                <h6>{elem?.pivot?.variation ? elem?.pivot?.variation?.name : elem?.name}</h6>
                            </td>
                            <td>
                                <h6>{convertCurrency(elem?.pivot?.single_price)}</h6>
                            </td>
                            <td>
                                <h6>{elem?.pivot.quantity}</h6>
                            </td>
                            <td>
                                <h6>{convertCurrency(elem?.pivot.subtotal)}</h6>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default NumberTable