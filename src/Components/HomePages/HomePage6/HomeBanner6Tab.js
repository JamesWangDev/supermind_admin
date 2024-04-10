import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'
import I18NextContext from '@/Helper/I18NextContext'
import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'

const HomeBanner6Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t('HomeBanner')}</h4>
            <FileUploadField name="homeBannerImage1" title='Image' id="homeBannerImage1" showImage={values['homeBannerImage1']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1155x670px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t('SubBanner')}</h4>
            <FileUploadField name="homeBannerImage2" title='Image' id="homeBannerImage2" showImage={values['homeBannerImage2']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x670px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} setSearch={setSearch} />
            <CheckBoxField name="[content][home_banner][status]" title="Status" />
        </>
    )
}

export default HomeBanner6Tab