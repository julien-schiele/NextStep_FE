import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';


type Props = {
    children: React.ReactNode;
};


export default async function CompleteLayout({ children }: Props) {
    return (
        <>
            <Header />
            <main className="max-w-6xl mx-auto px-6 pb-32 pt-28 space-y-20">
                {children}
            </main>
            <Footer />
        </>
    );
}
