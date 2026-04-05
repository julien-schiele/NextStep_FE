import { ProgramContentType, ProgramDetailType, SequenceListType } from "@/types/api/programs";
import { UserProgramType } from "@/types/api/tracking";


//#################################################################################################


type getCompletedSessionsProps = {
    currentProgram: { content: ProgramContentType } | null,
    currentUserProgram: UserProgramType | null
}

export function getCompletedSessions({ currentProgram, currentUserProgram }: getCompletedSessionsProps): number {
    if (!currentProgram || !currentUserProgram) return 0;

    return (
        (currentUserProgram.next_cycle - 1) * currentProgram.content.sessions_per_cycles +
        (currentUserProgram.next_session_in_cycle - 1)
    );
}


//#################################################################################################


type getTodaySequencesProps = {
    currentProgram: ProgramDetailType,
    currentUserProgram: UserProgramType
}

export function getTodaySequences({ currentProgram, currentUserProgram }: getTodaySequencesProps): SequenceListType {
    if (!currentProgram || !currentUserProgram) return [];

    let todaySequences: SequenceListType = []
    const currentProgramContent: ProgramContentType = currentProgram!.content!
    currentProgramContent.cycles.map(c => {
        if (c.cycle == currentUserProgram!.next_cycle) {
            c.sessions.map(s => {
                if (s.session == currentUserProgram.next_session_in_cycle) {
                    todaySequences = s.sequences
                }
            })
        }
    })

    return todaySequences;
}
