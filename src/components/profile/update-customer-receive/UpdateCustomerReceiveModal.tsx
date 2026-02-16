import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";

const UpdateCustomerReceiveModal = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const handleSubmitForm = (data) => {
    // TODO: implement form submission
  };

  useEffect(() => {
    setFocus(Object.keys(errors)[0] as any);
  }, [errors]);

  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);

  return (
    <div
      className={`currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size1">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 ">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <p
              className="mt-10 text-dark"
              style={{
                fontSize: "25px",
              }}
            >
              Cập nhật thông tin
            </p>
          </div>
        </div>

        <form className="row justify-content-center mt-30 mb-30" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="col-10 mb-20">
            <div className="form-input ">
              <input
                type="password"
                required
                name="currentPassword"
                {...register("currentPassword")}
              />

              <label className="lh-1 text-14 text-light-1">
                Current Password
              </label>
              <div></div>
            </div>
            {errors.currentPassword &&
              handleRenderMessageError(errors.currentPassword.message)}
          </div>
          <div className="col-10 mb-20">
            <div className="form-input ">
              <input
                type="password"
                required
                name="newPassword"
                {...register("newPassword")}
              />
              <label className="lh-1 text-14 text-light-1">New Password</label>
            </div>
            {errors.newPassword &&
              handleRenderMessageError(errors.newPassword.message)}
          </div>
          <div className="col-10 mb-20">
            <div className="form-input">
              <input
                type="password"
                required
                name="confirmNewPassword"
                {...register("confirmNewPassword")}
              />
              <label className="lh-1 text-14 text-light-1">
                Confirm New Password
              </label>
            </div>
            {errors.confirmNewPassword &&
              handleRenderMessageError(errors.confirmNewPassword.message)}
          </div>
          <div className="col-10">
            <button
              type="submit"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              UPDATE <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default forwardRef(UpdateCustomerReceiveModal);
