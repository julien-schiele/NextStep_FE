import { Card } from "@/components/ui/card";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useTranslations } from "next-intl";
import { H3 } from "@/components/ui/text";

export function ChangePasswordCard() {
    const t = useTranslations("Profile.ChangePassword");

    return (
        <Card className="p-6 space-y-4">
            <H3>{t("title")}</H3>
            <ChangePasswordForm />
        </Card>
    );
}
