import "./Radio.style.scss";

interface RadioProps {
  name: string;
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent) => void;
  value?: string | number;
}

const Radio = ({
  name,
  label,
  checked = false,
  onChange,
  onClick,
  value,
}: RadioProps) => {
  return (
    <label className="okdimall_radio" onClick={onClick}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange || (() => {})}
        value={value}
        className="okdimall_radio__input"
      />
      <span className="okdimall_radio__mark">
        <span className="okdimall_radio__dot" />
      </span>
      {label && <span className="okdimall_radio__label">{label}</span>}
    </label>
  );
};

export default Radio;
