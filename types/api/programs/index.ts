import { components } from "@/types/api/generated";


/**
 * Base schemas from OpenAPI
 */
export type ProgramListType = components["schemas"]["ProgramList"];
export type ProgramDetailType = components["schemas"]["ProgramDetail"];
export type ProgramFiltersType = components["schemas"]["ProgramFilters"];
export type LevelEnumType = components["schemas"]["LevelEnum"];
export type FocusEnumType = components["schemas"]["FocusEnum"];
export type FocusAxesEnumType = components["schemas"]["FocusAxesEnum"];


/**
 * Derived helper types (strongly typed, non-nullable)
 */
export type ProgramContentType =
    NonNullable<ProgramDetailType["content"]>;

export type CycleType =
    ProgramContentType["cycles"][number];

export type SessionType =
    CycleType["sessions"][number];

export type ExercisePreviewType =
    SessionType["sequences"][number][number];
