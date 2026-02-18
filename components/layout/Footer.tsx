import { fetchFromServer } from "@/lib/api/server";
import { PrivacyPolicyType } from "@/types/api/utils";
import { Link } from "@/i18n/navigation";
import parse from "html-react-parser";
import { getTranslations } from "next-intl/server";


export default async function Footer() {
    const t = await getTranslations("Footer");

    const policy: PrivacyPolicyType = await fetchFromServer(`/privacy/`, "GET");

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
