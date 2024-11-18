import styles from "@/app/styles/components/UI/textInput.module.css";

const TextInput = ({
  value = "",
  type = "text",
  placeholder = "",
  onChange,
  id,
  fit = false,
}: {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  fit?: boolean;
}) => {
  return (
    <input
      type={type}
      className={[styles.input, fit && styles.fit].join(" ")}
      placeholder={placeholder}
      value={onChange && value}
      defaultValue={!onChange ? value : undefined}
      onChange={onChange}
      autoCapitalize="none"
      id={id}
    />
  );
};

export default TextInput;
