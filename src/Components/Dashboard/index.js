import ProductStockReportTable from "./ProductStockReport/ProductStockReportTable"
import RecentOrderTable from "./RecentOrders/RecentOrderTable"
import RevenueAndTopVendor from "./Revenue&TopVendor"
import TopDashSection from "./TopDashSection"

const MainDashboard = () => {
    return (
        <>
            <TopDashSection />
            <section>
                <RevenueAndTopVendor />
                <RecentOrderTable />
                <ProductStockReportTable />
            </section >
        </>
    )
}

export default MainDashboard