import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {useForm} from "@/util/useForm";
import {loginUser} from "@/services/user.services";
import {useRouter} from "next/navigation";
import {addSession} from "@/services/session";

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


    const [formValidated, setFormValidated] = useState(false);
    const [formValues, handleInputChange, reset] = useForm(userInstance)

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
        <form onSubmit={sendForm} className={formValidated ? 'was-validated' : ''} noValidate>
            <h2 className="text-center mb-3">Iniciar sesión</h2>
            <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input name="dni" type="text" className="form-control" value={formValues.dni}
                       onChange={handleChange} placeholder="Ingrese su documento de identidad" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input name="password" type="password" className="form-control" value={formValues.password}
                       onChange={handleChange} placeholder="Ingrese su contraseña" required/>
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary col-8">Iniciar sesión</button>
            </div>
            <div className="text-center">
                <p>Si no tienes cuenta <a role="button" onClick={() => setViewLogin(oldState => !oldState)}
                                          className="blue">click aquí</a>
                </p>
            </div>
        </form>
    )
}