import React, { useEffect, useReducer, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { deleteAllImageReducers } from "../../Utils/AllReducers";
import AttachmentHead from "./AttachmentHead";
import MediaData from "./MediaData";
import TopSection from "./TopSection";
import { attachment } from "../../Utils/AxiosUtils/API";
import request from "../../Utils/AxiosUtils";
import { useQuery } from "@tanstack/react-query";
import Loader from "../CommonComponent/Loader";
import TableBottom from "../Table/TableBottom";

const AttachmentContain = ({ isattachment }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(18);
    const [sorting, setSorting] = useState("");
    const [state, dispatch] = useReducer(deleteAllImageReducers, { deleteImage: [] });
    const { data: attachmentsData, refetch, isLoading, fetchStatus } = useQuery([attachment], () => request({ url: attachment, params: { search, sort: sorting, paginate: paginate, page } }), {
        refetchOnWindowFocus: false, enabled: false, select: (data) => data?.data
    });
    useEffect(() => {
        refetch();
    }, [search, sorting, page, paginate]);
    if (isLoading) return <Loader />
    return (
        <Container fluid={true}>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <AttachmentHead isattachment={isattachment} state={state} dispatch={dispatch} refetch={refetch} attachmentsData={attachmentsData?.data} />
                            <TopSection setSearch={setSearch} setSorting={setSorting} search={search} sorting={sorting} />
                            <div className="content-section select-file-loader select-file-section py-0 ratio2_3">
                                {fetchStatus == 'fetching' && <Loader />}
                                <Row xxl={6} xl={5} md={4} sm={3} xs={2} className="g-sm-3 g-2 media-library-sec ratio_square">
                                    <MediaData state={state} dispatch={dispatch} search={search} sorting={sorting} attachmentsData={attachmentsData?.data} refetch={refetch} />
                                </Row>
                            </div>
                        </CardBody>
                        {attachmentsData?.data.length > 0 && <TableBottom
                            current_page={attachmentsData?.current_page}
                            total={attachmentsData?.total}
                            per_page={attachmentsData?.per_page}
                            setPage={setPage}
                        />}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AttachmentContain;