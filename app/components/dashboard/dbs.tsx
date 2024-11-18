import styles from "@/app/styles/components/dashboard/db.module.css";
import { useRouter } from "next/navigation";
import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import AddDatabaseMenu from "./db/addDbMenu";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import RelativeDate from "../UI/relativeDate";

const Databases = ({
  databases,
  setDatabases,
  setMenu,
  permissions,
}: {
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  const router = useRouter();

  const getLink = (db: Database) => {
    return `/dashboard?page=db&db_id=${db._id}`;
  };

  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Databases</h1>
      {permissions.find((p) => p === "administrator") && (
        <button
          className="button glass flex items-center mr-4 mb-5 mt-4 "
          onClick={() =>
            setMenu(
              <AddDatabaseMenu
                setMenu={setMenu}
                setDatabases={setDatabases}
                databases={databases}
              />
            )
          }
        >
          <Icon>
            <Plus />
          </Icon>
          <p>Add database</p>
        </button>
      )}
      <div className={dashboardStyles.itemsContainer}>
        {databases.map((db, index) => (
          <div
            className={[
              dashboardStyles.item,
              styles.dbElement,
              styles[db.status || ""],
            ].join(" ")}
            key={`db_${index}`}
            onClick={() => router.push(getLink(db))}
          >
            <p>{db.custom_name}</p>
            <p className="inactive">
              Last save{" "}
              {db.last_save ? <RelativeDate date={db.last_save} /> : "never"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Databases;
