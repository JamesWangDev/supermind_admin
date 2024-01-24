import ShowModal from "@/Elements/Alerts&Modals/Modal";
import SettingContext from "@/Helper/SettingContext";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import React, { useContext } from "react";
import ReceiptModalTable from "./ReceiptModalTable";
import Btn from "@/Elements/Buttons/Btn";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
const ReceiptModal = ({ open, setOpen, data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { settingObj } = useContext(SettingContext);
    return (
        <ShowModal
            open={open}
            setModal={setOpen}
            modalAttr={{ className: "theme-modal modal-sm invoice-modal" }}
            buttons={
                <div className="modal-btn-group d-flex align-items-center gap-2 justify-content-center">
                    <Btn className="btn-sm btn-animation theme-bg-color" onClick={() => { window.print() }}>{t("Print")}</Btn>
                    <Btn className="btn-sm btn-outline" onClick={() => { setOpen(false) }}>{t("Cancel")}</Btn>
                </div>
            }
            close={false}
        >
            <div className="ticket">
                <div className="title-text text-center">
                    <h4>{settingObj?.general?.site_name || 'Logo here'}</h4>
                </div>
                <ul className="centered">
                    <li>{t("OrderNumber")}: {data.order_number}</li>
                    <li>{t("Date")}: {dateFormate(data.created_at)}</li>
                    <li>{t("Address")}:
                        {data?.shipping_address?.street}
                        {data?.shipping_address?.city} {data?.shipping_address?.state?.name}
                        {data?.shipping_address?.country?.name}
                        {data?.shipping_address?.pincode}
                    </li>
                    <li>{t("Email")}: {data?.consumer?.email}</li>
                    <li>{t("Phone")}: {data?.shipping_address?.phone}</li>
                    <li>{t("Customer")}: {data?.consumer?.name}</li>
                </ul>
            </div>
            <ReceiptModalTable data={data} />
            <p className="text-point">{t("ThankYouForShopping")}.</p>
        </ShowModal>
    )
}

export default ReceiptModal;