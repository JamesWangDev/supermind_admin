import { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import allPossibleCases from "../../Utils/CustomFunctions/AllPossibleCases";
import CheckBoxField from "../InputFields/CheckBoxField";
import FileUploadField from "../InputFields/FileUploadField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";

const VariationsForm = ({ values, setFieldValue, newId, index, elem, errors }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setFieldValue(`variations[${index}][attribute_values]`, allPossibleCases(
      values["combination"]?.map((item) => item?.values?.map((elem) => elem)))[index]
    )
  }, [values["variation_options"]])
  useEffect(() => {
    let priceValue, discountValue, salePriceValue
    priceValue = values[`variations`][index]?.price || 0.00;
    discountValue = values[`variations`][index]?.discount || 0.00;
    salePriceValue = priceValue - ((priceValue * discountValue) / 100);
    setFieldValue(`variations[${index}][sale_price]`, salePriceValue)
  }, [values[`variations`][index]?.price, values[`variations`][index]?.discount])
  return (
    <div className="mt-3 shipping-accordion-custom" key={index}>
      <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== elem.id && elem.id)}>{newId}<RiArrowDownSLine />
      </div>
      {active === elem.id && (
        <div className="rule-edit-form">
          <SimpleInputField
            nameList={[
              { name: `variations[${index}][name]`, title: "name", placeholder: "Enter Name", require: "true", errormsg: "Name" },
              { name: `variations[${index}][price]`, title: "price", type: "number", placeholder: "Enter Price", require: "true", inputaddon: "true", errormsg: "Price", min: "0" },
              { name: `variations[${index}][sale_price]`, title: "Sale Price", type: "number", inputaddon: "true", placeholder: "0.00", readOnly: true },
              { name: `variations[${index}][discount]`, title: "discount", type: "number", min: '0', max: '100', inputaddon: "true", placeholder: "Enter Discount", postprefix: "%" },
              { name: `variations[${index}][quantity]`, title: "Stock Quantity", type: "number", require: "true", errormsg: "Quantity", placeholder: "Enter Quantity", },
              { name: `variations[${index}][sku]`, title: "sku", require: "true", placeholder: "Enter SKU", errormsg: "SKU" },
            ]}
          />
          <SearchableSelectInput
            nameList={[
              {
                name: `variations[${index}][stock_status]`,
                require: 'true',
                inputprops: {
                  name: `variations[${index}][stock_status]`,
                  id: `variations[${index}][stock_status]`,
                  options: [
                    { id: "in_stock", name: "InStock" },
                    { id: "out_of_stock", name: "OutOfStock" },
                  ],
                },
                title: "StockStatus"
              },
            ]}
          />
          <CheckBoxField name={`variations[${index}][status]`} title="status" require="true" />
          <FileUploadField name={`variations[${index}][variation_image_id]`} id={`variations[${index}][variation_image_id]`} uniquename={values[`variations`][index]['variation_image']} type="file" values={values} setFieldValue={setFieldValue} title="image" />
        </div>
      )}
    </div>
  );
};

export default VariationsForm;
