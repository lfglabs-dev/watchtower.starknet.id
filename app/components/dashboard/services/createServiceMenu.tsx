import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import TextInput from "../../UI/textInput";

const CreateServiceMenu = ({
  setServices,
  setMenu,
  services,
}: {
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
  services: Array<Service>;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Create service"
      then={() => {
        const app_name = (
          document.getElementById("app_name") as HTMLInputElement
        )?.value;
        request(
          `/create_service`,
          {
            app_name,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then(
          (res) =>
            res.status === "success" &&
            setServices([
              ...services,
              {
                _id: res._id,
                app_name: app_name,
                whitelist: [],
              },
            ])
        );
      }}
      buttonName={"Create"}
      setMenu={setMenu}
      cross={true}
      actionBar={<TextInput id="app_name" placeholder="App name" />}
    ></Popup>
  );
};

export default CreateServiceMenu;
