import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FiBox } from "react-icons/fi";
import { RiFileTextLine, RiGroupLine, RiWalletLine } from 'react-icons/ri';
import { Col, Container, Row } from 'reactstrap';
import SettingContext from '../../Helper/SettingContext';
import request from "../../Utils/AxiosUtils";
import { StatisticsCountAPI } from '../../Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const TopDashSection = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    const { convertCurrency } = useContext(SettingContext)
    const { data } = useQuery([StatisticsCountAPI], () => request({ url: StatisticsCountAPI }), { refetchOnWindowFocus: false, select: (data) => data?.data });

    return (
        <section className="dashboard-tiles">
            <Container fluid={true} className='p-sm-0'>
                <Row className='g-3'>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>{t("Total Points")}</h6>
                                <h3>{data?.total_points || 0}</h3>
                            </div>
                            <div className="icon-box">
                                <RiWalletLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>{t("TotalOrders")}</h6>
                                <h3>{data?.total_orders}</h3>
                            </div>
                            <div className="icon-box">
                                <RiFileTextLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>{t("TotalStores")}</h6>
                                <h3>{data?.total_stores}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6} >
                        <div className="card-tiles">
                            <div>
                                <h6>{t("TotalUser")}</h6>
                                <h3>{data?.total_users}</h3>
                            </div>
                            <div className="icon-box">
                                <RiGroupLine />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TopDashSection