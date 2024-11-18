import { useSearchParams } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import GenerateTokenButton from "./service/generateTokenButton";
import Code from "../UI/code";
import Icon from "../icons/icon";
import TextDocument from "../icons/paths/textDocument";
import Link from "next/link";
import DeleteServiceButton from "./service/deleteServiceButton";

const Service = ({
  services,
  setMenu,
  permissions,
  setServices,
}: {
  services: Array<Service>;
  setMenu: SetMenu;
  permissions: Array<string>;
  setServices: (services: Array<Service>) => void;
}) => {
  const params = useSearchParams();
  const serviceId = params.get("service_id");
  const service = services.find((service) => service._id === serviceId);

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
    </div>
  );
};

export default Service;
