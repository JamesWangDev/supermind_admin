import { Nav, NavItem, NavLink } from 'reactstrap';
import usePermissionCheck from '../../Utils/Hooks/usePermissionCheck';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const AttachmentModalNav = ({ tabNav, setTabNav, isattachment }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [create] = usePermissionCheck(["create"], "attachment");
    return (
        <Nav className="nav-tabs" role="tablist">
            {!isattachment && <NavItem>
                <NavLink className={tabNav === 1 ? "active" : ""} onClick={() => setTabNav(1)}>{t("SelectFile")} </NavLink>
            </NavItem >}
            {create && <NavItem className="nav-item">
                <NavLink className={tabNav === 2 ? "active" : ""} onClick={() => setTabNav(2)}>{t("UploadNew")}</NavLink>
            </NavItem>}

        </Nav>
    )
}

export default AttachmentModalNav