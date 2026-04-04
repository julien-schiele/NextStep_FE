import { H1, P } from "@/components/ui/text";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

type Credit = {
    title: string;
    author?: string;
    source: string;
    url: string;
    license: string;
    licenseUrl?: string;
};

// ── Data ─────────────────────────────────────────────────────────────────────

const images: Credit[] = [
    {
        title: "Workout illustration",
        author: "Katerina Limpitsouni",
        source: "unDraw",
        url: "https://undraw.co/illustration/workout_wqgp",
        license: "unDraw License",
        licenseUrl: "https://undraw.co/license",
    },
    {
        title: "Climbing / fitness photo",
        author: "Nhi Nguyễn Tường (cindynhiart)",
        source: "Pixabay",
        url: "https://pixabay.com/photos/5635784",
        license: "Pixabay Content License",
        licenseUrl: "https://pixabay.com/service/license-summary/",
    },
];

const icons: Credit[] = [
    {
        title: "Icon library",
        source: "React Icons",
        url: "https://react-icons.github.io/react-icons/",
        license: "MIT License",
        licenseUrl: "https://opensource.org/licenses/MIT",
    },
];

const libraries: Credit[] = [
    {
        title: "UI components",
        source: "shadcn/ui",
        url: "https://ui.shadcn.com",
        license: "MIT License",
        licenseUrl: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
    },
    {
        title: "Frontend framework",
        source: "Next.js",
        url: "https://nextjs.org",
        license: "MIT License",
        licenseUrl: "https://github.com/vercel/next.js/blob/canary/license.md",
    },
    {
        title: "Styling",
        source: "Tailwind CSS",
        url: "https://tailwindcss.com",
        license: "MIT License",
        licenseUrl: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
    },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, items }: { title: string; items: Credit[] }) {
    if (items.length === 0) return null;
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                {title}
            </h2>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
                        <div>
                            <span className="font-medium text-foreground">{item.title}</span>
                            {item.author && (
                                <span className="text-muted-foreground"> — by {item.author}</span>
                            )}
                            <span className="text-muted-foreground"> via </span>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                {item.source}
                            </a>
                        </div>
                        <div className="text-muted-foreground text-xs">
                            {item.licenseUrl ? (
                                <a
                                    href={item.licenseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors hover:underline"
                                >
                                    {item.license}
                                </a>
                            ) : (
                                item.license
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CreditsPage() {
    return (
        <div className="flex flex-col gap-4">

            <H1>Credits &amp; Attributions</H1>
            <P className="text-muted-foreground text-sm">
                NextStep is built on great open-source work. Here's a partial list of
                third-party assets and libraries used in this project.
            </P>

            <Section title="Images & Illustrations" items={images} />
            <Section title="Icons" items={icons} />
            <Section title="Open-source Libraries" items={libraries} />

        </div>
    );
}