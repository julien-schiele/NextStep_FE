import { Card } from "@/components/ui/card";
import { H3, P } from "@/components/ui/text";
import { UserStatsType } from "@/types/api/tracking";
import { getTranslations } from "next-intl/server";

type Props = {
    userStats: UserStatsType
}

export async function StatsGrid({ userStats }: Props) {
    const t = await getTranslations("DashboardPage")
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            <Card className="flex flex-col items-center justify-center space-y-2">
                <P>{t("completed_session_count")}</P>
                <H3 className="text-primary">{userStats.total_sessions_completed}</H3>
            </Card>

            <Card className="flex flex-col items-center justify-center space-y-2">
                <P>{t("completed_program_count")}</P>
                <H3>{userStats.total_programs_completed}</H3>
            </Card>

            <Card className="flex flex-col items-center justify-center space-y-2">
                <P>{t("highest_level_completed")}</P>
                <H3>{userStats.highest_level_completed}</H3>
            </Card>

            <Card className="flex flex-col items-center justify-center space-y-2">
                <P>{t("current_level")}</P>
                <H3>{userStats.current_level}</H3>
            </Card>
        </div>
    );
}
