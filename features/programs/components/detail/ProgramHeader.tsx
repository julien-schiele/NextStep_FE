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
        <Card className="relative overflow-hidden p-5 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start justify-between">

            {/* ICON (top on mobile, right on desktop) */}
            <div className="text-accent flex-shrink-0 order-1 md:order-2 flex justify-center md:justify-end w-full md:w-auto">
                {program.focus === "general_fitness" && (
                    <MdFitnessCenter className="w-20 h-20 md:w-[140px] md:h-[140px] opacity-90" />
                )}
                {program.focus === "climbing_performance" && (
                    <GiMountainClimbing className="w-20 h-20 md:w-[140px] md:h-[140px] opacity-90" />
                )}
            </div>

            {/* CONTENT */}
            <div className="w-full order-2 md:order-1 text-center md:text-left">

                {/* TITLE */}
                <H1 className="text-primary mb-3 md:mb-5 break-words leading-tight">
                    {program.name}
                </H1>

                {/* DESCRIPTION */}
                <P className="mb-4 md:mb-6 break-words">
                    {program.description}
                </P>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {program.level && (
                        <Tag variant="secondary" size="sm" className="max-w-full">
                            {levelDict[program.level!]}
                        </Tag>
                    )}

                    {program.focus_axes?.map((axes: string, index: number) => (
                        <Tag
                            key={index}
                            variant="secondary"
                            size="sm"
                            className="max-w-full"
                        >
                            {focusAxesDict[axes]}
                        </Tag>
                    ))}
                </div>
            </div>
        </Card>
    )
}