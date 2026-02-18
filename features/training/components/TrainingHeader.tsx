import { H1 } from "@/components/ui/text";
import { useTranslations } from "next-intl";


export function TrainingHeader() {
    const t = useTranslations("TrainingPage")
    return (
        <div className="flex justify-center items-center pt-10">
            <H1>{t("header_motivation")}</H1>
        </div>
    );
}