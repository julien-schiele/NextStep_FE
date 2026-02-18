import { H1, H3 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";

interface Props {
    firstName?: string;
}

export async function DashboardHeader({ firstName }: Props) {
    const t = await getTranslations("DashboardPage")
    return (
        <div className="space-y-4">
            <H1>{t("hello")} <span className="text-primary">{firstName}</span></H1>
            <H3>{t("motivation")}</H3>
        </div>
    );
}
