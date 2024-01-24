import { Input, Label, Row } from 'reactstrap';
import Image from 'next/image';
import { CollectionLayoutOption } from '../../Data/TabTitleListData';
import FileUploadField from '../InputFields/FileUploadField';
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const CollectionProduct = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const handleClick = (val) => {
    setFieldValue("[options][collection][collection_layout]", val.value)
  }
  return (
    <>
      <div className='selection-layout radio-type-sec mb-4'>
        <h4 className='fw-semibold w-100'>{t("CollectionPageLayout")}</h4>
        <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
          {CollectionLayoutOption.map((elem, i) => (
            <div key={i} onClick={() => handleClick(elem)}>
              <div className="selection-box text-center">
                <Input name='products' type="radio" defaultChecked={values['options']?.['collection']?.['collection_layout'] == elem.value ? true : false} id={elem.id} />
                <Label htmlFor={elem.id}>
                  <div>
                    <Image src={elem.img} className="img-fluid" alt="" width={165} height={100} />
                  </div>
                  <h4 className="mt-2">{t(elem.title)}</h4>
                </Label>
              </div>
            </div>
          ))}
        </Row>
      </div>
      {values['options']?.['collection']?.['collection_layout'] !== 'collection_category_slider' && values['options']?.['collection']?.['collection_layout'] !== 'collection_offcanvas_filter' &&
        <FileUploadField name="collection_banner_image" title='Image' id="collection_banner_image" showImage={values['collection_banner_image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1579x241px')} />
      }
    </>
  )
}

export default CollectionProduct