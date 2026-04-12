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
        <Card className="p-0 border-none w-full max-w-52 flex flex-col items-center bg-secondary text-secondary-foreground overflow-hidden">
            {/* TODO: add image or video link in database and fallback in public  */}
            <Image
                src="/sport.png"
                alt="sport"
                width={220}
                height={50}
                className="object-cover"
            />
            <div className="h-20 p-4 flex flex-col items-center justify-center space-y-2 flex-1 w-full">
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
