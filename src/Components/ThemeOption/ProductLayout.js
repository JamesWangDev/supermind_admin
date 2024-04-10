import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { Input, Label, Row } from 'reactstrap'
import { ProductLayoutOption } from '../../Data/TabTitleListData'
import CheckBoxField from '../InputFields/CheckBoxField';
import FileUploadField from '../InputFields/FileUploadField';
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import SimpleInputField from '../InputFields/SimpleInputField';
import DescriptionInput from '../Product/DescriptionInput';
import I18NextContext from '@/Helper/I18NextContext';

const ProductLayout = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const handleClick = (val) => {
        setFieldValue("[options][product][product_layout]", val.value)
    }
    return (
        <>
            <div className='selection-layout radio-type-sec'>
                <h4 className='fw-semibold w-100'>{t("ProductPageLayout")}</h4>
                <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
                    {ProductLayoutOption.map((elem, i) => (
                        <div key={i} onClick={() => handleClick(elem)}>
                            <div className="selection-box text-center">
                                <Input name='product4' type="radio" id={elem.id} defaultChecked={values['options']?.['product']?.['product_layout'] == elem.value ? true : false} />
                                <Label htmlFor={elem.id}>
                                    <div>
                                        <Image src={elem.img} className="img-fluid" alt="" height={100} width={165} />
                                    </div>
                                    <h4 className="mt-2">{t(elem.title)}</h4>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
            <Row className='mt-5 align-items-center g-2'>
                <CheckBoxField name='[options][product][is_trending_product]' title='TrendingProduct' helpertext="*Enabling this will showcase the product in the sidebar of the product page as a trending item." />
                <CheckBoxField name='[options][product][banner_enable]' title='BannerStatus' helpertext="*Enabling this will showcase the banner in the sidebar of the product page." />
                <FileUploadField name="banner_image_url" title='BannerImage' id="banner_image_url" showImage={values['banner_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('380x580px')} />

                <CheckBoxField name='[options][product][safe_checkout]' title='SafeCheckout' helpertext="*A safe checkout image will appear on the product page." />
                <FileUploadField name="safe_checkout_image" title='SafeCheckoutImage' id="safe_checkout_image" showImage={values['safe_checkout_image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('50x50px')} />

                <CheckBoxField name='[options][product][secure_checkout]' title='SecureCheckout' helpertext="*A secure checkout image will appear on the product page." />
                <FileUploadField name="secure_checkout_image" title='SecureCheckoutImage' id="secure_checkout_image" showImage={values['secure_checkout_image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('50x50px')} />

                <CheckBoxField name='[options][product][encourage_order]' title='EncourageOrder' helpertext="*A random order count between 1 and 100 will be displayed to motivate user purchases." />
                <SimpleInputField
                    nameList={[
                        { name: '[options][product][encourage_max_order_count]', title: "EncourageMaxOrderCount", max: '100', min: '0', type: "number", helpertext: "*Specify a number between 1 and 10 to encourage orders." },
                    ]} />
                <CheckBoxField name='[options][product][encourage_view]' title='EncourageView' helpertext="*This feature encourages users to view products by presenting engaging content or prompts." />
                <SimpleInputField
                    nameList={[
                        { name: '[options][product][encourage_max_view_count]', title: "EncourageMaxViewCount", max: '100', min: '0', type: "number", helpertext: "*Specify a number between 1 and 10 to encourage product view." },
                    ]} />
                <CheckBoxField name='[options][product][sticky_checkout]' title='StickyCheckout' helpertext="*Enable to make the Add to Cart and checkout options sticky at the bottom of the product page." />
                <CheckBoxField name='[options][product][sticky_product]' title='StickyProduct' helpertext="*Enable to showcase random products at the bottom of the website." />
                <CheckBoxField name='[options][product][social_share]' title='SocialShare' helpertext="*Enable this option to allow users to share the product on social media platforms." />
                <DescriptionInput values={values} setFieldValue={setFieldValue} title={'ShippingAndReturn'} nameKey="[options][product][shipping_and_return]" helpertext="*This area contains the shipping and return policies. A minimum of 500 characters is recommended for effective communication." />
            </Row>
        </>
    )
}

export default ProductLayout