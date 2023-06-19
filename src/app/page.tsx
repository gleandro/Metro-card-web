import "bootstrap/dist/css/bootstrap.css"
import {existSession} from "@/services/session";

export default function Home() {

    existSession('userSession') ? console.log("Existe sesión") : console.log("No existe sesión");

    return "Hello World!"
}
