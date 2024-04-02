import React, { useEffect } from 'react'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'

const UpdateStatus = ({ orderStatusData, values, setFieldValue, data, setOrderStatus, orderStatus, mutate, orderStatusUpdate }) => {

    const onStatusChange = (name, value) => {
        setFieldValue('order_status_id', value)
        mutate({
            _method: "put",
            order_status_id: value.id
        })
    }
    useEffect(() => {
        if (orderStatusUpdate?.status == 200 || orderStatusUpdate?.status == 201) {
            setOrderStatus(values['order_status_id'])
        }
    }, [orderStatusUpdate])
    return (
        <>
            <SearchableSelectInput
                nameList={[
                    {
                        name: "order_status_id",
                        notitle: "true",
                        inputprops: {
                            name: "order_status_id",
                            id: "order_status_id",
                            options: orderStatusData || [],
                            value: orderStatus ? orderStatus?.name : '',
                        },
                        store: "obj",
                        setvalue: onStatusChange,
                    },
                ]}
            />
        </>
    )
}

export default UpdateStatus