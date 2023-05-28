import styles from "@/app/styles/components/dashboard/users.module.css";
import openContextMenu from "@/app/utils/openContextMenu";
import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Plus from "../icons/plus";
import CreateUserMenu from "./user/createUserMenu";
import DeleteUserMenu from "./user/deleteUserMenu";

const Users = ({
  users,
  setUsers,
  setMenu,
}: {
  users: Array<User>;
  setUsers: (services: Array<User>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-outline mr-3">Users</h1>
        <button
          className="button glass flex items-center"
          onClick={() =>
            setMenu(
              <CreateUserMenu
                setMenu={setMenu}
                setUsers={setUsers}
                users={users}
              />
            )
          }
        >
          <Icon>
            <Plus />
          </Icon>
          <p>Create user</p>
        </button>
      </div>
      <div className={styles.usersContainer}>
        {users.map((user, index) => (
          <div
            className={styles.user}
            key={`user_${index}`}
            onContextMenu={(e) =>
              openContextMenu(
                e,
                setMenu,
                <>
                  <h2 className="text-outline">{user.username}</h2>
                  <div className={styles.contextMenuActions}>
                    <button
                      className="button glass danger"
                      onClick={() =>
                        setMenu(
                          <DeleteUserMenu
                            setMenu={setMenu}
                            setUsers={setUsers}
                            users={users}
                            user={user}
                          />
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>,
                400
              )
            }
            onClick={() => {}}
          >
            <strong>{user.username}</strong>
            {user.permissions.map((permission, index) => (
              <p
                className={[
                  styles.permission,
                  permission === "administrator" && styles.administrator,
                ].join(" ")}
                key={`permission_${index}`}
              >
                {permission}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
