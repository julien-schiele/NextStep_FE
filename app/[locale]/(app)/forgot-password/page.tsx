import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { H1 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";


export default async function ForgetPasswordPage() {
    const t = await getTranslations("ForgotPasswordPage")
    return (
        <section className="max-w-md mx-auto p-4">
            <H1>{t("title")}</H1>
            <ForgotPasswordForm />
        </section>
    );
}