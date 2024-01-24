import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Btn from "../../Elements/Buttons/Btn";
import LeftSideModal from "./LeftSideModal";
import VariationModalQty from "./VariationModalQty";
import VariationAddToCart from "./VariationAddToCart";
import RightVariationModal from "./RightVariationModal";

const ProductVariationModal = ({ productData, isLoading, setFieldValue, setModal, mutate }) => {
  const [cloneVariation, setCloneVariation] = useState({ product: productData, attributeValues: [], productQty: 1, selectedVariation: "", variantIds: [] });
  const [selectedOptions, setSelectedOptions] = useState([])
  const checkVariantAvailability = (productData) => {
    productData?.variations?.forEach(variation => {
      variation?.attribute_values?.forEach(attribute_value => {
        if (cloneVariation.attributeValues?.indexOf(attribute_value?.id) === -1) {
          setCloneVariation(prev => {
            return {
              ...prev,
              attributeValues: Array.from(new Set([...prev.attributeValues, attribute_value?.id]))
            };
          });
        }
      });
    });
  };
  const checkStockAvailable = () => {
    if (cloneVariation?.selectedVariation) {
      setCloneVariation(prevState => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status =
          tempSelectedVariation.quantity < prevState.productQty
            ? 'out_of_stock'
            : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation
        };
      });
    }
  };
  const setVariant = (variations, value) => {
    let tempSelected = selectedOptions;
    const index = selectedOptions?.findIndex((item) => Number(item.attribute_id) === Number(value?.attribute_id));
    if (index === -1) {
      tempSelected.push({ id: Number(value?.id), attribute_id: Number(value?.attribute_id) });
      setSelectedOptions(tempSelected);
    } else {
      tempSelected[index].id = value?.id;
      setSelectedOptions(tempSelected);
    }

    variations?.forEach((variation) => {
      let attrValues = variation?.attribute_values?.map((attribute_value) => attribute_value?.id);
      let tempVariantIds = tempSelected?.map((variants) => variants?.id);
      setCloneVariation((prev) => {
        return { ...prev, variantIds: tempVariantIds };
      });
      let doValuesMatch = attrValues.length === tempSelected.length && attrValues.every((value) => tempVariantIds.includes(value));
      if (doValuesMatch) {
        setCloneVariation((prev) => {
          return { ...prev, selectedVariation: variation };
        });
      }
    });
  };
  useEffect(() => {
    checkVariantAvailability(productData)
  }, [])
  return (
    <Row className="g-sm-4 g-2">
      <LeftSideModal cloneVariation={cloneVariation} productData={productData} />
      <Col lg="6">
        <div className="right-sidebar-modal">
          <RightVariationModal cloneVariation={cloneVariation} />
          {
            cloneVariation?.product?.attributes?.map((elem, index) => (
              <div className="selection-section mt-4" key={index}>
                <h4>{elem?.name}:</h4>
                <ul>
                  {elem?.attribute_values?.map((item, i) => (
                    <li key={i}>
                      <Btn className={`${cloneVariation?.variantIds?.includes(item?.id) ? 'active' : ""}`} disabled={!cloneVariation?.attributeValues?.includes(item?.id)} onClick={() => setVariant(cloneVariation?.product?.variations, item)}>
                        {item?.value}
                      </Btn>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
          <div className="modal-bottom-cart">
            <VariationModalQty cloneVariation={cloneVariation} setCloneVariation={setCloneVariation} checkStockAvailable={checkStockAvailable} />
            <VariationAddToCart cloneVariation={cloneVariation} setFieldValue={setFieldValue} mutate={mutate} setModal={setModal} isLoading={isLoading} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductVariationModal;
