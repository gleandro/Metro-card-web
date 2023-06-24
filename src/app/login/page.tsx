"use client";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import {useState} from "react";
import {existSession} from "@/services/session";
import {redirect} from "next/navigation";
import "./page.css"
import PageLogin from "@/app/login/page.login";
import PageRegister from "@/app/login/page.register";

export default function LoginPage() {

    if (existSession('userSession')) {
        redirect("/")
    }

    const [viewLogin, setViewLogin] = useState(true);

    return (
        <>
            <main className="form-signin w-100 m-auto">
                {
                    viewLogin ? <PageLogin setViewLogin={setViewLogin}/> :
                        <PageRegister setViewLogin={setViewLogin}/>
                }
            </main>
        </>
    )
}
