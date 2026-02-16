import { updateUserInfo } from "@/api/user.api";
import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import { profileFormSchema } from "@/schemas/profileFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/features/app/appSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

const ProfileForm = ({ dataUser }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      firstName: dataUser?.firstName || "",
      lastName: dataUser?.lastName || "",
      mobileNo: dataUser?.mobileNo || "",
      email: dataUser?.email || "",
    },
    resolver: yupResolver(profileFormSchema) as any,
  });

  const [profileForm, setProfileForm] = useState({
    firstName: dataUser?.firstName || "",
    lastName: dataUser?.lastName || "",
    email: dataUser?.email || "",
    phoneNumber: dataUser?.mobileNo || "",
  });

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => {
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append("userID", dataUser.userID);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("mobileNo", data.mobileNo);
      formData.append("email", data.email);
      return updateUserInfo(formData);
    },
    onSuccess: (_, data) => {
      dispatch(
        updateProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          fullName: `${data.firstName} ${data.lastName}`,
        })
      );
      Swal.fire({
        title: t("COMMON.SUCCESS"),
        icon: "success",
        confirmButtonText: t("COMMON.CLOSE"),
        confirmButtonColor: "#f52549",
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
        position: "top",
        customClass: {
          popup: "mt-60",
        },
      });
    },
    onError: () => {
      Swal.fire({
        title: t("COMMON.FAILED"),
        icon: "error",
        confirmButtonText: t("COMMON.CLOSE"),
        confirmButtonColor: "#f52549",
        allowEscapeKey: false,
        allowEnterKey: true,
        allowOutsideClick: false,
        position: "top",
        customClass: {
          popup: "mt-60",
        },
      });
    },
  });

  const handleSubmitProfile = (data) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitProfile)}>
      <div className="row px-0 w-75 ml-0 xl:w-1/1">
        <div className="mb-30 col-12 col-md-6 pl-0 md:pr-0">
          <Input
            required
            label={t("COMMON.LABEL_FIRST_NAME")}
            name="firstName"
            onChange={handleChangeForm}
            register={register}
            error={errors.firstName}
          />
        </div>
        <div className="mb-30 col-12 col-md-6 pr-0 md:pl-0">
          <Input
            required
            label={t("COMMON.LABEL_LAST_NAME")}
            name="lastName"
            onChange={handleChangeForm}
            register={register}
            error={errors.lastName}
          />
        </div>
      </div>
      <div className="mb-30 w-75 xl:w-1/1">
        <Input
          label="Email"
          name="email"
          onChange={handleChangeForm}
          disabled
          register={register}
          error={errors.email}
        />
      </div>
      <div className="mb-60 w-75 xl:w-1/1 xl:mb-30">
        <Input
          label={t("COMMON.LABEL_PHONE")}
          name="mobileNo"
          onChange={handleChangeForm}
          register={register}
          error={errors.mobileNo}
        />
      </div>
      <div className="d-flex justify-content-end w-75 xl:w-1/1">
        <Button htmlType="submit" isLoading={updateProfileMutation.isPending}>
          {t("PROFILE.UPDATE_INFORMATION")}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
