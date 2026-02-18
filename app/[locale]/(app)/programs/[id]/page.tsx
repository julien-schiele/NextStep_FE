import { fetchFromServer } from "@/lib/api/server";
import { ProgramHeader } from "@/features/programs/components/detail/ProgramHeader";
import { ProgramHistorySection } from "@/features/programs/components/detail/ProgramHistorySection";
import { ProgramRealisticSection } from "@/features/programs/components/detail/ProgramRealisticSection";
import { ProgramSessionsTimeline } from "@/features/programs/components/detail/ProgramSessionsTimeline";
import { ProgramDetailType, ProgramFiltersType } from "@/types/api/programs";
import { protectedPage } from "@/lib/auth/server";


type PageProps = {
    params: {
        id: string;
    };
};


async function ProgramPage({ params }: PageProps) {
    const { id } = await params;
    const program = await fetchFromServer<ProgramDetailType>(`/programs/${id}`, "GET");
    const filters = await fetchFromServer<ProgramFiltersType>("/programs/filters");

    const levelDict = Object.fromEntries(filters.level.map(i => [i.value, i.label]));
    const focusAxesDict = Object.fromEntries(filters.focus_axes.map(i => [i.value, i.label]));

    // TODO: get user current program and historic for this program
    const userProgramInProgress = false;
    let userHistory: any[] = []
    if (userProgramInProgress) {
        userHistory = [
            {
                program_id: id,
                started_at: "2026-01-01T10:00:00Z",
                ended_at: "2026-01-14T10:00:00Z",
                days_taken: 14,
                status: "completed"
            },
            {
                program_id: id,
                started_at: "2025-12-01T10:00:00Z",
                ended_at: "2025-12-14T10:00:00Z",
                days_taken: 14,
                status: "completed"
            }
        ];
    }

    return (
        <section className="space-y-14">
            <ProgramHeader
                program={program}
                levelDict={levelDict}
                focusAxesDict={focusAxesDict}
            />

            <ProgramRealisticSection
                realistic={program.realistic_if}
                notRealistic={program.not_realistic_if}
            />

            <ProgramHistorySection
                programId={id}
                history={userHistory}
                inProgress={userProgramInProgress}
            />

            <ProgramSessionsTimeline
                cycles={program.content.cycles}
            />
        </section>
    )
}

export default protectedPage(ProgramPage)