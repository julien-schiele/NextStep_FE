import { TrainingPageClient } from "@/features/training/components/TrainingPageClient";
import { ProgramDetailType, SequenceType } from "@/types/api/programs";
import { UserProgramType } from "@/types/api/tracking";
import { fetchFromServer } from "@/lib/api/server"
import { protectedPage } from "@/lib/auth/server";


async function TrainingPage() {
    const currentUserProgram: UserProgramType | null = await fetchFromServer("/user-programs/active/", "GET")
    const currentProgram: ProgramDetailType | null = await fetchFromServer(`/programs/${currentUserProgram?.program}`, "GET")

    const sequences: SequenceType[] = []
    currentProgram?.content.cycles.map(c => {
        if (c.cycle == currentUserProgram?.next_cycle) {
            c.sessions.map(s => {
                if (s.session == currentUserProgram.next_session_in_cycle) {
                    sequences.push(s.sequences)
                }
            })
        }
    })
    {/* Client Component for interactions */ }
    return (
        <main className="fixed top-0 h-screen w-full flex justify-center items-center">
            <div className="w-full h-full max-w-6xl">
                <TrainingPageClient sequences={sequences} userProgram={currentUserProgram!}/>
            </div>
        </main>
    )
}

export default protectedPage(TrainingPage)