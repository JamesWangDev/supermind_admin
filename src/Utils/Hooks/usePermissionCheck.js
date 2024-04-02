import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import request from "../AxiosUtils";
import { selfData } from "../AxiosUtils/API";
import ConvertPermissionArr from "../CustomFunctions/ConvertPermissionArr";

const usePermissionCheck = (permissionTypeArr, keyToSearch) => {
  const [ansData, setAnsData] = useState([]);
  const path = usePathname();
  const moduleToSearch = keyToSearch ? keyToSearch : path.split("/")[2]
  const { data, isLoading, refetch } = useQuery([selfData], () => request({ url: selfData }), {
    enabled: false
  });
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("account"))?.permissions?.length > 0) {
      const securePaths = ConvertPermissionArr(JSON.parse(localStorage.getItem("account"))?.permissions);
      setAnsData(permissionTypeArr.map((permissionType) => Boolean(securePaths?.find((permission) => moduleToSearch == permission.name)?.permissionsArr.find((permission) => permission.type == permissionType))));
    } else {
      refetch();
      if (data) {
        const securePaths = ConvertPermissionArr(data?.data?.permissions);
        setAnsData(permissionTypeArr.map((permissionType) => Boolean(securePaths?.find((permission) => moduleToSearch == permission.name)?.permissionsArr.find((permission) => permission.type == permissionType))));
      }
    }
  }, [isLoading]);

  return ansData;
};

export default usePermissionCheck;
