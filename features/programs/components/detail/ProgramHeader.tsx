import { Card } from "@/components/ui/card"
import { H1, P } from "@/components/ui/text"
import { Tag } from "@/components/ui/tag"
import { GiMountainClimbing } from "react-icons/gi"
import { MdFitnessCenter } from "react-icons/md"
import { ProgramDetailType } from "@/types/api/programs/index"


interface ProgramHeaderProps {
    program: Pick<
        ProgramDetailType,
        "name" | "description" | "level" | "focus" | "focus_axes"
    >;
    levelDict: Record<string, string>;
    focusAxesDict: Record<string, string>;
}



export async function ProgramHeader({ program, levelDict, focusAxesDict }: ProgramHeaderProps) {
    return (
        <Card className="p-8 md:p-12 flex justify-between">
            <div>
                <H1 className="text-primary mb-6">{program.name}</H1>
                <P className="mb-6">{program.description}</P>
                {/* Level & focus axes */}
                <div className="flex gap-4 flex-wrap">
                    {program.level &&
                        <Tag variant="secondary" size="sm">{levelDict[program.level!]}</Tag>
                    }
                    {program.focus_axes?.map((axes: string, index: number) => (
                        <Tag key={index} variant="secondary" size="sm">{focusAxesDict[axes]}</Tag>
                    ))}
                </div>
            </div>
            <div className="text-accent">
                {program.focus === "general_fitness" && <MdFitnessCenter size={150} />}
                {program.focus === "climbing_performance" && <GiMountainClimbing size={150} />}
            </div>
        </Card>
    )
}