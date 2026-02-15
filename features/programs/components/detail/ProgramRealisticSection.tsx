import { Card } from "@/components/ui/card";
import { H3, UL, LI } from "@/components/ui/text";
import { ProgramDetailType } from "@/types/api/programs/index";
import { getTranslations } from "next-intl/server";


interface ProgramRealisticSectionProps {
    realistic: ProgramDetailType["realistic_if"];
    notRealistic: ProgramDetailType["not_realistic_if"];
}

// type ProgramRealistics = Pick<
//   ProgramType,
//   "realistic_if" | "not_realistic_if"
// >;

// export async function ProgramRealisticSection({
//   realistic_if,
//   not_realistic_if,
// }: ProgramRealisticSectionProps) {


export async function ProgramRealisticSection({ realistic, notRealistic }: ProgramRealisticSectionProps) {
    const t = await getTranslations("ProgramDetailPage")
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card className="space-y-5">
                <H3>{t("realistic_if")} :</H3>
                <UL>
                    {realistic.map((criteria: string) => (
                        <LI key={criteria}>{criteria}</LI>
                    ))}
                </UL>
            </Card>
            <Card className="space-y-5">
                <H3>{t("not_realistic_if")} :</H3>
                <UL>
                    {notRealistic.map((criteria: string) => (
                        <LI key={criteria}>{criteria}</LI>
                    ))}
                </UL>
            </Card>
        </div>
    )
}