import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateTypeMenu from "./types/createTypeMenu";
import styles from "@/app/styles/components/dashboard/types.module.css";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TypeSystem from "../UI/fileSystem/typeSystem";
import { useRouter } from "next/navigation";

const Types = ({
  setMenu,
  types,
  setTypes,
}: {
  setMenu: SetMenu;
  types: Type[];
  setTypes: (types: Array<Type>) => void;
}) => {
  const router = useRouter();
  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Types</h1>
      <button
        className="button glass flex items-center my-4"
        onClick={() =>
          setMenu(
            <CreateTypeMenu
              setMenu={setMenu}
              types={types}
              setTypes={setTypes}
            />
          )
        }
      >
        <Icon>
          <Plus />
        </Icon>
        <p>Create a new type</p>
      </button>
      <section className={styles.container}>
        <TypeSystem
          onSelected={(element) =>
            router.push(`/dashboard?page=type&type_id=${element.id}`)
          }
          types={types}
        />
      </section>
    </div>
  );
};

export default Types;
