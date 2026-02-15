import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/authProvider';


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
                <Header />
                <main className="max-w-6xl mx-auto px-6 pb-32 pt-28 space-y-20">

                    {children}
                </main>
            </AuthProvider>
            <Footer/>
        </NextIntlClientProvider>
    );
}
