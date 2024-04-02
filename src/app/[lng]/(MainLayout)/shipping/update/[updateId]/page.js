'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RiArrowDownLine } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi'
import Loader from '@/Components/CommonComponent/Loader';
import NoDataFound from '@/Components/CommonComponent/NoDataFound';
import FormsShippingRuleCreation from '@/Components/Shipping/FormsShippingRuleCreation';
import ShowModal from '@/Elements/Alerts&Modals/Modal';
import Btn from '@/Elements/Buttons/Btn';
import request from '@/Utils/AxiosUtils';
import { shipping, shippingRule } from '@/Utils/AxiosUtils/API';
import SuccessHandle from '@/Utils/CustomFunctions/SuccessHandle';
import { ToastNotification } from '@/Utils/CustomFunctions/ToastNotification';
import FormWrapper from '@/Utils/HOC/FormWrapper';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import NoCategorySVG from '../../../../../../../public/assets/svg/no-category.svg';

const AddShippingRules = ({ params }) => {
    const router = useRouter();
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(false);
    const updateId = params?.updateId
    const { data, isLoading, refetch } = useQuery([`${shipping}/update/${updateId}`], () => request({ url: `${shipping}/${updateId}` }), {
        enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data
    });
    const { mutate: createMutate, isLoading: createMutateIsloading } = useMutation((data) => request({ url: shippingRule, data, method: "post" }), {
        onSuccess: (resData) => {
            SuccessHandle(resData, false, `${shipping}/update/${updateId}`, t("ShippingCreatedSuccessFully"));
            resData.status === 201 && setActive(false);
            refetch();
        },
        onError: () => ToastNotification("error"),
    });
    const { mutate: updateMutate, isLoading: updateLoading } = useMutation((data) => request({ url: shippingRule + "/" + active, method: "put", data }), {
        onSuccess: (resData) => {
            SuccessHandle(resData, false, `${shipping}/update/${updateId}`, t("RuleUpdatedSuccessfully"));
            resData.status === 200 && setActive(false);
            refetch();
        },
    },
    );
    useEffect(() => {
        params?.updateId && refetch();
    }, [params?.updateId]);

    if (isLoading && updateId) return <Loader />;
    if (!data) return null;
    return (
        <FormWrapper title={data?.country?.name} modal={<div className='d-flex'><Btn className="me-2 btn-outline btn-lg" title="Back" onClick={() => router.back()} /><Btn className="align-items-center btn-theme add-button" title={"NewRules"} onClick={() => setActive({ create: data?.id })}><FiPlus />
        </Btn></div>}>
            <div className="dflex-wgap">
                <ShowModal title={"AddShippingRule"} modalAttr={{ className: "modal-lg" }} setModal={setActive} open={active?.create === data?.id ? true : false} close={true}>
                    <FormsShippingRuleCreation setActive={setActive} mutate={createMutate} shipping_id={active} loading={createMutateIsloading} />
                </ShowModal>
            </div>
            {
                data?.shipping_rules?.length > 0 ?
                    data.shipping_rules.map((item, index) => (
                        <div className="mt-3 shipping-accordion-custom" key={index}>
                            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== item.id && item.id)}>
                                {item.name}
                                <RiArrowDownLine />
                            </div>
                            {active === item.id && (
                                <div className="rule-edit-form">
                                    <FormsShippingRuleCreation rules={item} mutate={updateMutate} shipping_id={data?.id} setActive={setActive} loading={updateLoading} refetch={refetch} />
                                </div>
                            )}
                        </div>
                    )) : <NoDataFound customImage={NoCategorySVG} />
            }
        </FormWrapper>
    )
}

export default AddShippingRules