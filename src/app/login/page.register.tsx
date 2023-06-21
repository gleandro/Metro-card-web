import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {useForm} from "@/util/useForm";
import {addUser} from "@/services/user.services";

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

export default function PageRegister({setViewLogin}: { setViewLogin: Dispatch<SetStateAction<boolean>> }) {
    const [formValues, handleInputChange] = useForm(userInstance)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)

    const sendForm = async (event: any) => {
        event.preventDefault()
        try {
            addUser(formValues).then((data) => {
                if (data.success) {
                    setViewLogin(oldState => !oldState)
                }
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <form onSubmit={sendForm}>
            <h2 className="text-center mb-3">Crear Cuenta</h2>
            <div className="form-floating">
                <input name="name" type="text" className="form-control" value={formValues.name}
                       onChange={handleChange} placeholder="Ingrese su nombre" required/>
                <label htmlFor="name" className="form-label">Nombre</label>
            </div>
            <div className="form-floating">
                <input name="lastName" type="text" className="form-control" value={formValues.lastName}
                       onChange={handleChange} placeholder="Ingrese su apellido" required/>
                <label htmlFor="lastName" className="form-label">Apellido</label>
            </div>
            <div className="form-floating">
                <input name="dni" type="text" className="form-control" value={formValues.dni}
                       onChange={handleChange} placeholder="Ingrese su documento de identidad" required/>
                <label htmlFor="dniNew" className="form-label">DNI</label>
            </div>
            <div className="form-floating">
                <input name="email" type="email" className="form-control" value={formValues.email}
                       onChange={handleChange} placeholder="Ingrese su correo electrónico" required/>
                <label htmlFor="email" className="form-label">Correo electrónico</label>
            </div>
            <div className="form-floating">
                <input name="password" type="password" className="form-control" id="password"
                       value={formValues.password} onChange={handleChange}
                       placeholder="Ingrese su contraseña" required/>
                <label htmlFor="password" className="form-label">Contraseña</label>
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary col-8">Crear cuenta</button>
            </div>
            <div className="text-center">
                <p>Si ya tienes cuenta <a role="button" onClick={() => setViewLogin(oldState => !oldState)}
                                          className="blue">click aquí</a>
                </p>
            </div>
        </form>
    )
}