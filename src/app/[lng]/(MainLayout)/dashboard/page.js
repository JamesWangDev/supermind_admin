"use client"
import dynamic from "next/dynamic";
const MainDashboard = dynamic(() => import("../../../../Components/Dashboard"), { ssr: false })

const Dashboard = () => {
  return (
    <MainDashboard />
  )
};

export default Dashboard;