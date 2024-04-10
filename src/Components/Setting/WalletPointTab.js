import { RiCopperDiamondLine } from 'react-icons/ri'
import SimpleInputField from '../InputFields/SimpleInputField'
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const WalletPointTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <SimpleInputField
            nameList={[
                { name: "[values][wallet_points][signup_points]", type: 'number', title: "SignUpPoints", placeholder: t("EnterSignupPoints"), helpertext: "*Provide points to new users as a signup incentive." },
                { name: "[values][wallet_points][min_per_order_amount]", inputaddon: "true", title: "MinPerOrderAmount", placeholder: t("EnterMinPerOrderAmount"), helpertext: '*Collect points when orders meet or exceed the minimum value.' },
                { name: "[values][wallet_points][point_currency_ratio]", title: "PointCurrencyRatio", inputaddon: "true", prefixvalue: <RiCopperDiamondLine />, placeholder: t("EnterPointCurrencyRatio"), helpertext: '*Determine the conversion factor from points to currency.' },
                {
                    name: "[values][wallet_points][reward_per_order_amount]", inputaddon: "true", title: "RewardPerOrderAmount", placeholder: t("EnterRewardPerOrderAmount"), helpertext: <>*Earn reward points based on each order's value. <br />
                        (Rewards Points = (Total Order Amount / Min Per Order Amount) * Reward Per Order Point)</>
                },
            ]}
        />
    )
}
export default WalletPointTab