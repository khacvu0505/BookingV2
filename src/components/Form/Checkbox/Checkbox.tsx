import "./Checkbox.style.scss";

interface CheckboxProps {
  name?: any;
  required?: boolean;
  label?: any;
  register?: any;
  checked?: any;
  [key: string]: any;
}

const Checkbox = ({
  name,
  required = false,
  label,
  register,
  checked,
  ...rest
}: CheckboxProps) => {
  return (
    <div className="okdimall_checkbox">
      <input
        {...rest}
        type="checkbox"
        name={name}
        {...(checked !== undefined ? { checked } : {})}
        {...(register && register(name, { required }))}
      />
      <div className="form-checkbox__mark">
        <div className="form-checkbox__icon icon-check" />
      </div>
      <label className="okdimall_checkbox-label">
        {label} {required && <span className="text-danger"> *</span>}
      </label>
    </div>
  );
};

export default Checkbox;
