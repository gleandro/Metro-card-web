import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {useForm} from "@/util/useForm";
import {loginUser} from "@/services/user.services";
import {useRouter} from "next/navigation";
import {addSession} from "@/services/session";
import Image from "next/image";

const userInstance: UserEntity = {
    id: 0,
    userCode: "",
    name: "",
    lastName: "",
    address: "",
    dateOfBirth: "",
    dni: "",
    email: "",
    password: ""
}

export default function PageLogin({setViewLogin}: { setViewLogin: Dispatch<SetStateAction<boolean>> }) {
    const [formValues, handleInputChange] = useForm(userInstance)

    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)

    const sendForm = async (event: any) => {
        event.preventDefault()
        try {
            loginUser(formValues).then((data: ApiResponse) => {
                if (data.success) {
                    addSession('userSession', data.data)
                    router.push("/")
                } else {
                    alert(data.message)
                }
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <form onSubmit={sendForm}>
            <Image className="mb-4" src="bootstrap-logo.svg" alt="" width="72"
                   height="57"/>
            <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
            <div className="form-floating">
                <input name="dni" type="text" className="form-control" value={formValues.dni}
                       onChange={handleChange} placeholder="Ingrese su documento de identidad" required/>
                <label htmlFor="dni">DNI</label>
            </div>
            <div className="form-floating">
                <input name="password" type="password" className="form-control" value={formValues.password}
                       onChange={handleChange} placeholder="Ingrese su contraseña" required/>
                <label htmlFor="password">Contraseña</label>
            </div>
            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me"
                       id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recuedame
                </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <div className="text-center mt-3">
                <p>Si no tienes cuenta <a role="button" onClick={() => setViewLogin(oldState => !oldState)}
                                          className="blue">click aquí</a>
                </p>
            </div>
            <p className="mt-5 mb-3 text-body-secondary">&copy; Giancarlo Leandro</p>
        </form>
    )
}