import { fetchFromServer } from "@/lib/fetchForServerComponent";
import { ProgramListItemType } from "@/types/api/programs";
import { H1, P } from "@/components/ui/text";
import { Card } from "@/components/ui/card";


export default async function ProgressPage() {

    const programs = await fetchFromServer<ProgramListItemType[]>("/programs");

    return (
        <section className="pt-16 pb-24 space-y-8">
            <H1>Program List</H1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((p) => {
                    if (p) {
                        return (
                            <Card key={p.id ?? p.slug} className="p-4">
                                {p.slug}
                                <P>{p.level}</P>
                            </Card>
                        )
                    }
                    return null
                })}
            </div>
        </section>
    );
}
