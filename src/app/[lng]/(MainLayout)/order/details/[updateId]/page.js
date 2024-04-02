'use client'
import OrderDetailsContain from '@/Components/Orders/Details';

const OrderDetails = ({ params }) => {
    return (
        params?.updateId && (
            <OrderDetailsContain updateId={params?.updateId} />
        )
    )
}

export default OrderDetails