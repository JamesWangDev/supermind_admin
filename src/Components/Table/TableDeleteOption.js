import { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ShowModal from "../../Elements/Alerts&Modals/Modal";
import Btn from "../../Elements/Buttons/Btn";
import useDeleteAll from "../../Utils/Hooks/useDeleteAll";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const TableDeleteOption = ({ url, setIsCheck, isCheck }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const { data, mutate, isLoading } = useDeleteAll(url, setIsCheck);
  const handleDelete = (deleteIds) => {
    mutate(deleteIds);
  };
  useEffect(() => {
    if (data) {
      data?.status == 200 && setModal(false);
    }
  }, [isLoading]);
  return (
    <>
      <a
        className="align-items-center btn btn-outline btn-sm d-flex"
        onClick={() => setModal(true)}
      >
        <RiDeleteBinLine /> {t("Delete")}
      </a>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn
              title="No"
              onClick={() => {
                setModal(false);
              }}
              className="btn--no btn-md fw-bold"
            />
            <Btn
              title="Yes"
              className="btn-theme btn-md fw-bold"
              onClick={() => {
                handleDelete(isCheck);
              }}
              loading={Number(isLoading)}
            />
          </>
        }
      >
        <div className="remove-box">
          <RiDeleteBinLine className="icon-box" />
          <h2>{t("DeleteItem")}?</h2>
          <p>
            {t("ThisItemWillBeDeletedPermanently") +
              " " +
              t("YouCan'tUndoThisAction!!")}{" "}
          </p>
        </div>
      </ShowModal>
    </>
  );
};

export default TableDeleteOption;
