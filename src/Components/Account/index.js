import React, { useContext, useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import TabTitle from '../Coupon/TabTitle';
import { AccountTab } from '../../Data/TabTitleListData';
import ProfileSettingTab from './ProfileSettingTab';
import ProfilePasswordTab from './ProfilePasswordTab';
import AccountContext from '../../Helper/AccountContext';
import { RiAccountBoxLine } from 'react-icons/ri';
import VendorProfile from './VendorProfile';
import GetPaidTab from './GetPaidTab';

const AccountForm = () => {
    const [activeTab, setActiveTab] = useState("1");
    const { role } = useContext(AccountContext)
    const filterValue = () => {
        let cloneTabs = [...AccountTab]
        if (role === 'vendor') {
            cloneTabs.splice(1, 0, { title: "VendorSetting", icon: <RiAccountBoxLine /> });
            return cloneTabs
        } else {
            return cloneTabs;
        }
    };
    return (
        <div className="inside-horizontal-tabs mt-0">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={filterValue() || []} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <ProfileSettingTab />
                </TabPane>
                {role === 'vendor' && <TabPane tabId="2">
                    <VendorProfile />
                </TabPane>}
                <TabPane tabId={role === 'vendor' ? "3" : "2"}>
                    <ProfilePasswordTab />
                </TabPane>
                {role === 'vendor' && <TabPane tabId={role === 'vendor' ? "4" : "3"}>
                    <GetPaidTab />
                </TabPane>}
            </TabContent>
        </div>
    )
}

export default AccountForm