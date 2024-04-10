import React, { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import NoMediaImage from '../../../public/assets/svg/no-media.svg'

const NoDataFound = ({ title, noImage, customImage }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    return (
        <div className="no-data-added w-100">
            {!noImage && <img className="img-fluid" src={customImage ? customImage : NoMediaImage} alt="" />}
            <h4>{title ? t(title) : t("NoDataFound")}</h4>
        </div>
    )
}

export default NoDataFound