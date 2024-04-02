import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import request from '../../Utils/AxiosUtils';
import { user } from '../../Utils/AxiosUtils/API';
import SearchableSelectInput from '../InputFields/SearchableSelectInput'

const SelectUser = ({ values, title, role, name, userRole }) => {
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("")
    const [tc, setTc] = useState(null);
    const { data, isLoading, refetch } = useQuery([user], () => request({ url: user, params: { role, status: 1, paginate: 15, search: role !== 'vendor' ? customSearch ? customSearch : "" : '' } }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data?.map((el) => { return { id: el.id, name: el.name } }) });
    useEffect(() => {
        userRole !== 'vendor' && refetch();
    }, [])

    useEffect(() => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search])

    useEffect(() => {
        role !== 'vendor' && refetch()
    }, [customSearch])
    return (
        <Col xxl="4" xl="5">
            <Card>
                <CardBody className='theme-form'>
                    <div className="title-header option-title">
                        <div className="d-flex align-items-center">
                            <h5>{title}</h5>
                        </div>
                    </div>
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: name,
                                title: "User",
                                notitle: 'true',
                                inputprops: {
                                    name: name,
                                    id: name,
                                    options: data || [],
                                    defaultOption: "Select User",
                                    setsearch: role !== 'vendor' ? setSearch : null
                                },
                            },
                        ]}
                    />
                </CardBody>
            </Card>
        </Col>
    )
}

export default SelectUser