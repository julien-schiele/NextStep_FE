"use client";

import { Button } from "@/components/ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { IoPencilOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { UserType } from "@/types/api/users";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/authProvider";
import { useRouter } from "@/i18n/navigation";


type UserMenuProps = {
    user: UserType;
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const t = useTranslations("Header");
    const { logout } = useAuth()
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    
                    <MdVerifiedUser className="text-primary" />
                    <span className="flex md:hidden">
                        {user.first_name[0]!.toLocaleUpperCase()}
                    </span>
                    <span className="hidden md:flex">
                        {user.first_name!.toLocaleUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => { router.push("/profile") }}>
                        <IoPencilOutline />
                        {t("edit")}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={logout}>
                        <IoLogOutOutline />
                        {t("logout")}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    );
};
