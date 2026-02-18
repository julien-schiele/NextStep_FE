"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1, H3, P } from "@/components/ui/text";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
    const t = useTranslations("HomePage");

    return (
        <section className="flex flex-col gap-8">
            <div className="grid md:grid-cols-2 gap-12 items-start space-y-16">
                <div className="space-y-6">
                    <H1>
                        {t("progress")} <span className="text-primary">{t("one_day")}</span>
                        <br />
                        {t("at_a_time")}
                    </H1>
                    <P className="text-lg">{t("hp_text")}</P>

                    <Button asChild variant="default" size="lg">
                        <Link href="/dashboard">{t('hp_cta')}</Link>
                    </Button>

                </div>

                <Card className="aspect-video relative overflow-hidden rounded-2xl">
                    <Image
                        src="/undraw_workout_wqgp.svg"
                        alt={t("illustration_alt")}
                        fill
                        style={{ objectFit: "contain" }}
                        className="object-contain"
                    />
                </Card>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <Card className="space-y-1">
                    <H3>🎯  {t("cards.clarity_title")}</H3>
                    <P>{t("cards.clarity_text")}</P>
                </Card>

                <Card className="space-y-1">
                    <H3>🔥 {t("cards.consistency_title")}</H3>
                    <P>{t("cards.consistency_text")}</P>
                </Card>

                <Card className="space-y-1">
                    <H3>📈 {t("cards.progression_title")}</H3>
                    <P>{t("cards.progression_text")}</P>
                </Card>
            </div>
        </section>
    );
}
