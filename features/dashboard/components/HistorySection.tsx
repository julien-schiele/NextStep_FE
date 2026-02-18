import { Card } from "@/components/ui/card";
import { Tag, tagVariants } from "@/components/ui/tag";
import { H3, P } from "@/components/ui/text";
import { Link } from "@/i18n/navigation";
import { formatDateToLocale, getDurationInDays } from "@/lib/utils";
import { UserProgramType } from "@/types/api/tracking";
import { VariantProps } from "class-variance-authority";
import { getTranslations } from "next-intl/server";


interface Props {
    userPrograms: UserProgramType[];
}


export async function HistorySection({ userPrograms }: Props) {
    const t = await getTranslations("DashboardPage")
    const tagStatus: Record<
        "active" | "abandoned" | "completed",
        VariantProps<typeof tagVariants>["variant"]
    > = {
        active: "default",
        abandoned: "destructive",
        completed: "outline",
    }

    return (
        <Card className="p-6 space-y-4">
            <H3>{t("historic")}</H3>

            {userPrograms ?
                userPrograms.map((up, i) => {
                    const duration = getDurationInDays(up.start_date, up.end_date)

                    return (<Card
                        key={i}
                        className="flex justify-between p-3 rounded-lg border bg-muted/30"
                    >
                        <div className="space-y-2">
                            <div className="font-semibold">{up.program_name}</div>
                            <div className="text-xs text-muted-foreground">
                                {up.start_date || up.end_date ? (
                                    <>
                                        {up.start_date ? formatDateToLocale(up.start_date) : "—"} -{" "}
                                        {up.end_date ? formatDateToLocale(up.end_date) : "—"}
                                    </>
                                ) : (
                                    "—"
                                )}
                            </div>

                        </div>
                        <div className="flex items-center space-x-6 justify-between">
                            <div className="text-sm font-medium">
                                {duration !== null &&
                                    <P>{duration} {t("day", { count: duration })}</P>
                                }
                            </div>
                            <Tag variant={tagStatus[up.status!]} className="text-xs capitalize">{up.status_display}</Tag>
                        </div>
                    </Card>)
                })
                :
                <>
                    <P>{t("no_historic_yet")}</P>
                    <Link href="/programs">{t("select_new_program")}</Link>
                </>
            }
        </Card>
    );
}
