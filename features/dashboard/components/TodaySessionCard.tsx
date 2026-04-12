"use client";

import { Card } from "@/components/ui/card";
import { Key, useState } from "react";
import { DashboardExerciseCard } from "./DashboardExerciseCard";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { H2, H4 } from "@/components/ui/text";
import { fetchFromClient } from "@/lib/api/client";
import { ExercisePreviewType, SequenceListType } from "@/types/api/programs";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";


interface Props {
    sequenceList: SequenceListType;
    userProgramId: string;
}


export function TodaySessionCard({ sequenceList, userProgramId }: Props) {
    const t = useTranslations("DashboardPage");
    const locale = useLocale();
    const [showAbandonDialog, setShowAbandonDialog] = useState(false);

    const abandonTheProgram = async () => {
        try {
            await fetchFromClient(
                `/user-programs/${userProgramId}/`, locale, "PATCH", {
                status: "abandoned"
            });
            window.location.reload();
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    return (
        <Card className="w-full space-y-6">
            <H2>{t("next_session")}</H2>

            {sequenceList.map((sequence, i) => {
                const sequenceNumber = i + 1;
                return (
                    <div key={i} className="space-y-2">
                        <H4 className="text-muted-foreground">
                            {t("sequence", { count: sequenceNumber })} {" "}{sequenceNumber}
                        </H4>

                        <div className="flex flex-wrap justify-evenly gap-6 mt-4">
                            {sequence.map((exercise: ExercisePreviewType, idx: Key | null | undefined) => (
                                <DashboardExerciseCard
                                    key={idx}
                                    value={exercise.value}
                                    name={exercise.name}
                                    resolution={exercise.resolution}
                                    practice_zone={exercise.practice_zone}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-around">
                <Button variant={"destructive"} className="w-1/3" size="lg" onClick={() => setShowAbandonDialog(true)}>
                    {t("abandon")}
                </Button>
                <Button asChild className="w-1/3" size="lg">
                    <Link href="/training/">{t("start")}</Link>
                </Button>
            </div>

            <AlertDialog open={showAbandonDialog} onOpenChange={setShowAbandonDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("abandon_confirm_title")}</AlertDialogTitle>
                        <AlertDialogDescription>{t("abandon_confirm_description")}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction onClick={abandonTheProgram}>{t("abandon")}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}