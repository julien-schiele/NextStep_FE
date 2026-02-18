import { useTranslations } from "next-intl";


type Props = {
    current: number;
    total: number;
    percent: number;
}


export function TrainingProgress({ current, total, percent }: Props) {
    const t = useTranslations("TrainingPage")
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>{t("sequence")} {current} / {total}</span>
                <span>{percent}%</span>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}