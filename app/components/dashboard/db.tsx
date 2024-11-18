import styles from "@/app/styles/components/dashboard/db.module.css";
import { useSearchParams } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TextInput from "../UI/textInput";
import { useEffect, useState } from "react";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import DeleteDbButton from "./db/deleteDbButton";
import loadDbs from "./db/loadDbs";
import ButtonContainer from "../UI/buttonContainer";
import Popup from "../UI/popup";
import SaveNow from "./db/saveNow";
import RelativeDate from "../UI/relativeDate";
import Saves from "./db/saves";

const Database = ({
  databases,
  setDatabases,
  setMenu,
}: {
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();
  const params = useSearchParams();

  const [reconnectLoading, setReconnectLoading] = useState(false);
  const [saves, setSaves] = useState<Array<DbSave>>([]);
  const [saveMenu, setSaveMenu] = useState<true | null>(null);

  const dbId = params.get("db_id");
  const db = databases.find((d) => d._id === dbId);

  useEffect(() => {
    if (db) {
      request(`/edit_db`, {
        token: cookies[0].token,
        db_id: db._id,
        name: db.name,
        connection_string: db.connection_string,
        custom_name: db.custom_name,
        authentication_database: db.authentication_database,
      });
    }
  }, [db]);

  useEffect(() => {
    if (db) {
      request(`/get_db_saves`, {
        token: cookies[0].token,
        db_id: db._id,
      }).then((res) => {
        if (res.saves) {
          setSaves(res.saves);
        }
      });
    }
  }, [db]);

  return (
    <div>
      <div className="flex items-center">
        <h1 className={dashboardStyles.title}>Database: {db?.custom_name}</h1>
        <p
          className={[styles.status, styles[db?.status || "connecting"]].join(
            " "
          )}
        >
          {db?.status || "connecting"}
        </p>
        <ButtonContainer loading={reconnectLoading}>
          <button
            className="button glass ml-3"
            onClick={() => {
              setReconnectLoading(true);
              setDatabases(
                databases.map((t) => {
                  if (t._id === db?._id) {
                    return {
                      ...t,
                      status: "connecting",
                    };
                  }
                  return t;
                })
              );
              request(`/check_db_connection`, {
                token: cookies[0].token,
                db_id: db?._id,
              }).then((res) => {
                loadDbs(cookies[0].token, setDatabases);
                setReconnectLoading(false);
                if (res.message) {
                  setMenu(
                    <Popup title={"Error"} setMenu={setMenu} actionBar={null}>
                      {res.message}
                    </Popup>
                  );
                }
              });
            }}
          >
            Reconnect
          </button>
        </ButtonContainer>
      </div>
      {db?.message && db.status === "disconnected" ? (
        <section className="my-4">
          <p className={styles.errorMessage}>{db?.message}</p>
        </section>
      ) : null}
      <section className="my-4">
        <div className="flex items-center w-full">
          <button
            className="button glass filled mx-auto"
            onClick={() => setSaveMenu(true)}
          >
            Last save{" "}
            {db?.last_save ? <RelativeDate date={db?.last_save} /> : "never"}
          </button>
          {db && (
            <SaveNow
              db={db}
              setDatabases={setDatabases}
              setMenu={setMenu}
              databases={databases}
            />
          )}
        </div>
      </section>
      <section className="mb-4">
        <h2>Settings</h2>
        <div className="flex items-center">
          <label className="mr-3">Connection string: </label>
          <TextInput
            value={db?.connection_string || ""}
            placeholder="Connection string"
            onChange={(e) => {
              if (db)
                setDatabases(
                  databases.map((t) => {
                    if (t._id === db._id) {
                      return {
                        ...t,
                        connection_string: e.target.value,
                      };
                    }
                    return t;
                  })
                );
            }}
          ></TextInput>
        </div>
        <div className="flex items-center my-2">
          <label className="mr-3">Rename: </label>
          <TextInput
            placeholder="Name"
            value={db?.name || ""}
            onChange={(e) => {
              if (db)
                setDatabases(
                  databases.map((t) => {
                    if (t._id === db._id) {
                      return {
                        ...t,
                        name: e.target.value,
                      };
                    }
                    return t;
                  })
                );
            }}
          />
        </div>
        <div className="flex items-center my-2">
          <label className="mr-3">Custom name: </label>
          <TextInput
            placeholder="Name"
            value={db?.custom_name || ""}
            onChange={(e) => {
              if (db)
                setDatabases(
                  databases.map((t) => {
                    if (t._id === db._id) {
                      return {
                        ...t,
                        custom_name: e.target.value,
                      };
                    }
                    return t;
                  })
                );
            }}
          />
        </div>
        <div className="flex items-center my-2">
          <label className="mr-3">Authentication database: </label>
          <TextInput
            placeholder="Authentication database"
            value={db?.authentication_database || ""}
            onChange={(e) => {
              if (db)
                setDatabases(
                  databases.map((t) => {
                    if (t._id === db._id) {
                      return {
                        ...t,
                        authentication_database: e.target.value,
                      };
                    }
                    return t;
                  })
                );
            }}
          />
        </div>
      </section>
      <section className="mb-4">
        <h2>Collections</h2>
        {!db?.collections || db?.collections?.length === 0 ? (
          <>
            <p className="inactive">No collections found</p>
          </>
        ) : (
          db?.collections?.map((c, index) => (
            <div key={`c_${index}`}>➡ {c}</div>
          ))
        )}
      </section>
      {db && (
        <DeleteDbButton
          db={db}
          databases={databases}
          setDatabases={setDatabases}
          setMenu={setMenu}
        />
      )}
      {saveMenu && db && (
        <Saves
          db={db}
          saves={saves}
          setMenu={setSaveMenu as SetMenu}
          setSaves={setSaves}
        />
      )}
    </div>
  );
};

export default Database;
