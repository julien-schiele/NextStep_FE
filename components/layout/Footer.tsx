import { fetchFromServer } from "@/lib/api/server";
import { PrivacyPolicyType } from "@/types/api/utils";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";


export default async function Footer() {
    const t = await getTranslations("Footer");

    const policy: PrivacyPolicyType = await fetchFromServer(`/privacy/`, "GET");

    if (!policy) {
        return (
            <footer className="sticky bottom-0 md:fixed bottom-0 bg-accent flex w-full h-20 md:h-14 items-center justify-center">
                <small>Loading...</small>
            </footer>
        );
    }

    const cleanText = policy.short_text
        ?.replace(/^<p>/, "")
        .replace(/<\/p>$/, "");

    return (
        <footer className="bottom-0 md:fixed bg-accent flex w-full py-3 md:py-3 items-center justify-center border-t border-border">
            <Container className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-center text-xs text-muted-foreground">
                {/* Disclaimer */}
                <span>
                    ⚠️{" "}
                    <span className="font-medium text-foreground">{t("demo_only")}</span>{" "}
                    - {cleanText}
                </span>

                {/* Legal links */}
                <span className="flex items-center gap-3">
                    <Link
                        href="/privacy"
                        className="hover:text-primary transition-colors underline underline-offset-2"
                    >
                        {t("privacy_policy")}
                    </Link>
                    <Link
                        href="/credits"
                        className="hover:text-primary transition-colors underline underline-offset-2"
                    >
                        {t("credits")}
                    </Link>
                    {/* Copyright */}
                    <span>© {new Date().getFullYear()} Julien Schiélé</span>
                </span>

            </Container>
        </footer>
    )
}
