"use client";

import { Card } from "@/components/ui/card";
import { Key } from "react";
import { DashboardExerciseCard } from "./DashboardExerciseCard";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { H2, H3, H4 } from "@/components/ui/text";


interface Props {
    sequences: any[];
}


export function TodaySessionCard({ sequences }: Props) {
    const t = useTranslations("DashboardPage")
    return (
        <Card className="p-6 space-y-6">
            <H2>{t("next_session")}</H2>

            {sequences.map((sequence, i) => {
                const sequenceNumber = i + 1
                return (
                    <div key={i} className="space-y-2">
                        <H4 className="text-muted-foreground">
                            {t("sequence", { count: sequenceNumber })} {" "}{sequenceNumber}
                        </H4>

                        <div className="flex flex-wrap justify-evenly gap-6 mt-4">
                            {
                                sequence.map((exercises: any, edx: Key | null | undefined) => (
                                    exercises.map((exercise: any, idx: Key | null | undefined) => (
                                        <DashboardExerciseCard
                                            key={idx}
                                            value={exercise.value}
                                            name={exercise.name}
                                            resolution={exercise.resolution}
                                            practice_zone={exercise.practice_zone}
                                        />
                                    ))
                                ))
                            }
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-center">
                <Button asChild className="w-1/3" size="lg">
                    <Link href="/training/">{t("start")}</Link>
                </Button>
            </div>
        </Card>
    );
}
