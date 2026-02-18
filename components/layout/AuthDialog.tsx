"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import { H2 } from "../ui/text";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { fetchFromClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/authProvider";


type LoginFormInputs = {
    email: string;
    password: string;
};

type RegisterFormInputs = {
    first_name: string;
    email: string;
    password: string;
    confirm_password: string;
};

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: Props) {
    const [activeTab, setActiveTab] = useState<"connexion" | "register">("connexion");
    const t = useTranslations("AuthPage");
    const locale = useLocale()
    const { login } = useAuth()

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
    } = useForm<RegisterFormInputs>();

    // LOGIN
    const onLogin: SubmitHandler<LoginFormInputs> = async (data) => {
        login(data.email, data.password)
    };


    // REGISTER
    const onRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        try {
            const newUser = await fetchFromClient("/users/create/", locale, "POST", {
                first_name: data.first_name,
                email: data.email,
                password: data.password,
            });
            setActiveTab("connexion");
        } catch (err: any) {
            alert(err.message);
        }
    };

    const passwordValue = watch("password", "");


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* <DialogTrigger asChild>
                <Button variant="default">{t("sign_in_or_log_in")}</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-md">
                <DialogTitle></DialogTitle>

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
                            {...loginRegister("email", { required: "Email requis" })}
                            error={loginErrors.email?.message}
                        />
                        <Input
                            label={t("password")}
                            type="password"
                            placeholder="••••••••"
                            {...loginRegister("password", { required: "Mot de passe requis" })}
                            error={loginErrors.password?.message}
                        />
                        <Button type="submit" className="w-full" disabled={loginLoading}>
                            {loginLoading ? "Loading..." : t("connect")}
                        </Button>
                        <div className="flex items-center justify-center">
                            <Link href="/forget_password" className="text-text text-xs">
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
                            {...registerRegister("first_name", { required: "Prénom requis" })}
                            error={registerErrors.first_name?.message}
                        />
                        <Input
                            label={t("email")}
                            type="email"
                            placeholder="exemple@mail.com"
                            {...registerRegister("email", { required: "Email requis" })}
                            error={registerErrors.email?.message}
                        />
                        <Input
                            label={t("password")}
                            type="password"
                            placeholder="••••••••"
                            {...registerRegister("password", { required: "Mot de passe requis" })}
                            error={registerErrors.password?.message}
                        />
                        <Input
                            label={t("confirm_password")}
                            type="password"
                            placeholder="••••••••"
                            {...registerRegister("confirm_password", {
                                required: "Confirmation requise",
                                validate: (val) =>
                                    val === passwordValue || "Les mots de passe ne correspondent pas",
                            })}
                            error={registerErrors.confirm_password?.message}
                        />
                        <Button type="submit" className="w-full" disabled={registerLoading}>
                            {registerLoading ? "Loading..." : t("create_account")}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
