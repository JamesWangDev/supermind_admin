import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import request from "../../AxiosUtils";
import { forgotPassword } from "../../AxiosUtils/API";
import { ToastNotification } from "../../CustomFunctions/ToastNotification";
import { emailSchema, YupObject } from "../../Validation/ValidationSchemas";

export const ForgotPasswordSchema = YupObject({ email: emailSchema });

const useHandleForgotPassword = (setShowBoxMessage) => {
  const router = useRouter();
  return useMutation((data) => request({ url: forgotPassword, method: "post", data }), {
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200) {
        setShowBoxMessage();
        ToastNotification("success", responseData.data.message);
        Cookies.set('ue', requestData.email)
        router.push("/en/auth/otp-verification");
      } else {
        setShowBoxMessage("This email is not exist");
      }
    },
  },
  );
};
export default useHandleForgotPassword;
