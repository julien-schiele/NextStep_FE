import { redirect } from "@/i18n/navigation";
import { fetchFromServer } from "@/lib/api/server";
import { UserType } from "@/types/api/users";
import { getLocale } from "next-intl/server";
import { ComponentType } from "react"


export async function getCurrentUser() {
    let res: UserType | null = null
    try {
        res = await fetchFromServer("/users/me/");
        return res
    } catch {
        return null;
    }
}


type WithAuthProps = {}


export function protectedPage<P extends WithAuthProps>(
    WrappedComponent: ComponentType<P>
) {
    return async function AuthenticatedComponent(props: P) {
        const locale = await getLocale()
        const user = await getCurrentUser()

        console.log("user = ",user)

        if (!user) {
            redirect({
                locale,
                href: {
                    pathname: "/",
                    query: { showAuthDialog: "true" }
                }
            });
        }

        return <WrappedComponent {...props} />
    }
}
