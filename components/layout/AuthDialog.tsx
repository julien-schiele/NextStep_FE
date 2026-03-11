"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { H2, P } from "../ui/text";
import { Link, redirect } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { fetchFromClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/authProvider";
import { toast } from "sonner";


type LoginFormInputs = {
    email: string;
    password: string;
};

type RegisterFormInputs = {
    first_name: string;
    email: string;
    password: string;
    confirm_password: string;
    gdpr_consent: boolean;
};

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: Props) {
    const [activeTab, setActiveTab] = useState<"connexion" | "register">("connexion");
    const t = useTranslations("AuthPage");
    const locale = useLocale()
    const { login, closeAuth } = useAuth()

    // Hooks react-hook-form
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors, isSubmitting: loginLoading },
    } = useForm<LoginFormInputs>();

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        watch,
        formState: { errors: registerErrors, isSubmitting: registerLoading },
    } = useForm<RegisterFormInputs>({
        defaultValues: { gdpr_consent: false },
    });

    // LOGIN
    const onLogin: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            await login(data.email, data.password)
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };


    // REGISTER
    const onRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        try {
            await fetchFromClient("/users/create/", locale, "POST", {
                first_name: data.first_name,
                email: data.email,
                password: data.password,
                gdpr_consent: data.gdpr_consent
            });
            setActiveTab("connexion");
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    const passwordValue = watch("password", "");


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* <DialogTrigger asChild>
                <Button variant="default">{t("sign_in")}</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-md">
                <DialogTitle></DialogTitle>
                <DialogDescription>
                    {t("welcome")}
                </DialogDescription>
                {/* Tabs */}
                <div className="flex justify-around mb-4">
                    <button
                        onClick={() => setActiveTab("connexion")}
                        className={`border-b-2 p-2 w-full ${activeTab === "connexion"
                            ? "border-b-primary font-bold"
                            : "border-b-border"
                            }`}
                    >
                        {t("connexion")}
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`border-b-2 p-2 w-full ${activeTab === "register"
                            ? "border-b-primary font-bold"
                            : "border-b-border"
                            }`}
                    >
                        {t("register")}
                    </button>
                </div>

                {/* LOGIN */}
                {activeTab === "connexion" && (
                    <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                        <H2>{t("connexion")}</H2>
                        <Input
                            label={t("email")}
                            type="email"
                            placeholder="exemple@mail.com"
                            {...loginRegister("email", { required: t("required_field") })}
                            error={loginErrors.email?.message}
                        />
                        <Input
                            label={t("password")}
                            type="password"
                            placeholder="••••••••"
                            {...loginRegister("password", { required: t("required_field") })}
                            error={loginErrors.password?.message}
                        />
                        <Button type="submit" className="w-full" disabled={loginLoading}>
                            {loginLoading ? "Loading..." : t("connect")}
                        </Button>
                        <div className="flex items-center justify-center">
                            <Link href="/forgot-password" onClick={() => onOpenChange(false)} className="text-text text-xs">
                                {t("forgotten_password")}
                            </Link>
                        </div>
                    </form>
                )}

                {/* REGISTER */}
                {activeTab === "register" && (
                    <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                        <H2>{t("register")}</H2>
                        <Input
                            label={t("first_name")}
                            type="text"
                            placeholder="Julien"
                            {...registerRegister("first_name", { required: t("required_field") })}
                            error={registerErrors.first_name?.message}
                        />
                        <Input
                            label={t("email")}
                            type="email"
                            placeholder="exemple@mail.com"
                            {...registerRegister("email", { required: t("required_field") })}
                            error={registerErrors.email?.message}
                        />
                        <Input
                            label={t("password")}
                            type="password"
                            placeholder="••••••••"
                            {...registerRegister("password", { required: t("required_field") })}
                            error={registerErrors.password?.message}
                        />
                        <Input
                            label={t("confirm_password")}
                            type="password"
                            placeholder="••••••••"
                            {...registerRegister("confirm_password", {
                                required: t("confirmation_needed"),
                                validate: (val) =>
                                    val === passwordValue || t("password_mismatch"),
                            })}
                            error={registerErrors.confirm_password?.message}
                        />
                        <label className="block text-sm font-medium mb-4">
                            <input type="checkbox" {...registerRegister("gdpr_consent")} className="mr-2" />
                            {t("i_accept_policy")} : <Link href="/privacy" onClick={closeAuth} className="underline hover:text-primary transition-colors">{t("see_details")}</Link>
                            {registerErrors.gdpr_consent && <P>{registerErrors.gdpr_consent?.message}</P>}
                        </label>
                        <Button type="submit" className="w-full" disabled={registerLoading}>
                            {registerLoading ? "Loading..." : t("create_account")}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
