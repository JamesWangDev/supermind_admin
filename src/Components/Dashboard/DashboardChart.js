import dynamic from "next/dynamic";
import { DashboardChartAPI } from "../../Utils/AxiosUtils/API";
import request from "../../Utils/AxiosUtils";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from 'react';
import SettingContext from '../../Helper/SettingContext';
import { DashboardChartOptions } from "./ChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
})

const DashboardChart = () => {
    const { convertCurrency } = useContext(SettingContext)
    const { data, refetch, isLoading } = useQuery([DashboardChartAPI], () => request({ url: DashboardChartAPI }), { refetchOnWindowFocus: false, enabled: false, select: (data) => data?.data });
    useEffect(() => {
        refetch()
    }, [])
    return (
        <ReactApexChart options={DashboardChartOptions(data, convertCurrency).options} series={DashboardChartOptions(data, convertCurrency).series} type="line" height={350} />
    )
}

export default DashboardChart