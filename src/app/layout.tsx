"use client";
import Head from "next/head";
import {usePathname} from "next/navigation";
import NavComponent from "@/components/navComponent";
import "./page.css"
import "../../public/color-modes"
import Theme from "@/components/theme";

const metadata = {
    title: 'MetroCard',
    description: 'MetroCard aplicación para el control de saldos de tarjetas de transporte público',
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    const currentPage = usePathname();

    return (
        <html lang="en" data-bs-theme="auto">
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description}/>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <body className="d-flex align-items-center py-4 bg-body-tertiary">
        {
            currentPage !== '/login' && <NavComponent/>
        }
        {children}
        <Theme/>
        </body>
        </html>
    )
}
