import React, { useContext, useEffect, useState } from 'react'
import { OrderAPI, OrderStatusAPI } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import OrderNumberTable from './OrderNumberTable';
import { Col, Row } from 'reactstrap';
import Loader from '../../CommonComponent/Loader';
import OrderDetailsTable from './OrderDetailsTable';
import TrackingPanel from './TrackingPanel';
import RightSidebar from './RightSidebar';
import useCreate from '../../../Utils/Hooks/useCreate';
import usePermissionCheck from '../../../Utils/Hooks/usePermissionCheck';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const OrderDetailsContain = ({ updateId }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [edit] = usePermissionCheck(["edit"]);
    const [orderStatus, setOrderStatus] = useState("")

    // Getting Data from Order API for Order_Number
    const { data, isLoading, refetch } = useQuery(["category/" + updateId], () => request({ url: `${OrderAPI}/${updateId}` }), { refetchOnWindowFocus: false, select: (res) => { return res.data } });

    // Getting Data from Order Status API
    const { data: orderStatusData, refetch: orderStatusRefetch, isLoading: orderStatusLoader } = useQuery([OrderStatusAPI], () => request({ url: OrderStatusAPI }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });

    // Update Status in Order API
    const { data: orderStatusUpdate, mutate } = useCreate(OrderAPI, data?.id, false, "No");

    useEffect(() => {
        if (data) {
            setOrderStatus(data?.order_status)
        }
    }, [isLoading])

    useEffect(() => {
        refetch()
        orderStatusRefetch()
    }, [])
    if (isLoading || orderStatusLoader) return <Loader />;
    return (
        <Row>
            <Col xxl="9">
                {!data?.sub_orders?.length > 0 && <div className="mb-4">
                    <div className="tracking-panel">
                        <TrackingPanel orderStatusData={orderStatusData} orderStatus={orderStatus} mutate={mutate} />
                    </div>
                </div>}
                <Col sm="12">
                    <OrderNumberTable moduleName={`${t('OrderNumber')}: #${data?.order_number}`} data={data} orderStatusData={orderStatusData} setOrderStatus={setOrderStatus} orderStatus={orderStatus} mutate={mutate} orderStatusUpdate={orderStatusUpdate} edit={edit} />
                </Col>
                {data?.sub_orders?.length > 0 &&
                    <Col sm="12">
                        <OrderDetailsTable moduleName={`OrderDetails`} data={data} />
                    </Col>
                }
            </Col >
            <Col xxl="3">
                <RightSidebar data={data} />
            </Col>
        </Row >
    )
}

export default OrderDetailsContain