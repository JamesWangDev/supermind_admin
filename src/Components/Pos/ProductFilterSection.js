import React, { useContext, useEffect, useState } from 'react'
import { Col, Input, Row } from 'reactstrap'
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import MultiSelectField from '../InputFields/MultiSelectField';

const ProductFilterSection = ({ values, CategoryData, setFieldValue, setProductParams, getCategoryId }) => {
    const [tc, setTc] = useState(null);
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    useEffect(() => {
        if (values['parent_id']) {
            setProductParams((prev) => { return { ...prev, category_ids: values['parent_id'] } })
        } else {
            setProductParams((prev) => { return { ...prev, category_ids: [] } })
        }
    }, [values['parent_id']])
    useEffect(() => {
        if (getCategoryId) {
            setProductParams((prev) => { return { ...prev, category_ids: [] } });
            setFieldValue('parent_id', [])
        }
    }, [getCategoryId])
    // Debouncing
    const onChange = (text) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setProductParams((prev) => { return { ...prev, search: text } }), 1000));
    };
    return (
        <Row className="gx-4 gy-3">
            <Col sm="6">
                <Input name="search" placeholder={t('SearchHere')} onChange={(e) => onChange(e.target.value)} />
            </Col>
            <Col sm="6">
                <MultiSelectField notitle={'true'} values={values} name="parent_id" data={CategoryData} setFieldValue={setFieldValue} />
            </Col>
        </Row>
    )
}

export default ProductFilterSection