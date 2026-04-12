import { H2 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";
import { SessionCard } from "./SessionCard";
import { CycleType } from "@/types/api/programs";


interface ProgramSessionsTimelineProps {
    cycles: CycleType[];
}

export async function ProgramSessionsTimeline({
    cycles,
}: ProgramSessionsTimelineProps) {
    const t = await getTranslations("ProgramDetailPage");
    const sessions = cycles.flatMap((cycle) => cycle.sessions);

    return (
        <>
            <H2>{t("program_sessions")}</H2>

            <div className="relative pl-10 space-y-10">
                <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full"></div>
                <div className="absolute left-2 top-6 w-0.5 h-full bg-border"></div>

                {sessions.map((session, index) => (
                    <SessionCard
                        key={index}
                        session={index + 1}
                        sequences={session.sequences}
                        className="mb-4"
                    />
                ))}
            </div>
        </>
    );
}
