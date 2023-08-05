import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Brilliar Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
