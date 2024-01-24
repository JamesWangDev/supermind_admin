import { useEffect } from "react";
import { Col, Row } from "reactstrap"
import DashboardWrapper from "../DashboardWrapper"
import { blog } from "../../../Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request from "../../../Utils/AxiosUtils";
import Avatar from "../../CommonComponent/Avatar";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import { dateFormate } from "../../../Utils/CustomFunctions/DateFormate";
import NoDataFound from "../../CommonComponent/NoDataFound";

const LatestBlogs = () => {
    const { data, isLoading, refetch } = useQuery([blog], () => request({ url: blog, params: { status: 1, paginate: 2 } }), {
        refetchOnWindowFocus: false, enabled: false, select: (data) => data?.data?.data,
    });
    useEffect(() => {
        refetch()
    }, [])
    return (
        <DashboardWrapper classes={{ title: "LatestBlogs" }}>
            <Row>
                {data?.length > 0 ? data?.map((elem, i) => (
                    <Col xs={6} key={i}>
                        <div className="blog-box">
                            <a href="#javascript" className="blog-img">
                                <Avatar data={elem?.blog_thumbnail} customeClass={"img-fluid"} noPrevClass={true} placeHolder={placeHolderImage} name={elem?.title} width={278} height={180} />
                            </a>
                            <div className="blog-content">
                                <a href="#javascript">{elem?.title}</a>
                                <h6>{dateFormate(elem?.created_at)}</h6>
                            </div>
                        </div>
                    </Col>
                )) : <NoDataFound title={"NoDataFound"} noImage={true} />}
            </Row>
        </DashboardWrapper>
    )
}

export default LatestBlogs