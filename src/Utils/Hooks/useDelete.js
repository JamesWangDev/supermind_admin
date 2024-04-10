import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const useDelete = (url, refetch, extraFunction) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const queryClient = useQueryClient();
  return useMutation(
    (deleteId) => request({ url: `${url}/${deleteId}`, method: "delete" }),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, false, false, t("DeletedSuccessfully"));
        refetch && queryClient.invalidateQueries({ queryKey: [refetch] });
        extraFunction && extraFunction(resData);
      },
    }
  );
};

export default useDelete;
