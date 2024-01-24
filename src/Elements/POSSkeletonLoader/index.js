import React, { useContext } from 'react'
import { Col, Row } from 'reactstrap'
import SettingContext from '@/Helper/SettingContext'

const POSSkeletonLoader = () => {
    const countSkeleton = Array.from({ length: 8 }, (_, index) => index);
    const { sidebarOpen } = useContext(SettingContext)

    return (
        <>
            <div className="product-section custom-box-loader mt-4">
                <Row className={`g-4 row-cols-md-3 row-cols-sm-2 row-cols-1 ${sidebarOpen? 'row-cols-xxl-5 row-cols-lg-4' : 'row-cols-xxl-4'}`}>
                    {
                        countSkeleton.map((elem, i) => {
                            return <Col key={i}>
                                <div className="skeleton-div">
                                    <div className="product-box skeleton-box">
                                        <div className="skeleton">
                                            <div className="skeleton__section skeleton__section--card">
                                                <div className="skeleton__img"></div>
                                                <div>
                                                    <div className="skeleton__header skeleton__header--long"></div>
                                                    <div className="skeleton__p"></div>
                                                </div>
                                            </div>
                                            <div className="skeleton__p"></div>
                                            <div className="skeleton__p"></div>
                                            <div className="skeleton__p"></div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        })
                    }
                </Row>
            </div>

        </>
    )
}

export default POSSkeletonLoader