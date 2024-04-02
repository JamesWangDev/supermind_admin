import React, { useContext, useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import SimpleInputField from '../../InputFields/SimpleInputField';
import CheckBoxField from '../../InputFields/CheckBoxField';
import FileUploadField from '../../InputFields/FileUploadField';
import RightSidebarProduct from './RightSidebarProduct';
import MultiSelectField from '../../InputFields/MultiSelectField';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const RightSidebar6Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [active, setActive] = useState(0)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <Row className='align-items-center'>
                <CheckBoxField name={`[content][main_content][sidebar][status]`} title="Status" />
                <Col xs="10">
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{values['content']?.['main_content']?.['sidebar']?.['categories_icon_list']?.['title'] || 'Text Here'}<RiArrowDownLine />
                        </div>
                        {active == 1 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][sidebar][categories_icon_list][title]`, placeholder: t("EnterTitle"), title: "Title" }
                                ]} />
                                <MultiSelectField values={values} setFieldValue={setFieldValue} name='sidebarCategory1' title="Category" data={categoryData} />
                                <CheckBoxField name={`[content][main_content][sidebar][categories_icon_list][status]`} title="Status" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <Row className='align-items-center'>
                <Col xs="10">
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(2)}>{values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['title'] || t('Banner')}<RiArrowDownLine />
                        </div>
                        {active == 2 && (
                            <div className="rule-edit-form">
                                <CheckBoxField name={`[content][main_content][sidebar][right_side_banners][status]`} title="Status" />
                                <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 1</h4>
                                <FileUploadField name="mainContentRightBanner" title='Image' id="mainContentRightBanner" showImage={values['mainContentRightBanner']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('189x157px')} />
                                <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRightBannerLinkType', multipleNameKey: 'mainRightBannerLink' }} setSearch={setSearch} />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <RightSidebarProduct values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} setSearch={setSearch} />
        </>
    )
}

export default RightSidebar6Tab