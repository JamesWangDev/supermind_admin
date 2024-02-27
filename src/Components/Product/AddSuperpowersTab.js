import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { AddtoCartAPI } from "../../Utils/AxiosUtils/API";
import { Row, Col } from "reactstrap";
import CustomDropDown from "../CommonComponent/CustomDropDown/CustomDropDown";
import MultiSelectField from "../InputFields/MultiSelectField";

const AddSuperpowersTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedSuperpower, setSelectedSuperpower] = useState("");
  // Getting data from Cart API
  const { data: addToCartData, isLoading: addToCartLoader } = useQuery([AddtoCartAPI], () => request({ url: AddtoCartAPI }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(!addToCartLoader && addToCartData) {
        setCartProducts(addToCartData.items)
    }
  }, [addToCartLoader])

  const selectOptions = useMemo(() => (cartProducts.map(item => ({id: item.product.id, name: item.product.name}))), [cartProducts]);
  return (
    <>
      <div className="inline">
        <Row>
            <Col xs={9}>
                {/* <CustomDropDown items={selectOptions} value={selectedSuperpower} handleSelectChange={setSelectedSuperpower} placeholder={"Select Superpower..."} toggleStyle={{height: "30px"}} toggleClassName={"w-100 bg-primary border-none rounded-0"} /> */}
                <SearchableSelectInput
                    nameList={[
                    {
                        name: "superpowers",
                        title: "Superpowers",
                        require: "true",
                        inputprops: {
                        name: "superpower_id",
                        id: "superpower_id",
                        options: selectOptions || [],
                        close: true
                        },
                    },
                    ]}
                />
            </Col>
            <Col xs={3}>
                <div className="w-100 flex justify-content-center">
                    <Btn 
                        title={"Add"}
                        onClick={() => {}}  
                    />
                </div>
            </Col>
        </Row>

      </div>
      {/* <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="Superpowers" require="true" data={selectOptions} /> */}
    </>
  );
};

export default AddSuperpowersTab;
