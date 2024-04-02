import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SettingContext from '.';
import { updateSetting } from '../../Utils/AxiosUtils/API';
import request from '../../Utils/AxiosUtils';
import { settingReducer } from '../../Utils/AllReducers';

const SettingProvider = (props) => {
    const [currencySymbol, setCurrencySymbol] = useState('')
    const [settingObj, setSettingObj] = useState({})
    const [searchSidebarMenu, setSearchSidebarMenu] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [state, dispatch] = useReducer(settingReducer, { setFavicon: "", setLogo: "", setResponsiveImage: "", setTitle: "", setTagline: "", isMultiVendor: false, setDelivery: {}, setCopyRight: "", setDarkLight: "", setDarkLogo: "", setLightLogo: "", setTinyLogo: "" })
    const { data, isLoading, refetch } = useQuery([updateSetting], () => request({ url: updateSetting }), {
        enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data
    });
    useEffect(() => {
        refetch()
    }, [])
    useEffect(() => {
        if (data) {
            setSettingObj(data?.values)
        }
    }, [data])

    // Convert Currency as per Exchange Rate
    const convertCurrency = useCallback((value) => {
        let position = settingObj?.general?.default_currency?.symbol_position || 'before_price';
        let symbol = settingObj?.general?.default_currency?.symbol || '$'
        let amount = Number(value)
        amount = amount * settingObj?.general?.default_currency?.exchange_rate
        if (position == 'before_price') {
            return `${symbol} ${amount.toFixed(2)}`
        } else return `${amount.toFixed(2)} ${symbol}`
    }, [settingObj])

    useEffect(() => {
        if (!isLoading) {
            setCurrencySymbol(data?.values?.general?.default_currency?.symbol);
        }
        if (data) {
            data?.values?.general['mode'] == "dark-only" ? document.body.classList.add("dark-only") : document.body.classList.remove("dark-only")
            data?.values?.general['admin_site_language_direction'] == 'ltr' ? (document.documentElement.dir = "ltr") : (document.documentElement.dir = "rtl");
            dispatch({
                type: "SETTINGIMAGE",
                darkLogo: data?.values?.general?.dark_logo_image,
                lightLogo: data?.values?.general?.light_logo_image,
                tinyLogo: data?.values?.general?.tiny_logo_image,
                favicon: data?.values?.general?.favicon_image,

                title: data?.values?.general?.site_title,
                tagline: data?.values?.general?.site_tagline,
                multiVendor: Boolean(data?.values?.activation?.multivendor),
                delivery: data?.values?.delivery,
                copyRight: data?.values?.general?.copyright,
                darkLight: data?.values?.general?.mode,
            })
        }
    }, [isLoading])
    return (
        <SettingContext.Provider value={{ ...props, sidebarOpen, setSidebarOpen, currencySymbol, setCurrencySymbol, state, dispatch, searchSidebarMenu, setSearchSidebarMenu, convertCurrency, settingObj, setSettingObj }}>
            {props.children}
        </SettingContext.Provider>
    )
}

export default SettingProvider