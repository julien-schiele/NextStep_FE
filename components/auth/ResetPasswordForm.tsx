"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { fetchFromClient } from "@/lib/api/client";
import { P } from "../ui/text";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";


type FormInputs = {
    password: string;
    confirmPassword: string;
};


export function ResetPasswordForm() {
    const t = useTranslations("ResetPasswordPage")
    const locale = useLocale()
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [success, setSuccess] = useState(false);
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormInputs>();
    const passwordValue = watch("password", "");

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await fetchFromClient("/reset-password/", locale, "POST", {
                token,
                new_password: data.password,
            });
            setSuccess(true);
            router.push("/?showAuthDialog=true")
        } catch (e) {
            toast.error(e.message, { position: "bottom-center" })
        }
    };

    if (success) return <P>{t("success_msg")}</P>;

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label={t("new_password_label")}
                type="password"
                {...register("password", {
                    required: t("password_required")
                })}
                error={errors.password?.message}
            />

            <Input
                label={t("confirm_password_label")}
                type="password"
                {...register("confirmPassword", {
                    required: t("confirmation_required"),
                    validate: val =>
                        val === passwordValue || t("passwords_do_not_match")
                })}
                error={errors.confirmPassword?.message}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("resetting") : t("reset_button")}
            </Button>
        </form>
    );
}
