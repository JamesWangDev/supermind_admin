import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import request from "../../AxiosUtils";
import { updatePassword } from "../../AxiosUtils/API";
import { ToastNotification } from "../../CustomFunctions/ToastNotification";
import { passwordConfirmationSchema, passwordSchema, YupObject } from "../../Validation/ValidationSchemas";

export const UpdatePasswordSchema = YupObject({ password: passwordSchema, password_confirmation: passwordConfirmationSchema });

const useUpdatePassword = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["uo", "ue"]);
  const router = useRouter();
  return useMutation(
    (data) =>
      request({
        url: updatePassword,
        method: "post",
        data: { ...data, token: cookies.uo, email: cookies.ue },
      }),
    {
      onSuccess: (resData) => {
        router.push("/en/auth/login");
        removeCookie("uo", { path: "/" });
        removeCookie("ue", { path: "/" });
        ToastNotification("success", "Your password has been changed successfully. Use your new password to log in.");
      },
    },
  );
};
export default useUpdatePassword;
