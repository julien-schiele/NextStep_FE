import { H2 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { SessionCard } from "./SessionCard";
import { CycleType } from "@/types/api/programs";


interface ProgramSessionsTimelineProps {
    cycles: CycleType[];
}

export async function ProgramSessionsTimeline({
    cycles,
}: ProgramSessionsTimelineProps) {
    const t = await getTranslations("ProgramDetailPage");
    let sessionNumber = 0;

    return (
        <>
            <H2>{t("program_sessions")}</H2>

            <div className="relative pl-10 space-y-10">
                <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full"></div>
                <div className="absolute left-2 top-6 w-0.5 h-full bg-border"></div>

                {cycles.map((cycle, cycleIndex) => (
                    <Fragment key={cycleIndex}>
                        {cycle.sessions.map((session, sessionIndex) => {
                            sessionNumber += 1;

                            return (
                                <SessionCard
                                    key={sessionIndex}
                                    session={sessionNumber}
                                    sequences={session.sequences}
                                    className="mb-4"
                                />
                            );
                        })}
                    </Fragment>
                ))}
            </div>
        </>
    );
}
