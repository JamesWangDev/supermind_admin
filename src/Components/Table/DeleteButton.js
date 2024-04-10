import React, { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ShowModal from "../../Elements/Alerts&Modals/Modal";
import Btn from "../../Elements/Buttons/Btn";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const DeleteButton = ({ id, mutate, noImage }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [modal, setModal] = useState(false);
  return (
    <>
      {id && mutate && (
        <>
          {noImage ? (
            <Btn
              className="btn-outline"
              title="Delete"
              onClick={() => {
                setModal(true);
              }}
            />
          ) : (
            <a>
              <RiDeleteBinLine
                className="text-danger"
                onClick={() => {
                  setModal(true);
                }}
              />
            </a>
          )}
        </>
      )}
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
              onClick={() => {
                mutate(id);
                setModal(false);
              }}
              className="btn-theme btn-md fw-bold"
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

export default DeleteButton;
