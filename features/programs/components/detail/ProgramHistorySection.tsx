import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/text";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server"


export type ProgramHistoryStatus =
    | "completed"
    | "in_progress"
    | "abandoned";

export type ProgramHistoryType = {
    program_id: string;
    started_at: string;   // ISO date string
    ended_at: string;     // ISO date string
    days_taken: number;
    status: ProgramHistoryStatus;
};

interface ProgramHistorySectionProps {
    history: ProgramHistoryType[];
    locale: string;
    inProgress: boolean;
}



export async function ProgramHistorySection({ history, locale, inProgress }: ProgramHistorySectionProps) {
    const t = await getTranslations("ProgramDetailPage")
    return (
        <div className="space-y-10">
            <H2>{t("historic")}</H2>
            <div className="flex flex-col gap-4">
                {history.map((h, i) => (
                    <div key={i} className="flex justify-between p-3 rounded-md border border-border bg-card">
                        <div>
                            <P className="font-semibold">
                                {h.status}
                            </P>
                            <P className="text-xs text-muted-foreground">
                                {new Date(h.started_at).toLocaleDateString(locale)} - {new Date(h.ended_at).toLocaleDateString(locale)}
                            </P>
                        </div>
                        <P className="text-sm font-medium">{h.days_taken} {t("day", { count: h.days_taken })}</P>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                {inProgress ? (
                    <Button asChild>
                        <Link href={"#"}>Continue the program</Link>
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href={"#"}>Start the program</Link>
                    </Button>
                )}
            </div>
        </div>
    )
}