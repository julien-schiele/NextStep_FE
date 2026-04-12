import { H4, P } from "@/components/ui/text";
import { GiMountainClimbing } from "react-icons/gi";
import { Card } from "@/components/ui/card";
import { ExercisePreviewType } from "@/types/api/programs";
import Image from "next/image";


type ExerciseCardType = Pick<
    ExercisePreviewType,
    // TODO: add image to serializer
    "value" | "name" | "resolution" | "practice_zone"
>;

export function DashboardExerciseCard({ value, name, resolution, practice_zone }: ExerciseCardType) {

    const displayValue =
        resolution === "duration"
            ? `${value} s`
            : `${value} ${name}`;

    return (
        <Card className="p-0 border-none w-full max-w-52 flex flex-col items-center justify-center gap-1 bg-secondary text-secondary-foreground">
            {/* TODO: add image in database and fallback in public  */}
            <Image
                src="/sport.png"
                alt="sport"
                width={220}
                height={50}
                className="object-cover"
            />
            <div className="h-20 p-4 flex flex-col items-center">
                <H4 className="text-center">{displayValue}</H4>

                {resolution === "duration" && (
                    <P className="text-xs text-muted-foreground">{name}</P>
                )}

                {practice_zone === "climbing_gym" && (
                    <GiMountainClimbing className="text-muted-foreground" />
                )}
            </div>
        </Card>
    );
}
