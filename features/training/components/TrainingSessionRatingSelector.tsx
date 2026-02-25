"use client";

import { useTranslations } from "next-intl";
import { GiFeather, GiCheckMark, GiWeight } from "react-icons/gi";

export type RatingValue = "too_easy" | "ok" | "too_hard";

type RatingOptionProps = {
    label: string;
    icon: React.ReactNode;
    selected: boolean;
    onClick: () => void;
};

function RatingOption({ label, icon, selected, onClick }: RatingOptionProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg border text-sm
                ${selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                }
            `}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );
}

type Props = {
    value: RatingValue | null;
    onChange: (value: RatingValue) => void;
};

export function SessionRatingSelector({ value, onChange }: Props) {
    const t = useTranslations("TrainingPage")
    return (
        <div className="flex justify-center gap-6">
            <RatingOption
                label={t("too_easy")}
                icon={<GiFeather />}
                selected={value === "too_easy"}
                onClick={() => onChange("too_easy")}
            />

            <RatingOption
                label={t("ok")}
                icon={<GiCheckMark />}
                selected={value === "ok"}
                onClick={() => onChange("ok")}
            />

            <RatingOption
                label={t("too_hard")}
                icon={<GiWeight />}
                selected={value === "too_hard"}
                onClick={() => onChange("too_hard")}
            />
        </div>
    );
}
