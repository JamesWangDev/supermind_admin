import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext, useState } from "react";
import { Input } from "reactstrap";

const TopSection = ({ setSearch, setSorting, search, sorting }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [tc, setTc] = useState(null);
    const [text, setText] = useState("");
    // Debouncing function for filtering image by its name
    const onChange = (text) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setSearch(text), 1000));
    };
    // Image Sorting 
    const onSortingChange = (value) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setSorting(value), 1000));
    };
    return (
        <div className="select-top-panel">
            <div>
                <Input type="search" className="form-control" value={text || search}
                    placeholder={t("Searchyourfiles")}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setText(e.target.value);
                    }}
                />
            </div>
            <select className="form-select" value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
                <option value={"newest"}>{t("SortBynewest")}</option>
                <option value={"oldest"}>{t("SortByoldest")}</option>
                <option value={"smallest"}>{t("SortBysmallest")}</option>
                <option value={"largest"}>{t("SortBylargest")}</option>
            </select>
        </div>
    );
};

export default TopSection;