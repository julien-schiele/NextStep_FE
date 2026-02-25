import { ProgramListType, ProgramFiltersType } from "@/types/api/programs";
import { ProgramCard } from "./ProgramCard";


interface Props {
    programs: ProgramListType[];
    filters: ProgramFiltersType;
}


export function ProgramGrid({ programs, filters }: Props) {
    const levelDict = Object.fromEntries(
        filters.level.map((i) => [i.value, i.label])
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p) => (
                <ProgramCard key={p.id} program={p} levelDict={levelDict} />
            ))}
        </div>
    );
}
