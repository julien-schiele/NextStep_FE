import { Link } from "@/i18n/navigation";
import ProtectedLink from "../auth/ProtectedLink";
import { useTranslations } from "next-intl";

export function HeaderLinks({ t, className = "", onLinkClick }: {
    t: ReturnType<typeof useTranslations<'Header'>>;
    className?: string;
    onLinkClick?: () => void
}) {
    const completeClassName = `${className} hover:text-primary transition-colors`;
    return (
        <>
            <Link href="/" onClick={onLinkClick} className={completeClassName}>{t("home")}</Link>
            <ProtectedLink href="/programs" onClick={onLinkClick} className={completeClassName}>{t("program")}</ProtectedLink>
            <ProtectedLink href="/dashboard" onClick={onLinkClick} className={completeClassName}>{t("dashboard")}</ProtectedLink>
        </>
    );
}