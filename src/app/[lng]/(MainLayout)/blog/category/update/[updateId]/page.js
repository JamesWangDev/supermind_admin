'use client'
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';
import CategoryForm from '@/Components/category/CategoryForm';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TreeForm from '@/Components/category/TreeForm';
import dynamic from 'next/dynamic';
import { Category } from '@/Utils/AxiosUtils/API';
import usePermissionCheck from '@/Utils/Hooks/usePermissionCheck';
import useCreate from '@/Utils/Hooks/useCreate';
import I18NextContext from '@/Helper/I18NextContext';

const UpdateBlogCategory = ({ params }) => {
    const TableTitle = dynamic(() => import("@/Components/Table/TableTitle"), {
        ssr: false,
    });
    const [edit] = usePermissionCheck(["edit"], "category");
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { mutate, isLoading } = useCreate(`${Category}/${params?.updateId}`, false, "/blog/category", false);
    return (
        <>
            <Container fluid={true}>
                <Row >
                    <Col xl="4">
                        <Card>
                            <CardBody>
                                <TreeForm type={'post'} isLoading={isLoading} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="8">
                        <Card>
                            {edit ? <CardBody>
                                {params?.updateId && (
                                    <>
                                        <TableTitle moduleName="UpdateCategory" onlyTitle={true} />
                                        <CategoryForm mutate={mutate} updateId={params?.updateId} loading={isLoading} type={'post'} />
                                    </>
                                )}
                            </CardBody>
                                : <h1>{t("NoPermission")}</h1>}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default UpdateBlogCategory