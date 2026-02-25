import { H4, P } from "@/components/ui/text";
import { GiMountainClimbing } from "react-icons/gi";
import { Card } from "@/components/ui/card";
import { ExercisePreviewType } from "@/types/api/programs";
import Image from "next/image";


type Props = {
    exercise: ExercisePreviewType
}


export function TrainingExerciseCard({ exercise }: Props) {

    const displayValue =
        exercise.resolution === "duration"
            ? `${exercise.value} s`
            : `${exercise.value} ${exercise.name}`;

    return (
        <Card className="p-0 border-none w-52 min-h-16 flex flex-col items-center justify-center gap-1 bg-secondary text-secondary-foreground">
            {/* TODO: add image or video link in database and fallback in public  */}
            <Image
                src="/sport.png"
                alt="sport"
                width={220}
                height={50}
                className="object-cover"
            />
            <div className="p-3 flex flex-col items-center space-y-2">
                <H4 className="">{displayValue}</H4>

                {exercise.resolution === "duration" && (
                    <P className="text-xs text-muted-foreground">{exercise.name}</P>
                )}

                {exercise.practice_zone === "climbing_gym" && (
                    <GiMountainClimbing className="text-muted-foreground" />
                )}
            </div>
        </Card>
    );
}
