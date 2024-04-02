import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiQuestionLine } from "react-icons/ri";
import { FormGroup, Input, Label } from "reactstrap";
import ShowModal from "../../Elements/Alerts&Modals/Modal";
import Btn from "../../Elements/Buttons/Btn";
import BadgeContext from "../../Helper/BadgeContext";
import Capitalize from "../../Utils/CustomFunctions/Capitalize";
import useUpdate from "../../Utils/Hooks/useUpdate";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Status = ({ url, data, disabled, apiKey }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = usePathname()
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const { state, dispatch } = useContext(BadgeContext);
  useEffect(() => {
    setStatus(Boolean(Number(apiKey ? data[apiKey] : data.status)));
  }, [data, disabled]);
  const { data: apiData, mutate, isLoading } = useUpdate(url, [data.id, Number(status)], false, `${Capitalize(router.split('/')[2])} Status Updated Successfully`, () => { url });
  useEffect(() => {
    if ((apiData, url == "/product/approve")) {
      let store = state?.badges?.map((elem) => {
        if (elem.path.toString() == "/product") {
          elem = {
            path: elem.path,
            value: apiData?.data?.total_in_approved_products,
          };
        } else if (elem.path.toString() == "/store") {
          elem = {
            path: elem.path,
            value: apiData?.data?.total_in_approved_stores,
          };
        }
        return elem;
      });
      dispatch({ type: "ALLBADGE", allBadges: store });
    }
  }, [isLoading]);
  const handleClick = (value) => {
    setStatus(value);
    mutate(Boolean(Number(value)));
    setModal(false);
  };
  return (
    <>
      <FormGroup switch className="ps-0 form-switch form-check">
        <Label
          className="switch switch-sm"
          onClick={() => !disabled && setModal(true)}
        >
          <Input
            type="switch"
            disabled={disabled ? disabled : false}
            checked={status}
          />
          <span className={`switch-state ${disabled ? "disabled" : ""}`}></span>
        </Label>
      </FormGroup>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn
              title="No"
              onClick={() => setModal(false)}
              className="btn--no btn-md fw-bold"
            />
            <Btn
              title="Yes"
              onClick={() => handleClick(!status)}
              loading={Number(isLoading)}
              className="btn-theme btn-md fw-bold"
            />
          </>
        }
      >
        <div className="remove-box">
          <RiQuestionLine className="icon-box wo-bg" />
          <h5 className="modal-title">{t("Confirmation")}</h5>
          <p>{t("Areyousureyouwanttoproceed?")} </p>
        </div>
      </ShowModal>
    </>
  );
};

export default Status;
