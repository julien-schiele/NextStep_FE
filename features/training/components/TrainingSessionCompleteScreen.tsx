"use client";

import { useState } from "react";
import { RatingValue, SessionRatingSelector } from "./TrainingSessionRatingSelector";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { H1, H3, P } from "@/components/ui/text";
import { Card } from "@/components/ui/card";


type Props = {
    onFinish: (rating: string) => void;
}

export function TrainingSessionCompleteScreen({ onFinish }: Props) {
    const [rating, setRating] = useState<RatingValue>("ok");
    const t = useTranslations("TrainingPage")

    return (
        <div className="min-h-[100dvh] flex items-center justify-center">
            <Card className="w-full max-w-xl p-10 text-center space-y-12">

                <div className="space-y-3">
                    <div className="text-5xl">🎉</div>
                    <H1>{t("session_completed")}</H1>
                    <H3>{t("congrat_for_progress")}</H3>
                    <P>{t("how_did_you_feel")}</P>
                </div>

                <SessionRatingSelector value={rating} onChange={setRating} />

                <Button onClick={() => onFinish(rating)} size={"lg"} className="w-full">
                    {t("save_session")}
                </Button>
            </Card>
        </div>
    );
}
