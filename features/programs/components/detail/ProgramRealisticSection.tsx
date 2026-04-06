import { Card } from "@/components/ui/card";
import { H3, UL, LI } from "@/components/ui/text";
import { ProgramDetailType } from "@/types/api/programs/index";
import { getTranslations } from "next-intl/server";


interface ProgramRealisticSectionProps {
    realistic: ProgramDetailType["realistic_if"];
    notRealistic: ProgramDetailType["not_realistic_if"];
}


export async function ProgramRealisticSection({ realistic, notRealistic }: ProgramRealisticSectionProps) {
    const t = await getTranslations("ProgramDetailPage")

    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 px-2 md:px-0 overflow-x-hidden">
            <Card className="space-y-5 w-full max-w-full overflow-hidden">
                <H3 className="break-words">{t("realistic_if")} :</H3>
                <UL className="space-y-2 break-words">
                    {realistic?.map((criteria: string) => (
                        <LI key={criteria} className="break-words">
                            {criteria}
                        </LI>
                    ))}
                </UL>
            </Card>
            <Card className="space-y-5 w-full max-w-full overflow-hidden">
                <H3 className="break-words">{t("not_realistic_if")} :</H3>
                <UL className="break-words">
                    {notRealistic?.map((criteria: string) => (
                        <LI key={criteria} className="break-words">
                            {criteria}
                        </LI>
                    ))}
                </UL>
            </Card>
        </div>
    )
}