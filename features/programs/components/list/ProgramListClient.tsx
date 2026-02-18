"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { fetchFromClient } from "@/lib/api/client";
import { ProgramFilters } from "./ProgramFilters";
import { ProgramGrid } from "./ProgramGrid";
import { ProgramListType, ProgramFiltersType, FocusEnumType, LevelEnumType, FocusAxesEnumType } from "@/types/api/programs/index";


interface Props {
    initialPrograms: ProgramListType[];
    filters: ProgramFiltersType;
}


export function ProgramListClient({ initialPrograms, filters }: Props) {
    const [programs, setPrograms] = useState<ProgramListType[]>(initialPrograms);
    const [selectedFocus, setSelectedFocus] = useState<FocusEnumType | undefined>(undefined);
    const [selectedLevel, setSelectedLevel] = useState<LevelEnumType | undefined>(undefined);
    const [selectedFocusAxes, setSelectedFocusAxes] = useState<FocusAxesEnumType | undefined>(undefined);

    const locale = useLocale();

    useEffect(() => {
        async function fetchFiltered() {
            const params = new URLSearchParams();

            if (selectedFocus) params.append("focus", selectedFocus);
            if (selectedLevel) params.append("level", selectedLevel);
            if (selectedFocusAxes) params.append("focus_axes", selectedFocusAxes);

            const data: ProgramListType[] = await fetchFromClient(
                `/programs/?${params.toString()}`,
                locale,
                "GET"
            );

            setPrograms(data);
        }

        fetchFiltered();
    }, [selectedFocus, selectedLevel, selectedFocusAxes]);

    return (
        <>
            <ProgramFilters
                filters={filters}
                selectedFocus={selectedFocus}
                selectedLevel={selectedLevel}
                selectedFocusAxes={selectedFocusAxes}
                onFocusChange={setSelectedFocus}
                onLevelChange={setSelectedLevel}
                onFocusAxesChange={setSelectedFocusAxes}
            />

            <ProgramGrid programs={programs} filters={filters} />
        </>
    );
}
