import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChangePasswordCard() {
    // TODO
    return (
        <Card className="p-6 space-y-4">
            <H3>Changer votre mot de passe</H3>

            <Input type="password" placeholder="Nouveau mot de passe" />
            <Input type="password" placeholder="Confirmer mot de passe" />

            <Button>Valider</Button>
        </Card>
    );
}
