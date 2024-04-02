'use client'
import React, { useContext, useRef, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import TreeForm from '@/Components/category/TreeForm'
import CategoryForm from '@/Components/category/CategoryForm'
import usePermissionCheck from '@/Utils/Hooks/usePermissionCheck'
import { Category } from '@/Utils/AxiosUtils/API'
import useCreate from '@/Utils/Hooks/useCreate'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const BlogCategory = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [create] = usePermissionCheck(["create"], "category");
    const [resetData, setResetData] = useState(false)
    const refRefetch = useRef()
    const { mutate, isLoading } = useCreate(Category, false, false, false, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            refRefetch?.current?.call()
            setResetData(true)
        }
    });
    return (
        <Row >
            <Col xl="4">
                <Card >
                    <CardBody>
                        <TreeForm type={"post"} isLoading={isLoading} ref={refRefetch} />
                    </CardBody>
                </Card>
            </Col>
            <Col xl="8">
                <Card >
                    {create ? <CardBody>
                        <div className="title-header option-title">
                            <h5>{t("AddCategory")}</h5>
                        </div>
                        <CategoryForm loading={isLoading} mutate={mutate} key={resetData} type={"post"} />
                    </CardBody>
                        : <h1>No permission</h1>}
                </Card>
            </Col>
        </Row>
    );
}
export default BlogCategory