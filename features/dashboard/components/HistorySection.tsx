import { Card } from "@/components/ui/card";
import { ClientDate } from "@/components/ui/date";
import { Tag, tagVariants } from "@/components/ui/tag";
import { H3, P } from "@/components/ui/text";
import { Link } from "@/i18n/navigation";
import { getDurationInDays } from "@/lib/utils";
import { UserProgramType } from "@/types/api/tracking";
import { VariantProps } from "class-variance-authority";
import { getTranslations } from "next-intl/server";

interface Props {
    userPrograms: UserProgramType[];
}

const tagStatus: Record<
    "active" | "abandoned" | "completed",
    VariantProps<typeof tagVariants>["variant"]
> = {
    active: "default",
    abandoned: "destructive",
    completed: "outline",
}

export async function HistorySection({ userPrograms }: Props) {
    const t = await getTranslations("DashboardPage");

    return (
        <Card className="w-full p-6 space-y-4">
            <H3>{t("historic")}</H3>

            {userPrograms.length === 0 ? (
                <>
                    <P>{t("no_historic_yet")}</P>
                    <Link href="/programs">{t("select_new_program")}</Link>
                </>
            ) : (
                userPrograms.map((up) => {
                    const duration = getDurationInDays(up.start_date, up.end_date);

                    return (
                        <Card
                            key={up.id}
                            className="flex flex-col md:flex-row gap-2 justify-between p-3 rounded-lg border bg-muted/30"
                        >
                            <div className="space-y-2">
                                <div className="font-semibold">{up.program_name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {up.start_date || up.end_date ? (
                                        <>
                                            {up.start_date ? <ClientDate dateString={up.start_date} /> : "—"}
                                            {" — "}
                                            {up.end_date ? <ClientDate dateString={up.end_date} /> : "—"}
                                        </>
                                    ) : "—"}
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                {duration !== null && (
                                    <P className="text-sm font-medium">
                                        {duration} {t("day", { count: duration })}
                                    </P>
                                )}
                                <Tag variant={tagStatus[up.status!]} className="text-xs capitalize">
                                    {up.status_display}
                                </Tag>
                            </div>
                        </Card>
                    );
                })
            )}
        </Card>
    );
}