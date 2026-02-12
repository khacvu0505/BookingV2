import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/signUpSchema";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import { registerAccount } from "@/api/auth.api";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "@/features/app/appSlice";
import { useDispatch } from "react-redux";
import { STEPS } from "@/components/authen/AuthenModal";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

interface SignUpFormProps {
  setStep?: (step: number) => void;
  emailVerify?: string;
  handleCloseModal?: () => void;
}

const SignUpForm = ({ setStep, emailVerify, handleCloseModal }: SignUpFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: emailVerify,
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    } as any,
    resolver: yupResolver(signUpSchema) as any,
  });
  const [isSubmmitting, setIsSubmmitting] = useState(false);

  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      setFocus(firstErrorKey as any);
    }
  }, [errors]);

  const handleSubmitForm = async (data: Record<string, any>) => {
    setIsSubmmitting(true);
    try {
      // registerAccount(data)
      //   .then(() => {
      //     reset();
      //     dispatch(setIsAuthenticated(true));
      //     handleCloseModal();
      //   })
      //   .catch(() => {
      //     toast.error("Dang ky that bai");

      //     setIsSubmmitting(false);
      //   });
      const result = await registerAccount(data as any);
      reset();
      dispatch(setIsAuthenticated(true));
      handleCloseModal();
    } catch (error) {
      setIsSubmmitting(false);

      handleRenderNoti(t("AUTH.SIGNUP/SIGNUP_FAILED"), "error");
      throw error;
    }
  };

  return (
    <form className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">{t("AUTH.SIGNUP/TITLE")}</h1>
        <p className="mt-10">
          {t("AUTH.SIGNUP/YOU_DO_NOT_HAVE_AN_ACCOUNT")}{" "}
          <span
            className="text-blue-1 cursor-pointer"
            onClick={() => setStep(STEPS.LOGIN)}
          >
            {t("AUTH.SIGNUP/LOGIN_NOW")}
          </span>
        </p>
      </div>
      {/* End .col */}

      <div className="col-6 ">
        <Input
          required
          label={t("AUTH.SIGNUP/FIRST_NAME")}
          // placeholder={"Nhap ..."}
          name="firstName"
          register={register}
          error={errors.firstName}
        />
      </div>
      {/* End .col */}

      <div className="col-6">
        <Input
          required
          label={t("AUTH.SIGNUP/LAST_NAME")}
          // placeholder={"Nhap ..."}
          name="lastName"
          register={register}
          error={(errors as any).lastName}
        />
      </div>
      {/* End .col */}

      <div className="col-12">
        <Input
          required
          label={t("COMMON.EMAIL")}
          // placeholder={"Nhap email ..."}
          name="email"
          register={register}
          error={errors.email}
          disabled={Boolean(emailVerify)}
        />
      </div>

      <div className="col-12">
        <Input
          required
          label={t("COMMON.PASSWORD")}
          // placeholder={"Nhap mat khau ..."}
          name="password"
          register={register}
          error={errors.password}
          type="password"
        />
      </div>
      {/* End .col */}

      <div className="col-12">
        {/* <div className="form-input ">
          <input type="password" required {...register("confirmPassword")} />
          <label className="lh-1 text-14 text-light-1">Xac nhan mat khau</label>
        </div>
        {errors.confirmPassword &&
          handleRenderMessageError(errors.confirmPassword.message)} */}

        <Input
          required
          label={t("AUTH.SIGNUP/RE_ENTER_PASSWORD")}
          // placeholder={"Nhap xac nhan ..."}
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          type="password"
        />
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex items-start">
          <div className="form-checkbox mt-4">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            {t("AUTH.SIGNUP/CHECKBOX_SEND_NOTIFICATION")}
          </div>
        </div>
        <div className="d-flex items-start">
          <div className="form-checkbox mt-1">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 ld:text-14 lh-15  ml-10">
            {t("COMMON.I_AGREE")}{" "}
            <span
              className="underline pointer text-primary-500"
              onClick={() => {
                // eslint-disable-next-line no-undef
                window.open("/privacy-policy", "_blank");
              }}
            >
              {t("COMMON.PRIVACY_POLICY")}
            </span>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <Button
          className="w-100"
          onClick={handleSubmit(handleSubmitForm as any)}
          disabled={isSubmmitting}
        >
          {isSubmmitting ? (
            <span className="loader mr-15"></span>
          ) : (
            t("COMMON.SIGNUP")
          )}
        </Button>
        {/* <button
          onClick={handleSubmit(handleSubmitForm)}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          disabled={isSubmmitting}
        >
          {isSubmmitting && <span className="loader mr-15"></span>}
          Dang ky <div className="icon-arrow-top-right ml-15" />
        </button> */}
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
