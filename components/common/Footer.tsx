import { apiGet } from "@/lib/apiClient";
import { PrivacyPolicyType } from "@/types/api/utils";
import { Link } from "@/i18n/navigation";
import parse from "html-react-parser";
import { getTranslations } from "next-intl/server";

type FooterProps = {
    locale: string;
};

export default async function Footer({ locale }: FooterProps) {
    const t = await getTranslations("Footer");

    const policy: PrivacyPolicyType = await apiGet(`/privacy/`, {locale});

    if (!policy) {
        return (
            <footer className="fixed bottom-0 bg-accent flex w-full h-14 items-center justify-center">
                <small>Loading...</small>
            </footer>
        );
    }

    return (
        <footer className="fixed bottom-0 bg-accent flex w-full h-14 items-center justify-center">
            <small className="flex">
                {policy.short_text ? parse(policy.short_text) : "No short here"}
                &nbsp;
                <Link href="/privacy" className="hover:text-primary transition-colors">
                    {t("know_more")}
                </Link>.
            </small>
        </footer>
    );
}
