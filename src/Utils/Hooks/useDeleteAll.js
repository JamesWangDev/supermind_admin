import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const useDeleteAll = (reFetchKeys, setIsCheck) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const queryClient = useQueryClient();
  return useMutation(
    (deleteIds) =>
      request({
        url: `${reFetchKeys}/deleteAll`,
        method: "post",
        data: { ids: deleteIds },
      }),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, false, false, t("DeletedSuccessfully"));
        reFetchKeys && queryClient.invalidateQueries({ queryKey: reFetchKeys });
        setIsCheck([]);
      },
    }
  );
};

export default useDeleteAll;
