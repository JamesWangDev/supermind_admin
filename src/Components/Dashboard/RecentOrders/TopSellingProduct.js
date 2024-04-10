import { Table } from 'reactstrap'
import { topStoreOption } from '../../../Data/TabTitleListData'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import DashboardWrapper from '../DashboardWrapper'
import { product } from '../../../Utils/AxiosUtils/API'
import { useQuery } from '@tanstack/react-query'
import request from '../../../Utils/AxiosUtils'
import { useContext, useEffect } from 'react'
import Avatar from '../../CommonComponent/Avatar'
import placeHolderImage from '../../../../public/assets/images/placeholder.png'
import { dateFormate } from '../../../Utils/CustomFunctions/DateFormate'
import NoDataFound from '../../CommonComponent/NoDataFound'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const TopSellingProduct = ({ setFieldValue, values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    const { data, refetch, isLoading } = useQuery([product, values['filter_by']], () => request({ url: product, params: { status: 1, top_selling: 1, filter_by: values['filter_by']?.value, paginate: 5 } }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data });
    const onFilterChange = (name, value) => {
        setFieldValue("filter_by", value)
    }
    useEffect(() => {
        refetch();
    }, [values['filter_by']])
    return (
        <DashboardWrapper classes={{
            title: "TopSellingProduct", headerRight: <SearchableSelectInput
                nameList={[
                    {
                        name: "filter_by",
                        notitle: "true",
                        inputprops: {
                            name: "filter_by",
                            id: "filter_by",
                            options: topStoreOption || [],
                            value: values['filter_by'] ? values['filter_by']?.name : '',
                        },
                        store: "obj",
                        setvalue: onFilterChange
                    },
                ]}
            />
        }}>
            <div className="top-selling-table datatable-wrapper table-responsive">
                {isLoading && <div className="table-loader">
                    <span>{t("Pleasewait")}...</span>
                </div>}
                <Table>
                    <tbody>
                        {
                            data?.map((elem, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="img-info">
                                            <Avatar data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem} />
                                            <div>
                                                <h6>{dateFormate(elem?.created_at)}</h6>
                                                <h5>{elem?.name}</h5>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>{'price'}</h6>
                                        <h5>{elem?.sale_price}</h5>
                                    </td>
                                    <td>
                                        <h6>{'orders'}</h6>
                                        <h5>{elem?.orders_count}</h5>
                                    </td>
                                    <td>
                                        <h6>{'stock'}</h6>
                                        <h5>{elem?.quantity}</h5>
                                    </td>
                                    <td>
                                        <h6>{'amount'}</h6>
                                        <h5>{elem?.order_amount}</h5>
                                    </td>
                                </tr>
                            ))
                        }
                        {!data?.length && <tr>
                            <td>
                                <NoDataFound noImage={true} />
                            </td>
                        </tr>}
                    </tbody>
                </Table>
            </div>
        </DashboardWrapper>
    )
}

export default TopSellingProduct