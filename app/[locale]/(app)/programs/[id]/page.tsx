import { fetchFromServer } from "@/lib/api/server";
import { ProgramHeader } from "@/features/programs/components/detail/ProgramHeader";
import { ProgramHistorySection } from "@/features/programs/components/detail/ProgramHistorySection";
import { ProgramRealisticSection } from "@/features/programs/components/detail/ProgramRealisticSection";
import { ProgramSessionsTimeline } from "@/features/programs/components/detail/ProgramSessionsTimeline";
import { ProgramDetailType, ProgramFiltersType } from "@/types/api/programs";
import { protectedPage } from "@/lib/auth/server";
import { UserProgramType } from "@/types/api/tracking";
import { Stack } from "@/components/layout/Stack";


type PageProps = {
    params: {
        id: string;
    };
};


async function ProgramPage({ params }: PageProps) {
    const { id } = await params;
    const program = await fetchFromServer<ProgramDetailType>(`/programs/${id}`, "GET");
    const filters = await fetchFromServer<ProgramFiltersType>("/programs/filters");

    const userProgramHistoric: UserProgramType[] = await fetchFromServer(`/user-programs/?program=${id}`, "GET")

    const levelDict = Object.fromEntries(filters.level.map(i => [i.value, i.label]));
    const focusAxesDict = Object.fromEntries(filters.focus_axes.map(i => [i.value, i.label]));

    let userProgramInProgress = false
    userProgramHistoric.map(up=>{
        if(up.status === "active"){
            userProgramInProgress = true
        }
    });

    return (
        <section>
            <Stack size="xl">
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
                    history={userProgramHistoric}
                    inProgress={userProgramInProgress}
                />

                <ProgramSessionsTimeline
                    cycles={program.content.cycles}
                />
            </Stack>
        </section>
    )
}

export default protectedPage(ProgramPage)