"use client";

import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { SequenceListType } from "@/types/api/programs";
import { TrainingHeader } from "./TrainingHeader";
import { TrainingSequenceSlider } from "./TrainingSequenceSlider";
import { TrainingSessionCompleteScreen } from "./TrainingSessionCompleteScreen";
import { TrainingProgress } from "./TrainingProgress";
import { fetchFromClient } from "@/lib/api/client";
import { useLocale } from "next-intl";
import { UserProgramType } from "@/types/api/tracking";
import { toast } from "sonner";


type Props = {
    sequenceList: SequenceListType;
    userProgram: UserProgramType;
}


export function TrainingPageClient({ sequenceList, userProgram }: Props) {
    const router = useRouter();
    const locale = useLocale()
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [sessionFinished, setSessionFinished] = useState(false);

    const totalSequences = sequenceList.length;
    const progressPercent = Math.round((sequenceIndex / totalSequences) * 100);


    const saveSession = async (rating: string) => {
        try {
            await fetchFromClient(`/user-programs/${userProgram.id}/sessions/`, locale, "POST",
                {
                    "session_in_cycle": userProgram.next_session_in_cycle,
                    "cycle_count": userProgram.next_cycle,
                    "session_snapshot": sequenceList,
                    "rating": rating
                }
            )
            router.push("/dashboard")
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
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
        <section className="h-[100dvh] flex flex-col justify-between gap-6">
            <TrainingHeader />

            <TrainingProgress
                current={sequenceIndex + 1}
                total={totalSequences}
                percent={progressPercent}
            />

            <TrainingSequenceSlider
                sequence={sequenceList[sequenceIndex]}
                index={sequenceIndex}
                total={totalSequences}
                onNext={nextSequence}
                onPrev={prevSequence}
            />
        </section>
    );
}
