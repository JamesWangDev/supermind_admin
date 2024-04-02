import React, { useContext, useEffect } from 'react'
import Btn from '../../../Elements/Buttons/Btn'
import useCreate from '../../../Utils/Hooks/useCreate';
import { OrderAPI } from '../../../Utils/AxiosUtils/API';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const PlaceOrder = ({ values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, mutate, isLoading } = useCreate(OrderAPI, false, false, false, (resDta) => {
    })
    const router = useRouter()
    useEffect(() => {
        if (data?.data) {
            router.push(`/order/details/${data?.data?.order_number}`)
        }
    }, [isLoading])
    const handleClick = () => {
        delete values['isPoint']
        delete values['isTimeSlot']
        delete values['isWallet']
        mutate(values)
    }
    return (
        <Btn className="btn btn-theme payment-btn mt-4" loading={Number(isLoading)} onClick={handleClick} disabled={values['consumer_id'] && values['billing_address_id'] && values['shipping_address_id'] && values['payment_method'] && values['delivery_description'] ? false : true}>
            {t("PlaceOrder")}
        </Btn>
    )
}

export default PlaceOrder