import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { RiNotificationLine, RiRecordCircleLine } from "react-icons/ri";
import BadgeContext from "../../Helper/BadgeContext";
import request from "../../Utils/AxiosUtils";
import { NotificationsAPI } from "../../Utils/AxiosUtils/API";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const NotificationBox = ({ isComponentVisible, setIsComponentVisible }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { notification, setNotification } = useContext(BadgeContext);
  const { data, isLoading, refetch } = useQuery(['NotificationsAPI'], () => request({ url: NotificationsAPI }), { enabled: false, refetchOnWindowFocus: false, select: (res) => (res.data.data) }
  );

  useEffect(() => {
    refetch();
  }, [isLoading])

  useEffect(() => {
    setNotification(data?.filter(notification => notification.read_at === null))
  }, [data])
  if (data && data.length === 0) return null
  return (
    <li className="onhover-dropdown">
      <div className="notification-box" onClick={() => setIsComponentVisible((prev) => prev !== "notification" ? "notification" : "")}>
        <RiNotificationLine />
        {notification?.length > 0 && <span className="badge rounded-pill badge-theme">{notification.length}</span>}
      </div>
      <ul className={`notification-dropdown onhover-show-div ${isComponentVisible == "notification" ? "active" : ""}`}>
        <li>
          <RiNotificationLine />
          <h6 className="f-18 mb-0">{t("Notifications")}</h6>
        </li>
        {data?.slice(0, 3)?.map((notification, i) => (
          <li key={i}>
            <p>
              <RiRecordCircleLine className="me-2 text-primary" />
              {t(notification?.data?.message)}
            </p>
          </li>
        ))}
        <li>
          <Link className="btn btn-primary" href="/notifications">
            {t("CheckAllNotification")}
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default NotificationBox;
