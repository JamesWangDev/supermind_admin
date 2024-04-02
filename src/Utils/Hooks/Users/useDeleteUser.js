import { useMutation } from "@tanstack/react-query";
import request from "../../AxiosUtils";
import { user } from "../../AxiosUtils/API";

const useDeleteRole = () => {
  return useMutation((deleteId) => request({ url: `${user}/${deleteId}`, method: "delete" }));
};

export default useDeleteRole;
