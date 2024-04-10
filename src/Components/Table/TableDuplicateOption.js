import React, { useContext, useEffect, useState } from 'react'
import { RiFileCopyLine, RiQuestionLine } from 'react-icons/ri';
import ShowModal from '../../Elements/Alerts&Modals/Modal';
import Btn from '../../Elements/Buttons/Btn';
import useCreate from '../../Utils/Hooks/useCreate';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const TableDuplicateOption = ({ isReplicate, url, isCheck, refetch, setIsCheck }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [modal, setModal] = useState(false);
    const { data, mutate, isLoading } = useCreate(`${url}/${isReplicate?.replicateAPI}`)
    const onSubmit = (productIds) => {
        mutate({ ids: productIds })
    }
    useEffect(() => {
        if (data) {
            data?.status == 200 && refetch(); setModal(false); setIsCheck([])
        }
    }, [isLoading])
    return (
        <>
            <a className="align-items-center btn btn-outline btn-sm d-flex" onClick={() => setModal(true)}><RiFileCopyLine /> {t("Duplicate")}
            </a>
            <ShowModal open={modal} close={false}
                buttons={
                    <>
                        <Btn title="No" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
                        <Btn title="Yes" onClick={() => onSubmit(isCheck)} loading={Number(isLoading)} className="btn-theme btn-md fw-bold" />
                    </>
                }>
                <div className="remove-box">
                    <RiQuestionLine className="icon-box wo-bg" />
                    <h5 className="modal-title">{t("Confirmation")}</h5>
                    <p>{t("Areyousureyouwanttoproceed?")} </p>
                </div>
            </ShowModal>
        </>
    )
}

export default TableDuplicateOption