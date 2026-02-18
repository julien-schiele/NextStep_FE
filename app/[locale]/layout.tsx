import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AuthProvider } from '@/lib/auth/authProvider';
import OpenAuthDialogFromQuery from '@/components/layout/OpenAuthDialogFromQuery';


type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    // check locale
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // load messages for locale
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        messages = {}; // fallback if file is missing
    }

    return (
        <NextIntlClientProvider>
            <AuthProvider>
                <OpenAuthDialogFromQuery/>
                {children}
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
