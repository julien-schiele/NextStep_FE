"use client";

import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchFromClient } from "@/lib/api/client";
import { P } from "@/components/ui/text";
import { toast } from "sonner";

type FormValues = {
    old_password: string;
    new_password: string;
    confirm_password: string;
};

export function ChangePasswordForm() {
    const locale = useLocale()
    const t = useTranslations("Profile.ChangePassword");
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const newPasswordValue = watch("new_password");

    const onSubmit = async (data: FormValues) => {
        setSuccess(false);

        try {
            await fetchFromClient("/change-password/", locale, "POST", {
                old_password: data.old_password,
                new_password: data.new_password
            })
        } catch (e) {
            toast.error(e.message, { position: "bottom-center" })
        }

        setSuccess(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label={t("old_password")}
                type="password"
                {...register("old_password", {
                    required: t("errors.old_password_required"),
                })}
                error={errors.old_password?.message}
            />

            <Input
                label={t("new_password")}
                type="password"
                {...register("new_password", {
                    required: t("errors.new_password_required"),
                    minLength: {
                        value: 8,
                        message: t("errors.password_min_length"),
                    },
                })}
                error={errors.new_password?.message}
            />

            <Input
                label={t("confirm_password")}
                type="password"
                {...register("confirm_password", {
                    required: t("errors.confirm_password_required"),
                    validate: (val) =>
                        val === newPasswordValue || t("errors.passwords_do_not_match"),
                })}
                error={errors.confirm_password?.message}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("loading") : t("submit")}
            </Button>

            {success && (
                <P className="text-primary">{t("success")}</P>
            )}
        </form>
    );
}
