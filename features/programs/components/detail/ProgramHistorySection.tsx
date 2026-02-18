"use client";

import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/text";
import { Link, useRouter } from "@/i18n/navigation";
import { fetchFromClient } from "@/lib/api/client";
import { useLocale, useTranslations } from "next-intl";
import { MouseEventHandler } from "react";
import { StatusEnumType } from "@/types/api/programs"
import { UserProgramType } from "@/types/api/tracking";

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
    programId: string;
    history: ProgramHistoryType[];
    inProgress: boolean;
}



export function ProgramHistorySection({ programId, history, inProgress }: ProgramHistorySectionProps) {
    const t = useTranslations("ProgramDetailPage")
    const locale = useLocale()
    const router = useRouter()

    const handleStart: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        try {
            const userProgram = await fetchFromClient<UserProgramType>(
                "/user-programs/",
                locale,
                "POST",
                {
                    program: programId,
                }
            );
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Start program error:", error);
            alert(error.message ?? "Une erreur est survenue.");
            // TODO: setState to displau error message in UI, or https://github.com/bvaughn/react-error-boundary
            // setError(error.message);
        }
    };

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
                    <Button onClick={handleStart}>
                        <Link href={"#"}>Start the program</Link>
                    </Button>
                )}
            </div>
        </div>
    )
}