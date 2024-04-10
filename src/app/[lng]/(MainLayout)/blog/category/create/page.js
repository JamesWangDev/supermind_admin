'use client'
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CategoryForm from '@/Components/category/CategoryForm';
import TreeForm from '@/Components/category/TreeForm';
import request from '@/Utils/AxiosUtils';
import SuccessHandle from '@/Utils/CustomFunctions/SuccessHandle';
import { Category } from '@/Utils/AxiosUtils/API';

const CreateBlogCategory = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isLoading } = useMutation((data) => request({ url: Category, data, method: "post" }), {
        onSuccess: (resData) => {
            SuccessHandle(resData, router, "/blog/category/create", t("CategoryCreatedSuccessfully"));
            queryClient.invalidateQueries({ queryKey: ["/blog/category/create"] });
        },
    });
    return (
        <Container fluid={true}>
            <Row >
                <Col xl="4">
                    <Card >
                        <CardBody>
                            <TreeForm type={"post"} isLoading={isLoading} />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="8">
                    <Card >
                        <CardBody>
                            <div className="title-header option-title">
                                <h5>{t("AddCategory")}</h5>
                            </div>
                            <CategoryForm loading={isLoading} mutate={mutate} type={"post"} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateBlogCategory