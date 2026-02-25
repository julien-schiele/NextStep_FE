import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { H1 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";


export default async function ResetPasswordPage() {
    const t = await getTranslations("ResetPasswordPage")
    return (
        <section className="max-w-lg mx-auto space-y-10">
            <H1>{t("title")}</H1>
            <ResetPasswordForm />
        </section>
    );
}