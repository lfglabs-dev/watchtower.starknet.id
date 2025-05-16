import styles from "@/app/styles/components/UI/switch.module.css";

const Switch = ({
  checked,
  setChecked,
  disabled = false,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        title="Toggle switch"
        disabled={disabled}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
