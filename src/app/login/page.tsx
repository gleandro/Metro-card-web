"use client";
import "bootstrap/dist/css/bootstrap.css"
import {useState} from "react";
import PageLogin from "@/app/login/page.login";
import PageRegister from "@/app/login/page.register";

export default function Login() {
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