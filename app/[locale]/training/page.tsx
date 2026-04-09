import { TrainingPageClient } from "@/features/training/components/TrainingPageClient";
import { ProgramDetailType, SequenceListType } from "@/types/api/programs";
import { UserProgramType } from "@/types/api/tracking";
import { fetchFromServer } from "@/lib/api/server"
import { protectedPage } from "@/lib/auth/server";
import { getTodaySequences } from "@/features/training/services";


async function TrainingPage() {
    const currentUserProgram: UserProgramType | null = await fetchFromServer("/user-programs/active/", "GET")
    const currentProgram: ProgramDetailType | null = await fetchFromServer(`/programs/${currentUserProgram?.program}`, "GET")

    let todaySequences: SequenceListType | [] = []
    if (currentProgram && currentUserProgram) {
        todaySequences = getTodaySequences({ currentProgram, currentUserProgram })
    }

    {/* Client Component for interactions */ }
    return (
        <main className="flex-1 fixed top-0 h-screen px-6 w-full flex justify-center items-center">
            <TrainingPageClient sequenceList={todaySequences} userProgram={currentUserProgram!} />
        </main>
    )
}

export default protectedPage(TrainingPage)