"use client";

import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { SequenceType } from "@/types/api/programs";
import { TrainingHeader } from "./TrainingHeader";
import { TrainingSequenceSlider } from "./TrainingSequenceSlider";
import { TrainingSessionCompleteScreen } from "./TrainingSessionCompleteScreen";
import { TrainingProgress } from "./TrainingProgress";
import { fetchFromClient } from "@/lib/api/client";
import { useLocale } from "next-intl";
import { UserProgramType } from "@/types/api/tracking";


type Props = {
    sequences: SequenceType[];
    userProgram: UserProgramType;
}


export function TrainingPageClient({ sequences, userProgram }: Props) {
    const router = useRouter();
    const locale = useLocale()
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [sessionFinished, setSessionFinished] = useState(false);

    const totalSequences = sequences.length;
    const progressPercent = Math.round((sequenceIndex / totalSequences) * 100);


    const saveSession = (rating:string) => {
        fetchFromClient(`/user-programs/${userProgram.id}/sessions/`, locale, "POST",
            {
                "session_in_cycle": userProgram.next_session_in_cycle,
                "cycle_count": userProgram.next_cycle,
                "session_snapshot": sequences,
                "rating": rating
            }
        )
        router.push("/dashboard")
    };

    const nextSequence = () => {
        if (sequenceIndex < totalSequences - 1) {
            setSequenceIndex((prev) => prev + 1);
        } else {
            setSessionFinished(true);
        }
    };

    const prevSequence = () => {
        if (sequenceIndex > 0) {
            setSequenceIndex((prev) => prev - 1);
        }
    };

    if (sessionFinished) {
        return <TrainingSessionCompleteScreen onFinish={saveSession} />;
    }

    return (
        <section className="h-full flex flex-col justify-between gap-6">
            <TrainingHeader />

            <TrainingProgress
                current={sequenceIndex + 1}
                total={totalSequences}
                percent={progressPercent}
            />

            <TrainingSequenceSlider
                sequence={sequences[sequenceIndex]}
                index={sequenceIndex}
                total={totalSequences}
                onNext={nextSequence}
                onPrev={prevSequence}
            />
        </section>
    );
}
