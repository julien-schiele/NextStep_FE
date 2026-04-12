import { Card } from "@/components/ui/card";
import { H3, P } from "@/components/ui/text";
import { Link } from "@/i18n/navigation";
import { MdFitnessCenter } from "react-icons/md";
import { GiMountainClimbing } from "react-icons/gi";
import { useTranslations } from "next-intl";
import { ProgramListType } from "@/types/api/programs";


interface Props {
    program: ProgramListType;
    levelDict: Record<string, string>;
}


export function ProgramCard({ program, levelDict }: Props) {
    const t = useTranslations("ProgramDetailPage")
    return (
        <Link href={`programs/${program.id}`}>
            <Card className="cursor-pointer hover:ring rounded-2xl h-50 overflow-hidden flex flex-col">
                <div className="flex gap-4 flex-1 p-2">

                    <div className="flex flex-col items-center gap-2 w-20 shrink-0 mr-2">
                        <div className="text-primary">
                            {program.focus === "general_fitness" && <MdFitnessCenter size={36} />}
                            {program.focus === "climbing_performance" && <GiMountainClimbing size={36} />}
                        </div>
                        <span className="text-xs">
                            ⏱ {program.duration_days} {t("day", { count: 0 })}
                        </span>
                        <span className="text-xs rounded-full border px-2 py-1">
                            {levelDict[program.level!]}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <H3 className="text-lg font-semibold line-clamp-2">
                            {program.name}
                        </H3>
                        <P className="text-sm text-muted-foreground">
                            {program.description}
                        </P>
                    </div>

                </div>
            </Card>
        </Link>
    );
}
