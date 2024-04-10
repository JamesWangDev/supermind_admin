import { useReducer } from "react";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { settingReducer } from "../../Utils/AllReducers";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import { BadgeApi } from "../../Utils/AxiosUtils/API";
import BadgeContext from ".";

const BadgeProvider = (props) => {
    const [cookies] = useCookies(["uat"]);
    const [state, dispatch] = useReducer(settingReducer, { badges: [], notification: "" })
    const [notification, setNotification] = useState("")
    const { data, isLoading, refetch } = useQuery([BadgeApi], () => request({ url: BadgeApi }), {
        enabled: false, select: (res) => res?.data
    });
    useEffect(() => {
        cookies.uat && refetch()
    }, [cookies.uat])

    useEffect(() => {
        if (data) {
            dispatch({
                type: "ALLBADGE",
                allBadges: [
                    { path: "/product", value: data?.product?.total_in_approved_products, subKey: ["product", "total_in_approved_products"] },
                    { path: "/store", value: data?.store?.total_in_approved_stores, subKey: ["store", "total_in_approved_stores"] },
                    { path: "/refund", value: data?.refund?.total_pending_refunds, subKey: ["refund", "total_pending_refunds"] },
                    { path: "/withdraw_request", value: data?.withdraw_request?.total_pending_withdraw_requests, subKey: ["withdraw_request", "total_pending_withdraw_requests"] },
                ],
            })
        }
    }, [isLoading])
    return (
        <BadgeContext.Provider value={{ state, dispatch, notification, setNotification, ...props }}>
            {props.children}
        </BadgeContext.Provider>
    )
}
export default BadgeProvider