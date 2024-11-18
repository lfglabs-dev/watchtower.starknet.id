import styles from "@/app/styles/components/dashboard/users.module.css";
import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateUserMenu from "./user/createUserMenu";
import SolidIcon from "../icons/solidIcon";
import { useRouter } from "next/navigation";
import UserIcon from "./user/userIcon";
import dashboardStyles from "@/app/styles/dashboard.module.css";

const Users = ({
  users,
  setUsers,
  setMenu,
  permissions,
}: {
  users: Array<User>;
  setUsers: (services: Array<User>) => void;
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  const router = useRouter();

  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Users</h1>
      <button
        className="button glass flex items-center my-4"
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

      <div className={styles.usersContainer}>
        {users.map((user, index) => (
          <div key={`user_${index}`}>
            <div
              className={styles.user}
              onClick={() =>
                router.push(`/dashboard?page=user&user_id=${user._id}`)
              }
            >
              <SolidIcon width={25}>
                <UserIcon user={user} />
              </SolidIcon>
              <p>{user.username}</p>
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
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
