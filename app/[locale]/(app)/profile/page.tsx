"use client";

import { Card } from "@/components/ui/card";
import { ChangePasswordCard } from "@/features/profile/components/ChangePasswordCard";
import { useAuth } from "@/lib/auth/authProvider";
import { protectedPage } from "@/lib/auth/server";
import { capitalize, formatDateToLocale } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LuScanFace } from "react-icons/lu";


function ProfilePage() {
    const { user } = useAuth()
    const t = useTranslations()

    return (
        <section className="pt-16 pb-24 space-y-8">
            <h2 className="text-3xl font-bold">Profil</h2>


            <div className="grid md:grid-cols-2 gap-6">
                <Card className="flex flex-col items-center justify-center gap-2">
                    <div className="w-20 h-20 rounded-full bg-secondary flex justify-center items-center">
                        <LuScanFace size={50}/>
                    </div>
                    <div className="font-semibold">{capitalize(user?.first_name)}</div>
                    <div className="font-semibold">{t("member_since") + " " + formatDateToLocale(user?.date_joined)}</div>
                    <div className="text-sm text-gray-500">Niveau : Avancé</div>
                </Card>

                <ChangePasswordCard />
            </div>
        </section>
    );
}

export default protectedPage(ProfilePage)