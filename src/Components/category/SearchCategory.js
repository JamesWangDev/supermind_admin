import { useContext, useState } from 'react';
import { Input } from 'reactstrap';
import NoDataFound from '../CommonComponent/NoDataFound';
import TreeLine from './TreeLine';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import NoCategoryImage from '../../../public/assets/svg/no-category.svg'

const SearchCategory = ({ data, setActive, active, setSearch, search, type, mutate, deleteLoading }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [tc, setTc] = useState(null);

    // Debouncing
    const onChange = (text) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setSearch(text), 1000));
    };
    return (
        <div className="theme-tree-box">
            <Input className="form-control" placeholder={t("SearchNode")} onChange={(e) => onChange(e.target.value)} />
            {data?.length > 0 ? <ul className="tree-main-ul">
                <li>
                    <div>
                        <i className="tree-icon folder-icon cursor" role="presentation"></i>
                        {t("Category")}
                    </div>
                    <TreeLine data={data} level={0} setActive={setActive} mutate={mutate} active={active} search={search} type={type} loading={deleteLoading} />
                </li>
            </ul> : <NoDataFound customImage={NoCategoryImage} />}
        </div>
    )
}

export default SearchCategory