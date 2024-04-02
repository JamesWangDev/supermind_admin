import MessageCreate from "./MessageCreate";
import { ToastNotification } from "./ToastNotification";

const SuccessHandle = (resData, router, path, message, pathname) => {
  if (resData.status === 201 || resData.status === 200) {
    path && router && router.push(path ? path : pathname.slice(0, pathname.slice(1).indexOf("/") + 1));
    {
      message !== 'No' && ToastNotification("success", message ? message : (router && MessageCreate(pathname)));
    }
  } else if (resData.response?.data?.message || resData?.data?.errors[0]?.message) {
    { message !== 'No' && ToastNotification("error", resData.response?.data?.message || resData?.data?.errors[0]?.message); }
  } else { message !== 'No' && ToastNotification("error"); }
};

export default SuccessHandle;
