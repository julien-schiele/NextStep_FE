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
        <div className="flex-1 flex flex-col  items-center mt-2 overflow-auto pb-10">
            <div className="w-full flex flex-col justify-center item-center h-full overflow-auto">
                <div className="w-full h-fit justify-center flex flex-wrap gap-6 overflow-auto">
                    {sequence.map((exercise: ExercisePreviewType, i: number) => (
                        <TrainingExerciseCard exercise={exercise} key={i} />
                    ))}
                </div>
            </div>

            <div className="flex justify-between w-full  gap-6 mt-10">
                {index >= 1 ?
                    <Button className="w-full" onClick={onPrev} variant="secondary" >
                        {t("previous")}
                    </Button>
                    :
                    <Button size={"lg"} className="w-full" asChild variant="secondary" >
                        <Link href="/dashboard/">{t("previous")}</Link>
                    </Button>
                }
                <Button size={"lg"} className="w-full" onClick={onNext}>
                    {index === total - 1 ? t("complete") : t("next")}
                </Button>
            </div>
        </div>
    );
}