import { Card } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

interface Props {
    programName: string;
    completedSessions: number;
    totalSessions: number;
}

export async function ProgramProgressCard({
    programName,
    completedSessions,
    totalSessions,
}: Props) {
    const percent = Math.round((completedSessions / totalSessions) * 100);
    const t = await getTranslations("DashboardPage")
    return (
        <Card className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
                <span>{programName}</span>
                <span>
                    Session {completedSessions} / {totalSessions}
                </span>
            </div>

            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="text-right text-xs text-muted-foreground">
                {percent}%{" "}{t("completed")}
            </div>
        </Card>
    );
}
