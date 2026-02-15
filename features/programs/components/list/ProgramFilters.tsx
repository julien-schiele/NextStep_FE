"use client";

import { Select } from "@/components/ui/select";
import { FocusAxesEnumType, FocusEnumType, LevelEnumType, ProgramFiltersType } from "@/types/api/programs";
import { useTranslations } from "next-intl";


interface Props {
    filters: ProgramFiltersType;
    selectedFocus: FocusEnumType | undefined;
    selectedLevel: LevelEnumType | undefined;
    selectedFocusAxes: FocusAxesEnumType | undefined;
    onFocusChange: (v: FocusEnumType | undefined) => void;
    onLevelChange: (v: LevelEnumType | undefined) => void;
    onFocusAxesChange: (v: FocusAxesEnumType | undefined) => void;
}


export function ProgramFilters({
    filters,
    selectedFocus,
    selectedLevel,
    selectedFocusAxes,
    onFocusChange,
    onLevelChange,
    onFocusAxesChange,
}: Props) {
    const t = useTranslations("ProgramListPage");

    return (
        <div className="
            w-full
            flex
            flex-col
            sm:flex-row
            sm:flex-wrap
            justify-center
            gap-3
            mb-8
        ">
            <Select
                className="w-full sm:w-55"
                value={selectedFocus ?? ""}
                onChange={(e) => onFocusChange(e.target.value === "" ? undefined : e.target.value as FocusEnumType | undefined)}
            >
                <option value="">{t("focus")}</option>
                {filters.focus.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                ))}
            </Select>

            <Select
                className="w-full sm:w-55"
                value={selectedLevel ?? ""}
                onChange={(e) => onLevelChange(e.target.value === "" ? undefined : e.target.value as LevelEnumType | undefined)}
            >
                <option value="">{t("level")}</option>
                {filters.level.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                ))}
            </Select>

            <Select
                className="w-full sm:w-55"
                value={selectedFocusAxes ?? ""}
                onChange={(e) => onFocusAxesChange(e.target.value === "" ? undefined : e.target.value as FocusAxesEnumType | undefined)}
            >
                <option value="">{t("focus_axes")}</option>
                {filters.focus_axes.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                ))}
            </Select>
        </div>
    );
}
