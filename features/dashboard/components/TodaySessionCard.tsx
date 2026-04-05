"use client";

import { Card } from "@/components/ui/card";
import { Key } from "react";
import { DashboardExerciseCard } from "./DashboardExerciseCard";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { H2, H4 } from "@/components/ui/text";
import { fetchFromClient } from "@/lib/api/client";
import { ExercisePreviewType, SequenceListType } from "@/types/api/programs";
import { toast } from "sonner"


interface Props {
    sequenceList: SequenceListType;
    userProgramId: string;
}


export function TodaySessionCard({ sequenceList, userProgramId }: Props) {
    const t = useTranslations("DashboardPage")
    const locale = useLocale()

    const abandonTheProgram = async () => {
        try {
            await fetchFromClient(
                `/user-programs/${userProgramId}/`, locale, "PATCH", {
                status: "abandoned"
            }
            );
            window.location.reload();
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    return (
        <Card className="p-6 space-y-6">
            <H2>{t("next_session")}</H2>

            {sequenceList.map((sequence, i) => {
                const sequenceNumber = i + 1
                return (
                    <div key={i} className="space-y-2">
                        <H4 className="text-muted-foreground">
                            {t("sequence", { count: sequenceNumber })} {" "}{sequenceNumber}
                        </H4>

                        <div className="flex flex-wrap justify-evenly gap-6 mt-4">
                            {
                                sequence.map((exercise: ExercisePreviewType, idx: Key | null | undefined) => (
                                    <DashboardExerciseCard
                                        key={idx}
                                        value={exercise.value}
                                        name={exercise.name}
                                        resolution={exercise.resolution}
                                        practice_zone={exercise.practice_zone}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-around">
                <Button variant={"destructive"} className="w-1/4" size="lg" onClick={abandonTheProgram}>Abandon</Button>
                <Button asChild className="w-1/3" size="lg">
                    <Link href="/training/">{t("start")}</Link>
                </Button>
            </div>
        </Card>
    );
}
