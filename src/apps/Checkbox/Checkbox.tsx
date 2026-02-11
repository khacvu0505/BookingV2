import "./Checkbox.style.scss";

interface CheckboxProps {
  name?: any;
  required?: boolean;
  label?: any;
  register?: any;
  isRadio?: boolean;
  checked?: any;
  [key: string]: any;
}

const Checkbox = ({
  name,
  required = false,
  label,
  register,
  isRadio = false,
  checked, // Nhận checked từ props
  ...rest
}: CheckboxProps) => {
  return (
    <div className={`okdimall_checkbox ${isRadio ? "radio" : ""}`}>
      <input
        {...rest}
        type={isRadio ? "radio" : "checkbox"}
        name={name}
        {...(rest.onChange || register
          ? { checked }
          : { defaultChecked: checked })}
        {...(register && register(name, { required }))}
      />
      {isRadio ? (
        <div className="form-checkbox__mark">
          <span className="form-checkbox__mark_radio_item form-checkbox__icon ri-circle-fill fw-bold text-14 text-primary-500" />
        </div>
      ) : (
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon icon-check" />
        </div>
      )}
      <label className="okdimall_checkbox-label">
        {label} {required && <span className="text-danger"> *</span>}
      </label>
    </div>
  );
};

export default Checkbox;
