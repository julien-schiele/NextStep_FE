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
            <div className="text-xs bg-accent text-accent-foreground rounded-md w-fit p-2 mb-3 mx-auto md:mx-0">
                {t("session")} #{session}
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start w-full gap-3">
                {sequences.map((sequence, seqIndex) => (
                    <Fragment key={seqIndex}>
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            {sequence.map((exercise, exIndex) => (
                                <Fragment key={`${seqIndex}-${exIndex}`}>
                                    <ExerciseCard
                                        value={exercise.value}
                                        name={exercise.name}
                                        resolution={exercise.resolution}
                                        practice_zone={exercise.practice_zone}
                                    />

                                    {/* Arrow */}
                                    {exIndex < sequence.length - 1 && (
                                        <span className="hidden md:inline text-muted-foreground">
                                            <IoMdArrowForward />
                                        </span>
                                    )}
                                </Fragment>
                            ))}
                        </div>

                        {/* Separator between sequences */}
                        {seqIndex < sequences.length - 1 && (
                            <Card className="bg-muted text-muted-foreground px-3 py-1 text-sm flex items-center justify-center">
                                <ImSpinner9 />
                            </Card>
                        )}
                    </Fragment>
                ))}
            </div>
        </Card>
    );
}