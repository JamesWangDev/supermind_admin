import Layout from "@/Layout";

export default function RootLayout({ children, params: { lng } }) {
  return (
    <Layout lng={lng}>{children}</Layout>
  )
}
