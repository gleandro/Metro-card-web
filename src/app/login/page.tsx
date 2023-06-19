"use client";
import "bootstrap/dist/css/bootstrap.css"
import {useState} from "react";
import PageLogin from "@/app/login/page.login";
import PageRegister from "@/app/login/page.register";
import {existSession} from "@/services/session";
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const router = useRouter();
    existSession('userSession') ? router.push("/") : console.log("No existe sesión");

    const [viewLogin, setViewLogin] = useState(true);

    return (
        <div className="col-md-6">
            {
                viewLogin ? <PageLogin setViewLogin={setViewLogin}/> :
                    <PageRegister setViewLogin={setViewLogin}/>
            }
        </div>
    )
}