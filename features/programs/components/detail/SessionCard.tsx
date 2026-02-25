import { getTranslations } from "next-intl/server";
import { IoMdArrowForward } from "react-icons/io";
import { Card } from "@/components/ui/card";
import { Fragment } from "react";
import { ExerciseCard } from "./ExerciseCard";
import { SessionType } from "@/types/api/programs";
import { ImSpinner9 } from "react-icons/im";


interface SessionCardProps {
    session: number;
    sequences: SessionType["sequences"];
    className?: string;
}

export async function SessionCard({
    session,
    sequences,
    className = "",
}: SessionCardProps) {
    const t = await getTranslations("ProgramDetailPage");

    return (
        <Card className={className}>
            {/* SESSION NUMBER */}
            <div className="text-xs bg-accent text-accent-foreground rounded-md w-fit p-2 mb-3">
                {t("session")} #{session}
            </div>

            <div className="flex items-center w-full flex-wrap gap-2">
                {sequences.map((sequence, seqIndex) => (
                    <Fragment key={seqIndex}>
                        {sequence.map((exercise, exIndex) => (
                            <Fragment key={`${seqIndex}-${exIndex}`}>
                                <ExerciseCard
                                    value={exercise.value}
                                    name={exercise.name}
                                    resolution={exercise.resolution}
                                    practice_zone={exercise.practice_zone}
                                />

                                {/* Arrow between exercises in same sequence */}
                                {exIndex < sequence.length - 1 && (
                                    <span className="text-muted-foreground">
                                        <IoMdArrowForward />
                                    </span>
                                )}
                            </Fragment>
                        ))}

                        {/* Separator between sequences */}
                        {seqIndex < sequences.length - 1 && (
                            <Card className="bg-muted text-muted-foreground px-3 py-1 text-sm">
                                <ImSpinner9/>
                            </Card>
                        )}
                    </Fragment>
                ))}
            </div>
        </Card>
    );
}
