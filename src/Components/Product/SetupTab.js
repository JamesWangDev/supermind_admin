import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import CheckBoxField from '../../Components/InputFields/CheckBoxField.js'
import { Category, product, tag } from "../../Utils/AxiosUtils/API";
import MultiSelectField from "../InputFields/MultiSelectField";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import Loader from "../CommonComponent/Loader";

const SetupTab = ({ values, setFieldValue, errors, updateId }) => {

  const [search, setSearch] = useState(false);
  const [customSearch, setCustomSearch] = useState("")
  const [tc, setTc] = useState(null);

  // Getting Category Data with type products
  const { data: categoryData } = useQuery([Category], () => request({ url: Category, params: { type: "product" } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });

  // Getting Tags Data with type products
  const { data: tagData } = useQuery([tag], () => request({ url: tag, params: { type: "product" } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });

  // Getting Products Data
  const [arrayState, setArrayState] = useState([])
  useEffect(() => {
    if (updateId) {
      setArrayState((prev) => Array.from(new Set([...prev, ...values['related_products'], ...values['cross_sell_products']])))
    }
  }, [updateId])
  const { data: productData, isLoading: productLoader, refetch } = useQuery([product, arrayState], () => request({
    url: product, params:
    {
      status: 1,
      search: customSearch ? customSearch : '',
      paginate: arrayState?.length >= 15 ? arrayState?.length : 15,
      ids: customSearch ? null : arrayState?.join() || null,
      with_union_products: arrayState?.length ? arrayState?.length >= 15 ? 0 : 1 : 0
    }
  }), {
    refetchOnWindowFocus: false, select: (res) => res?.data?.data.filter((elem) => updateId ? elem?.id !== Number(updateId) : elem).map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug } })
  });

  // Added debouncing
  useEffect(() => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setCustomSearch(search), 500));
  }, [search])

  // Getting users data on searching users
  useEffect(() => {
     refetch()
  }, [customSearch, arrayState, updateId])

  const customCrossSellProduct = (productData) => {
    return productData?.filter((elem) => elem.stock_status !== "out_of_stock" && elem?.type !== "classified")
  }

  if (productLoader) return <Loader />;
  return (
    <>
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="tags" data={tagData} />

      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="categories" require="true" data={categoryData} />

      <CheckBoxField name="is_random_related_products" title="RandomRelatedProduct" helpertext="*Enabling this option allows the backend to randomly select 6 products for display." />
      {!values["is_random_related_products"] &&
        <SearchableSelectInput
          nameList={
            [
              {
                name: 'related_products',
                title: "RelatedProducts",
                inputprops: {
                  name: 'related_products',
                  id: 'related_products',
                  options: productData || [],
                  setsearch: setSearch,
                  helpertext: "*Choose a maximum of 6 products for effective related products display."
                },
              },
            ]} />
      }
      <SearchableSelectInput
        nameList={
          [
            {
              name: 'cross_sell_products',
              title: "CrossSellProduct",
              inputprops: {
                name: 'cross_sell_products',
                id: 'cross_sell_products',
                options: customCrossSellProduct(productData)?.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.image || placeHolderImage } }),
                setsearch: setSearch,
                helpertext: "*Choose a maximum of 3 products for effective cross-selling display."
              },
            },
          ]} />
    </>
  );
};

export default SetupTab;
