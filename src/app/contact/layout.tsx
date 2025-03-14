import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контакти – Зв'яжіться з нами",
    description: "Маєте питання чи пропозиції? Зв'яжіться з нами через форму зворотного зв’язку або за вказаними контактами.",
    keywords: "Контакти, Зворотний зв'язок, Допомога, Підтримка, Запитання, Пропозиції, Адміністрація"
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}