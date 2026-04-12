import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";


type Props = {
    children: React.ReactNode;
};


export default async function CompleteLayout({ children }: Props) {
    return (
        <>
            <Header />
            <main className="flex-1 pt-24 pb-20 md:pb-28">
                <Container>
                    <Stack size="xl">
                        {children}
                    </Stack>
                </Container>
            </main>
            <Footer />
        </>
    );
}
