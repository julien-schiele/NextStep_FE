"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { fetchFromClient } from "@/lib/api/client";
import { P } from "../ui/text";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { toast } from "sonner";


type FormInputs = {
    email: string;
};


export function ForgotPasswordForm() {
    const t = useTranslations("ForgotPasswordPage")
    const [success, setSuccess] = useState(false);
    const locale = useLocale()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await fetchFromClient("/request-password-reset/", locale, "POST", {
                email: data.email,
            });
            setSuccess(true);
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    if (success) {
        return (
            <div className="space-y-10">
                <P>{t("success_msg")}</P>
                {process.env.NODE_ENV === "development" && (
                    <Button asChild>
                        <Link href="http://localhost:8025">
                            Open Mailhog <MdOutlineMarkEmailUnread />
                        </Link>
                    </Button>
                )}
            </div >)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: t("required_field") })}
                error={errors.email?.message}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("sending") : t("send_email")}
            </Button>
        </form>
    );
}
