import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import { store } from "../../Utils/AxiosUtils/API";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import CheckBoxField from "../InputFields/CheckBoxField";
import DescriptionInput from "./DescriptionInput";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Btn from "@/Elements/Buttons/Btn";

const AddSuperpowersTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext)
  const options = [
    {
        id: 1,
        name: "Novel Writter"
    },
    {
        id: 2,
        name: "Wikipedia"
    },
    {
        id: 3,
        name: "Image Generation"
    }
  ]
//   const { data: StoreData } = useQuery([store], () => request({ url: store, params: { status: 1 } }), { refetchOnWindowFocus: false, select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.store_name })) });
  return (
    <>
      <div className="inline">
        <SearchableSelectInput
            nameList={[
            {
                name: "superpowers",
                title: "Superpowers",
                require: "true",
                inputprops: {
                name: "superpower_id",
                id: "superpower_id",
                options: options || [],
                close: true
                },
            },
            ]}
        />
        <div className="w-100 flex" style={{justifyContent: "end"}}>
            <Btn 
                title={"Add"}
                onClick={() => {}}  
            />
        </div>
      </div>
    </>
  );
};

export default AddSuperpowersTab;
