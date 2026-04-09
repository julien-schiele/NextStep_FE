"use client";

import { ExercisePreviewType, SequenceType } from "@/types/api/programs";
import { TrainingExerciseCard } from "./TrainingExerciseCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


type Props = {
    sequence: SequenceType;
    index: number;
    total: number;
    onNext: () => void;
    onPrev: () => void;
}


export function TrainingSequenceSlider({ sequence, index, total, onNext, onPrev }: Props) {
    const t = useTranslations("TrainingPage")
    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto flex items-center justify-center">
                <div className="w-full flex flex-wrap justify-center gap-6 pb-4">
                    {sequence.map((exercise: ExercisePreviewType, i: number) => (
                        <TrainingExerciseCard exercise={exercise} key={i} />
                    ))}
                </div>
            </div>

            <div className="flex-none flex justify-between gap-6 pt-4 pb-10">
                {index >= 1 ? (
                    <Button className="w-full" onClick={onPrev} variant="secondary">
                        {t("previous")}
                    </Button>
                ) : (
                    <Button size="lg" className="w-full" asChild variant="secondary">
                        <Link href="/dashboard/">{t("previous")}</Link>
                    </Button>
                )}
                <Button size="lg" className="w-full" onClick={onNext}>
                    {index === total - 1 ? t("complete") : t("next")}
                </Button>
            </div>
        </div>
    )
}