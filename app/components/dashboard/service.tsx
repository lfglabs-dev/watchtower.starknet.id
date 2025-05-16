import { useSearchParams } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import GenerateTokenButton from "./service/generateTokenButton";
import Code from "../UI/code";
import Icon from "../icons/icon";
import TextDocument from "../icons/paths/textDocument";
import Link from "next/link";
import DeleteServiceButton from "./service/deleteServiceButton";
import userStyles from "@/app/styles/components/dashboard/users.module.css";
import usePermission from "@/app/hooks/usePermissions";
import Switch from "../UI/switch";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";

const Service = ({
  services,
  setMenu,
  setServices,
  users,
}: {
  services: Array<Service>;
  setMenu: SetMenu;
  setServices: (services: Array<Service>) => void;
  users: Array<User>;
}) => {
  const params = useSearchParams();
  const serviceId = params.get("service_id");
  const service = services.find((service) => service._id === serviceId);
  const { isAdministrator, permissions } = usePermission();
  const cookies = useCookies();

  const updateWhitelist = async (userId: string) => {
    if (service?.whitelist.includes(userId))
      service.whitelist = service.whitelist.filter((id) => id !== userId);
    else service?.whitelist.push(userId);
    setServices([...services]);
    // Remove all ids for which the user doesn't exist anymore
    if (service)
      service.whitelist = service.whitelist.filter((id) =>
        users.find((user) => user._id === id)
      );
    await request(`/set_service_whitelist`, {
      token: cookies[0].token,
      new_whitelist: service?.whitelist,
      service_id: serviceId,
    });
  };

  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Services - {service?.app_name}</h1>
      <Link href={`/dashboard?page=logs&services=${serviceId}`}>
        <button className="button glass flex items-center">
          <Icon>
            <TextDocument />
          </Icon>
          <p className="my-4">View logs</p>
        </button>
      </Link>
      <hr className="hr-soft"></hr>
      <div className="text-xs">
        <span className="text-blue-500">POST</span>{" "}
        {process.env.NEXT_PUBLIC_API_URL}/service/add_message
      </div>
      <Code>
        {`{
  "token": "your_token",
  "log": {
    "app_id": "${serviceId}",
    "type": "default",
    "message": "This is a test message.",
    "timestamp": 1685805954515
    }
}`}
      </Code>
      <div className="mt-2">
        {permissions.find((p) => p === "administrator") && service && (
          <>
            <GenerateTokenButton service={service} setMenu={setMenu} />
            <br></br>
            <DeleteServiceButton
              service={service}
              services={services}
              setServices={setServices}
              setMenu={setMenu}
            />
          </>
        )}
      </div>
      {isAdministrator && (
        <>
          <br />
          <h2>Who can access these logs ?</h2>
          <div className="flex flex-col gap-2">
            {users.map((user) => {
              const hasPermission = !!user.permissions.find(
                (p) => p === "administrator"
              );
              return (
                <div key={user._id} className="flex gap-3 items-center">
                  <Switch
                    checked={
                      hasPermission ||
                      service?.whitelist.includes(user._id) ||
                      false
                    }
                    disabled={hasPermission}
                    setChecked={() => updateWhitelist(user._id)}
                  />
                  <p className="text-sm">{user.username}</p>
                  <p
                    className={[
                      userStyles.permission,
                      hasPermission ? userStyles.administrator : "",
                    ].join(" ")}
                  >
                    {hasPermission ? "Administrator" : "User"}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Service;
