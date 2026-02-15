import { fetchFromServer } from "@/lib/fetchForServerComponent";
import { H1 } from "@/components/ui/text";
import { getTranslations } from "next-intl/server";
import { ProgramListClient } from "@/features/programs/components/list/ProgramListClient";
import { ProgramListType, ProgramFiltersType } from "@/types/api/programs/index";


export default async function ProgramListPage() {
    const programs = await fetchFromServer<ProgramListType[]>("/programs");
    const filters = await fetchFromServer<ProgramFiltersType>("/programs/filters");
    const t = await getTranslations()

    return (
        <section>
            <H1 className="mb-8">{t("ProgramListPage.title")}</H1>
            {/* Client Component for dynamic filtering */}
            <ProgramListClient initialPrograms={programs} filters={filters} />
        </section>
    );
}
