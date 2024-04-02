import React from 'react'
import InvoiceSummary from './InvoiceSummary'
import ConsumerDetails from './ConsumerDetails'

const RightSidebar = ({ data }) => {
    return (
        <div className="sticky-top-sec">
            <InvoiceSummary data={data} />
            <ConsumerDetails data={data} />
        </div>
    )
}

export default RightSidebar