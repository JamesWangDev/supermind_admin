'use client'
import Checkout from "@/Components/Pos/Checkout/Checkout";
import { checkout } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";

const MainCheckout = () => {
    const { data, mutate, isLoading } = useCreate(checkout, false, false, true, false, false);
    return <Checkout loading={isLoading} mutate={mutate} data={data} />
};
export default MainCheckout;