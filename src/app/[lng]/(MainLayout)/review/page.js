"use client"
import React, { useState } from 'react'
import { Col } from 'reactstrap';
import { ReviewAPI } from '@/Utils/AxiosUtils/API';
import AllReviewsTable  from '@/Components/Reviews';

const Reviews = () => {
    const [isCheck, setIsCheck] = useState([]);
    return (
        <Col sm="12">
            <AllReviewsTable url={ReviewAPI} moduleName="Reviews" onlyTitle={true} isCheck={isCheck} setIsCheck={setIsCheck} />
        </Col>
    )
}

export default Reviews