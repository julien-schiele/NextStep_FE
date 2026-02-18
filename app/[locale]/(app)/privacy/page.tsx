import { fetchFromServer } from "@/lib/api/server";
import { PrivacyPolicyType } from "@/types/api/utils";
import parse, { domToReact, Element } from "html-react-parser";
import { P, H1, H2, H3, UL, LI, OL } from "@/components/ui/text"


export default async function PrivacyPage() {
    const policy: PrivacyPolicyType = await fetchFromServer(`/privacy/`, "GET");

    if (!policy) {
        return (
            <div>
                <small>Loading...</small>
            </div>
        );
    }

    // Map HTML tags to custom components
    const options = {
        replace: (node: any) => {
            if (!(node instanceof Element)) return;

            switch (node.tagName) {
                case "p":
                    return <P>{domToReact(node.children, options)}</P>;
                case "h1":
                    return <H1>{domToReact(node.children, options)}</H1>;
                case "h2":
                    return <H2>{domToReact(node.children, options)}</H2>;
                case "h3":
                    return <H3>{domToReact(node.children, options)}</H3>;
                case "ul":
                    return <UL>{domToReact(node.children, options)}</UL>;
                case "ol":
                    return <OL>{domToReact(node.children, options)}</OL>;
                case "li":
                    return <LI>{domToReact(node.children, options)}</LI>;
                default:
                    return undefined;
            }
        },
    };

    return (
        <div className="flex flex-col gap-4">
            {policy.long_text ? parse(policy.long_text, options) : "No long here"}
        </div>
    );
}
