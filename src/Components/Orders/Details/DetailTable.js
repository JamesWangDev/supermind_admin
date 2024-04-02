import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import { RiEyeLine } from 'react-icons/ri'
import Link from 'next/link'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'
import SettingContext from '@/Helper/SettingContext'
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate'

const DetailTable = ({ data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className='table-responsive'>
            <Table className="table all-package theme-table no-footer">
                <thead>
                    <tr>
                        <th scope="col">{t("OrderNumber")}</th>
                        <th scope="col">{t("OrderDate")}</th>
                        <th scope="col">{t("TotalAmount")}</th>
                        <th scope="col">{t("Action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.sub_orders?.map((elem, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <h6>#{elem?.order_number}</h6>
                                </td>
                                <td>
                                    <h6>{dateFormate(elem?.created_at)}</h6>
                                </td>
                                <td>
                                    <h6>{convertCurrency(elem?.amount)}</h6>
                                </td>
                                <td>
                                    <Link href={`${elem?.order_number}`}>
                                        <RiEyeLine />
                                    </Link>
                                </td>
                            </tr >
                        )
                    })}
                </tbody >
            </Table>
        </div>
    )
}

export default DetailTable