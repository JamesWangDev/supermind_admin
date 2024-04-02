import Image from 'next/image';
import cancelledImg from '../../../../public/assets/images/tracking/cancelled.svg'
import deliveredImg from '../../../../public/assets/images/tracking/delivered.svg'
import outForDeliveryImg from '../../../../public/assets/images/tracking/out-for-delivery.svg'
import pendingImg from '../../../../public/assets/images/tracking/pending.svg'
import processingImg from '../../../../public/assets/images/tracking/processing.svg'
import shippedImg from '../../../../public/assets/images/tracking/shipped.svg'

const TrackingPanel = ({ orderStatusData, orderStatus }) => {
    const imageObj = {
        pending: processingImg,
        processing: pendingImg,
        cancelled: cancelledImg,
        shipped: shippedImg,
        delivered: deliveredImg,
        "out-for-delivery": outForDeliveryImg,
    }
    return (
        <ul>
            {
                orderStatusData?.map((elem, index) => (
                    <li className={(elem?.sequence >= orderStatus?.sequence && orderStatus?.slug == 'cancelled') || elem?.slug == 'cancelled' ? "d-none" : elem?.sequence <= orderStatus?.sequence ? "active" : ""} key={index}>
                        <div className="panel-content">
                            <div className="icon">
                                <Image className='img-fluid' src={imageObj[elem.slug]} alt="tracking status" height={40} width={40} />
                            </div>
                            <div className="status">
                                {elem?.name}
                            </div>
                        </div>
                    </li>
                ))
            }
            {orderStatus?.slug == 'cancelled' && <li className="active cancelled-box">
                <div className="panel-content">
                    <div className="icon">
                        <Image src={imageObj[elem.slug]} alt="image" height={40} width={40} />
                    </div>
                    <div className="status">{orderStatus?.name}</div>
                </div>
            </li>
            }
        </ul>
    )
}

export default TrackingPanel