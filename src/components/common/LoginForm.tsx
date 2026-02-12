import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/loginSchema";
import { loginAccount } from "@/api/auth.api";
import { setIsAuthenticated } from "@/features/app/appSlice";
import { useDispatch } from "react-redux";
import { STEPS } from "@/components/authen/AuthenModal";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

const LoginForm = ({ handleCloseModal, setStep }: { handleCloseModal?: any; setStep?: any }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const { pathname } = useLocation();
  const [isFailed, setIsFailed] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = async (data) => {
    setIsSubmmitting(true);
    try {
      await loginAccount(data);
      setIsFailed(false);

      dispatch(setIsAuthenticated(true));
      reset();
      handleCloseModal && handleCloseModal();
      setIsSubmmitting(false);
    } catch (error) {
      setIsSubmmitting(false);
      setIsFailed(true);
      throw error;
    }
  };

  return (
    <>
      <form className="row y-gap-20">
        <div className="col-12">
          <h1 className="text-22 fw-500"></h1>
          {pathname !== "/login" && (
            <>
              <p className="mt-10 text-16 lg:text-15 md:text-14">
                {t("AUTH.LOGIN/YOU_DO_NOT_HAVE_AN_ACCOUNT")}{" "}
                <span
                  className="text-blue-1 cursor-pointer"
                  onClick={() => setStep && setStep(STEPS.CHECK_EMAIL)}
                >
                  {t("AUTH.LOGIN/SIGNUP_NOW")}
                </span>
              </p>
            </>
          )}
        </div>
        {/* End .col */}

        <div className="col-12">
          <Input
            required
            label={t("COMMON.EMAIL")}
            // placeholder={"Nhập họ và tên người đăng ký"}
            name="email"
            register={register}
            error={errors.email}
          />
        </div>
        {/* End .col */}

        <div className="col-12">
          <Input
            required
            label={t("COMMON.PASSWORD")}
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
        </div>
        {isFailed && (
          <p className="text-primary-500 text-14">
            {t("COMMON.EMAIL_OR_PASSWORD_INCORRECT")}
          </p>
        )}
        {/* End .col */}

        <div className="col-12">
          <p
            className="text-14 fw-500 text-blue-1 underline pointer"
            onClick={() => setStep && setStep(STEPS.FORGOT_PASSWORD)}
          >
            {t("AUTH.LOGIN/FORGOT_PASSWORD")}
          </p>
        </div>
        {/* End .col */}

        <div className="col-12">
          <Button onClick={handleSubmit(handleSubmitForm)} className="w-100">
            {isSubmmitting ? (
              <span className="loader mr-15"></span>
            ) : (
              t("COMMON.LOGIN")
            )}
          </Button>
        </div>
        {/* End .col */}
      </form>
      <div className="col-12 mt-20">
        <div className="text-center text-16 lg:text-15 md:text-14">
          {t("AUTH.LOGIN/DESCRIPTION")}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
