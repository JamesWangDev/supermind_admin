import { useEffect, useState } from 'react';
import useCreate from '../../Utils/Hooks/useCreate';
import { updateProfilePassword, PointUserTransations, createStripeTransfer, PointDebit } from '../../Utils/AxiosUtils/API';
import Btn from '../../Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { useQuery } from "@tanstack/react-query";
import request from '@/Utils/AxiosUtils';
import { Input } from 'reactstrap';
import { UNIT_TOKEN_PRICE } from '@/Utils/TokenUtil/calculateTokenPrice';

const GetPaidTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { mutate, isLoading } = useCreate(updateProfilePassword, false, "/account");
    const [tokenBalance, setTokenBalance] = useState(0);
    const [isError, setIsError] = useState(false);
    const { data: pointsData, isLoading: pointsDataLoading, refetch: refecthPointsData } = useQuery([PointUserTransations], () => request({ url: PointUserTransations, params: { paginate: 10 } }), {
        select: (res) => res?.data,
    });
    const { mutate: transferMoney, isLoading: isLoadingTransfer } = useCreate(createStripeTransfer, false, false, 'No', (resDta) => {
        if(resDta.status === 200) {
            createPointDebit({balance: withdrawAmount});
            alert(`You have got paid successfully. Paid amount: ${resDta.data.amount / 100}$`);
        } else {
            alert(`Payment faild...`);
        }
    });
    const { mutate: createPointDebit, isLoading: debitLoader } = useCreate(PointDebit, false, false, false, () => {
        refecthPointsData();
      }, true);
    const [withdrawAmount, setWithDrawAmount] = useState(0);

    useEffect(() => {
        if (pointsData && !pointsDataLoading) {
            setTokenBalance(pointsData.balance)
        }
    }, [pointsData, pointsDataLoading])

    const handleAmountChange = (e) => {
        if(e.target.value > tokenBalance) {
            setWithDrawAmount(e.target.value);
            setIsError(true);
            return;
        }
        setIsError(false)
        setWithDrawAmount(e.target.value);
    }

    const handleGetPaid = () => {
        if(isError) {
            alert("You can't get paid bigger than current points balance....");
            return;
        }

        if(withdrawAmount === 0) {
            alert("Set the amount you want to get paid....");
            return;
        }

        if(withdrawAmount < 10000) {
            alert("You can only withdraw greater than 10 000 points...");
            return;
        }

        transferMoney({amount: withdrawAmount * UNIT_TOKEN_PRICE});
    }

    return (
        <>
            <div style={{fontSize: 18}}>Current Points: {tokenBalance}</div>
            <div className='d-flex gap-4 w-50 mt-3'>
                <Input onChange={handleAmountChange} invalid={isError} type='number' />
                <Btn loading={isLoadingTransfer} title="Get Paid" onClick={handleGetPaid}></Btn>
            </div>
            <div className='mt-3' style={{fontSize: 17}}>You will get paid: {withdrawAmount * UNIT_TOKEN_PRICE / 100}$</div>
        </>
    )
}

export default GetPaidTab