"use client"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import {existSession} from "@/services/session";
import {redirect} from "next/navigation";

export default function Home() {

    if (!existSession('userSession')) {
        redirect("/login")
    }

    return (
        <div className="container">
            Page Home
        </div>
    )
}
