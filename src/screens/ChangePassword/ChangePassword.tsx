import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { updatePassword } from "@/api/auth.api";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import MetaComponent from "@/components/MetaComponent";
import { forgotPassword } from "@/api/user.api";
import { getFromLocalStorage } from "@/utils/utils";
import { profile_user } from "@/utils/constants";
import { handleAlert } from "@/utils/handleAlert";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

const metadata = {
  title: "Change Password",
  description: "OKdimall - Travel & Tour",
};

const ChangePassword = () => {
  const { t } = useTranslation();

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

  const updatePasswordMutation = useMutation({
    mutationFn: (data: any) =>
      updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword,
      } as any),
    onSuccess: (res) => {
      if (res?.success) {
        reset();
        handleAlert({
          type: "success",
          title: t("COMMON.SUCCESS"),
          html: `<p>${t("PROFILE.UPDATE_PASSWORD_SUCCESS")}</p>`,
        });
        return;
      }
      handleAlert({
        type: "error",
        title: t("COMMON.FAILED"),
        html: `<p>${res?.error}</p>`,
      });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      handleAlert({
        type: "success",
        title: t("COMMON.SUCCESS"),
        html: t("PROFILE.CHECK_EMAIL_TO_GET_NEW_PASSWORD"),
      });
    },
    onError: () => {
      handleAlert({
        type: "error",
        title: t("COMMON.FAILED"),
        html: t("COMMON.TRY_AGAIN_LATER"),
      });
    },
  });

  const handleSubmitForm = (data) => {
    updatePasswordMutation.mutate(data);
  };

  const handleForgotPassword = () => {
    const email = getFromLocalStorage(profile_user)?.email;
    if (!email) return;
    forgotPasswordMutation.mutate(email);
  };

  useEffect(() => {
    setFocus(Object.keys(errors)[0] as any);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <MetaComponent meta={metadata} />
      <h1 className="text-24 lg:text-22 md:text-20 fw-600 text-neutral-800 mb-8">
        {t("PROFILE.CHANGE_PASSWORD")}
      </h1>
      <p className="text-14 fw-400 text-neutral-500 mb-24">
        {t("PROFILE.CHANGE_PASSWORD_DESC")}
      </p>
      <div className="mb-24 w-75 xl:w-1/1">
        <Input
          label={t("PROFILE.CURRENT_PASSWORD")}
          required
          type="password"
          name="currentPassword"
          register={register}
          error={errors.currentPassword}
        />
      </div>
      <div className="mb-24 w-75 xl:w-1/1">
        <Input
          label={t("PROFILE.NEW_PASSWORD")}
          required
          type="password"
          name="newPassword"
          register={register}
          error={errors.newPassword}
        />
      </div>
      <div className="mb-60 w-75 xl:w-1/1">
        <Input
          label={t("PROFILE.RE_ENTER_NEW_PASSWORD")}
          required
          type="password"
          name="confirmNewPassword"
          register={register}
          error={errors.confirmNewPassword}
        />
      </div>
      <div className="d-flex justify-content-end w-75 xl:w-1/1">
        <Button
          isOutline
          className="mr-16"
          onClick={handleForgotPassword}
          isLoading={forgotPasswordMutation.isPending}
        >
          {t("PROFILE.FORGOT_PASSWORD")}
        </Button>

        <Button
          htmlType="submit"
          isLoading={updatePasswordMutation.isPending}
        >
          {t("PROFILE.SAVE_PASSWORD")}
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
