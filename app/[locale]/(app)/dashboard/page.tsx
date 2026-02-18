import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { ProgramProgressCard } from "@/features/dashboard/components/ProgramProgressCard";
import { TodaySessionCard } from "@/features/dashboard/components/TodaySessionCard";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { HistorySection } from "@/features/dashboard/components/HistorySection";
import { getCompletedSessions, getTodaySequences } from "@/features/training/services";
import { capitalize } from "@/lib/utils";
import { getCurrentUser, protectedPage } from "@/lib/auth/server";
import { fetchFromServer } from "@/lib/api/server";
import { UserProgramType, UserStatsType } from "@/types/api/tracking";
import { ProgramDetailType } from "@/types/api/programs";
import { Button } from "@/components/ui/button";


async function DashboardPage() {
    const user = await getCurrentUser();
    const t = await getTranslations("DashboardPage")

    const currentUserProgram: UserProgramType | null = await fetchFromServer("/user-programs/active/", "GET")
    const currentProgram: ProgramDetailType | null = currentUserProgram?.program ? await fetchFromServer(`/programs/${currentUserProgram?.program}`, "GET") : null;
    const userPrograms: UserProgramType[] = await fetchFromServer("/user-programs/", "GET")
    const userStats:UserStatsType = await fetchFromServer("/user-stats/", "GET")

    let completedSessions = null
    let todaySequences = null
    if (currentUserProgram) {
        completedSessions = getCompletedSessions({ currentProgram, currentUserProgram })
        todaySequences = getTodaySequences({ currentProgram, currentUserProgram })
    }

    return (
        <section className="space-y-16">
            <DashboardHeader firstName={capitalize(user?.first_name)} />
            
            {currentUserProgram?.program ? <>
                <ProgramProgressCard
                    programName={currentProgram?.name!}
                    completedSessions={completedSessions!}
                    totalSessions={currentProgram?.content.total_sessions!}
                />

                <TodaySessionCard sequences={todaySequences!} />
            </>
                :
                <Button asChild>
                    <Link href="/programs">{t("select_new_program")}</Link>
                </Button>
            }

            <StatsGrid userStats={userStats} />

            <HistorySection userPrograms={userPrograms} />
        </section>
    );
}

export default protectedPage(DashboardPage)
