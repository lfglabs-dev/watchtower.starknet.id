import { useEffect, useState } from "react";
import request from "../utils/request";
import { useCookies } from "react-cookie";

const usePermission = () => {
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
  const cookies = useCookies();
  const token = cookies[0].token;

  useEffect(() => {
    request("/get_permissions", { token: token }).then((res) => {
      if (res.status === "success") {
        setPermissions(res.permissions);
      }
    });
  }, [token]);
  return {
    permissions,
    isAdministrator: permissions.find((p) => p === "administrator"),
  };
};

export default usePermission;
