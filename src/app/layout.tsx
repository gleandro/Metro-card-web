import Head from "next/head";
import Style from "@/app/page.module.css";

export const metadata = {
    title: 'MetroCard',
    description: 'MetroCard aplicación para el control de saldos de tarjetas de transporte público',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <Head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <body className={Style.body}>{children}</body>
        </html>
    )
}
