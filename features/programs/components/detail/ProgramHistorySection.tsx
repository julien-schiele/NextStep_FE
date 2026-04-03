"use client";

import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/text";
import { Link, useRouter } from "@/i18n/navigation";
import { fetchFromClient } from "@/lib/api/client";
import { useLocale, useTranslations } from "next-intl";
import { MouseEventHandler } from "react";
import { UserProgramType } from "@/types/api/tracking";
import { getDurationInDays } from "@/lib/utils";
import { ClientDate } from "@/components/ui/date";
import { Tag, tagVariants } from "@/components/ui/tag";
import { VariantProps } from "class-variance-authority";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";


interface ProgramHistorySectionProps {
    programId: string;
    history: UserProgramType[];
    inProgress: boolean;
}


export function ProgramHistorySection({ programId, history, inProgress }: ProgramHistorySectionProps) {
    const t = useTranslations("ProgramDetailPage")
    const locale = useLocale()
    const router = useRouter()

    const tagStatus: Record<
        "active" | "abandoned" | "completed",
        VariantProps<typeof tagVariants>["variant"]
    > = {
        active: "default",
        abandoned: "destructive",
        completed: "outline",
    }

    const handleStart: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        try {
            await fetchFromClient<UserProgramType>(
                "/user-programs/",
                locale,
                "POST",
                {
                    program: programId,
                }
            );
            router.push("/dashboard");
        } catch (e: any) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    return (
        <div className="space-y-10">
            <H2>{t("historic")}</H2>
            <div className="flex flex-col gap-4">
                {history.map((h, i) => {
                    const durationInDays = getDurationInDays(h.start_date, h.end_date)
                    return (
                        <Card key={i} className="flex justify-between items-center">
                            <P className="flex-1 text-start">
                                <ClientDate dateString={h.start_date} />
                                -
                                <ClientDate dateString={h.end_date} />
                            </P>
                            {/* TODO: implement feedback for program */}
                            <P className="flex-1 text-center">Feedaback ?</P>
                            <P className="flex-1 text-center">{durationInDays} {t("day", { count: durationInDays! })}</P>
                            <P className="flex-1 text-center">
                                <Tag variant={tagStatus[h.status!]} className="text-xs capitalize">{h.status_display}</Tag>
                            </P>
                        </Card>
                    )
                })}
            </div>
            <div className="flex justify-center">
                {inProgress ? (
                    <Button asChild>
                        <Link href={"/dashboard"}>{t("continue_program")}</Link>
                    </Button>
                ) : (
                    <Button onClick={handleStart}>
                        <Link href={"#"}>{t("start_program")}</Link>
                    </Button>
                )}
            </div>
        </div>
    )
}