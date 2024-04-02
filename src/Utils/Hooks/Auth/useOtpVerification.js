import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import request from "../../AxiosUtils";
import { verifyToken } from "../../AxiosUtils/API";
import { ToastNotification } from "../../CustomFunctions/ToastNotification";
import Cookies from "js-cookie";

const useOtpVerification = (setShowBoxMessage) => {
  const router = useRouter();
  return useMutation((data) => request({ url: verifyToken, method: "post", data }), {
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200) {
        Cookies.set('uo', requestData?.token)
        router.push("/en/auth/update-password");
        ToastNotification("success", responseData.data.message);
      } else {
        setShowBoxMessage(responseData.response.data.message);
      }
    },
  });
};
export default useOtpVerification;
