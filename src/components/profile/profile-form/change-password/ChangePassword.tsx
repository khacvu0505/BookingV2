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
import { updatePassword } from "@/api/auth.api";
import { handleRenderNoti } from "@/utils/handleRenderNoti";

const ChangePassword = (props: any, ref: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmmitting, setIsSubmmitting] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );

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

  const handleSubmitForm = (data: any) => {
    setIsSubmmitting(true);
    const newData = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
      confirmNewPassword: data?.confirmNewPassword,
    };
    updatePassword(newData)
      .then(() => {
        setIsSubmmitting(false);
        setIsVisible(false);
        handleRenderNoti("Cập nhật mật khẩu thành công", "success");
      })
      .catch(() => {
        handleRenderNoti("Vui lòng thử lại sau", "error");
        setIsSubmmitting(false);
      });
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
      <div className="currencyMenu__content bg-white rounded-4 authen_modal">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between px-30 pb-20 sm:px-15 border-bottom-light">
          <div className=" fw-500 lh-15 w-100 text-center">
            {/* <img src="/img/general/logo-okdimall.svg" alt="logo" width={100} /> */}
            <p className="mt-10 text-dark-1 text-20">Cập nhật mật khẩu</p>
          </div>
          {/* End Title */}

          {/* <button className="pointer" onClick={handleCurrency}>
            <i className="icon-close" />
          </button> */}
          {/* End colse button */}
        </div>
        {/* End flex wrapper */}

        <div className="row justify-content-center mt-30 mb-30">
          <div className="col-10 mb-20">
            <div className="form-input ">
              <input
                type="password"
                required
                name="currentPassword"
                {...register("currentPassword")}
                // value={profileForm.name}
                // onChange={handleChangeForm}
              />

              <label className="lh-1 text-14 text-light-1">
                Mật khẩu hiện tại
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
                // value={profileForm.name}
                // onChange={handleChangeForm}
              />
              <label className="lh-1 text-14 text-light-1">Mật khẩu mới</label>
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
                // value={profileForm.name}
                // onChange={handleChangeForm}
              />
              <label className="lh-1 text-14 text-light-1">
                Nhập lại mật khẩu
              </label>
            </div>
            {errors.confirmNewPassword &&
              handleRenderMessageError(errors.confirmNewPassword.message)}
          </div>
          <div className="col-10">
            <button
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handleSubmit(handleSubmitForm)}
              disabled={isSubmmitting}
            >
              {isSubmmitting && <span className="loader mr-15"></span>}
              Cập nhật <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ChangePassword);
