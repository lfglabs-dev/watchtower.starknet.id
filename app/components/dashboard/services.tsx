import { useRouter } from "next/navigation";
import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateServiceMenu from "./services/createServiceMenu";
import Link from "next/link";
import TextDocument from "../icons/paths/textDocument";
import dashboardStyles from "@/app/styles/dashboard.module.css";

const Services = ({
  services,
  setServices,
  setMenu,
  permissions,
}: {
  services: Array<any>;
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  const router = useRouter();

  const getLink = (service: any) => {
    return `/dashboard?page=service&service_id=${service._id}`;
  };

  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Services</h1>
      <div className="my-4 flex">
        {permissions.find((p) => p === "administrator") && (
          <button
            className="button glass flex items-center mr-4 mb-1"
            onClick={() =>
              setMenu(
                <CreateServiceMenu
                  setMenu={setMenu}
                  setServices={setServices}
                  services={services}
                />
              )
            }
          >
            <Icon>
              <Plus />
            </Icon>
            <p>Create new service</p>
          </button>
        )}
        <Link href={`/dashboard?page=logs`}>
          <button className="button glass flex items-center">
            <Icon>
              <TextDocument />
            </Icon>
            <p>View logs</p>
          </button>
        </Link>
      </div>
      <div className={dashboardStyles.itemsContainer}>
        {services.map((service, index) => (
          <div
            className={dashboardStyles.item}
            key={`service_${index}`}
            onClick={() => router.push(getLink(service))}
          >
            <p>{service.app_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
