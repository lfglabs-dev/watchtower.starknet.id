import Icon from "../icons/icon";
import Key from "../icons/paths/key";
import ResetPasswordMenu from "./settings/resetPasswordMenu";
import styles from "@/app/styles/components/dashboard/settings.module.css";
import Chat from "../icons/paths/chat";
import Mail from "../icons/paths/mail";
import Hashtag from "../icons/paths/hashtag";
import DiscordWebhookMenu from "./settings/discordWebhookMenu";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TelegramConnectMenu from "./settings/telegramConnectMenu";

const Settings = ({
  setMenu,
  permissions,
}: {
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  return (
    <div className={dashboardStyles.pageContent}>
      <h1 className={dashboardStyles.title}>Settings</h1>
      <main className={styles.container}>
        <h2 className="text-outline my-4">Local</h2>
        <section className={styles.section}>
          <button
            className={[styles.element, "button glass flex items-center"].join(
              " "
            )}
            onClick={() => setMenu(<ResetPasswordMenu setMenu={setMenu} />)}
          >
            <Icon>
              <Key />
            </Icon>
            <p className="ml-1">Change password</p>
          </button>
          <button
            className={[styles.element, "button glass flex items-center"].join(
              " "
            )}
            onClick={() => alert("Not implemented yet")}
          >
            <Icon>
              <Mail />
            </Icon>
            <p className="ml-1">Connect email</p>
          </button>
        </section>
        {permissions.includes("administrator") && (
          <section className={styles.section}>
            <h2 className="text-outline">Global</h2>
            <button
              className={[
                styles.element,
                "button glass flex items-center",
              ].join(" ")}
              onClick={() => setMenu(<DiscordWebhookMenu setMenu={setMenu} />)}
            >
              <Icon>
                <Hashtag />
              </Icon>
              <p className="ml-1">Set Discord Webhook</p>
            </button>
            <button
              className={[
                styles.element,
                "button glass flex items-center",
              ].join(" ")}
              onClick={() => setMenu(<TelegramConnectMenu setMenu={setMenu} />)}
            >
              <Icon>
                <Chat />
              </Icon>
              <p className="ml-1">Set Telegram channel</p>
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Settings;
