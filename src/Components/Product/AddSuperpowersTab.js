import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import MultiSelectField from "../InputFields/MultiSelectField";
import { superpower } from "../../Utils/AxiosUtils/API";

const AddSuperpowersTab = ({ values, setFieldValue, errors, updateId }) => {
  // Getting data from Cart API
  const { data: superpowers, isLoading: superpowerloading } = useQuery([superpower], () => request({ url: superpower, method: 'get' }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  const selectOptions = useMemo(() => (superpowers?.data.map(item => ({id: item.id, name: item.name}))), [superpowers]);
  return (
    <>
      {/* <div className="inline">
        <Row>
            <Col xs={9}>
                <SearchableSelectInput
                    nameList={[
                    {
                        name: "superpowers",
                        title: "Superpowers",
                        require: "true",
                        inputprops: {
                          name: "superpowers",
                          id: "superpowers",
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

      </div> */}
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="superpowers" require="false" data={selectOptions} />
    </>
  );
};

export default AddSuperpowersTab;
