"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { fetchFromClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/authProvider";


export function DeleteAccountButton() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Profile.DeleteAccountDialog");
    const { clearUser } = useAuth();


    const handleDelete = async () => {
        try {
            await fetchFromClient("/users/me/", locale, "DELETE");
            clearUser()
            router.push("/");
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    {t("delete_account")}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("delete_account_title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("delete_account_description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        {t("delete_account_confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}