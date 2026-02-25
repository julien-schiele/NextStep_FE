import { H4, P } from "@/components/ui/text";
import { GiMountainClimbing } from "react-icons/gi";
import { Card } from "@/components/ui/card";
import { ExercisePreviewType } from "@/types/api/programs";


type ExerciseCardType = Pick<
    ExercisePreviewType,
    "value" | "name" | "resolution" | "practice_zone"
>;

export function ExerciseCard({ value, name, resolution, practice_zone }: ExerciseCardType) {

    const displayValue =
        resolution === "duration"
            ? `${value} s`
            : `${value} ${name}`;

    return (
        <Card className="w-52 min-h-16 flex flex-col items-center justify-center gap-1 bg-secondary text-secondary-foreground p-2">
            <H4 className="text-center">{displayValue}</H4>

            {resolution === "duration" && (
                <P className="text-xs text-muted-foreground">{name}</P>
            )}

            {practice_zone === "climbing_gym" && (
                <GiMountainClimbing className="text-muted-foreground" />
            )}
        </Card>
    );
}
