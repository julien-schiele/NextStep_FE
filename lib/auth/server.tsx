import { fetchFromServer } from "@/lib/api/server";
import { UserType } from "@/types/api/users";
import { ComponentType } from "react"
import { redirect } from "next/navigation"


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
        const user = await getCurrentUser()

        if (!user) {
            redirect("/?showAuthDialog=true")
        }

        return <WrappedComponent {...props} />
    }
}
