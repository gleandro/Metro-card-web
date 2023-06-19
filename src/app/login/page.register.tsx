import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
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

export default function PageLogin({setViewLogin}: { setViewLogin: Dispatch<SetStateAction<boolean>> }) {
    const [formValidated, setFormValidated] = useState(false);
    const [formValues, handleInputChange, reset] = useForm(userInstance)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)

    const sendForm = async (event: any) => {
        event.preventDefault()
        try {
            addUser(formValues).then((data) => {
                console.log(data);
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <form onSubmit={sendForm} className={formValidated ? 'was-validated' : ''} noValidate>
            <h2 className="text-center mb-3">Crear Cuenta</h2>
            <div className="row">
                <div className="mb-3 col-6">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input name="name" type="text" className="form-control" value={formValues.name}
                           onChange={handleChange} placeholder="Ingrese su nombre" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su nombre.
                    </div>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input name="lastName" type="text" className="form-control" value={formValues.lastName}
                           onChange={handleChange} placeholder="Ingrese su apellido" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su apellido.
                    </div>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="dniNew" className="form-label">DNI</label>
                    <input name="dni" type="text" className="form-control" value={formValues.dni}
                           onChange={handleChange} placeholder="Ingrese su documento de identidad" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su dni.
                    </div>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input name="email" type="email" className="form-control" value={formValues.email}
                           onChange={handleChange} placeholder="Ingrese su correo electrónico" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su email correctamente.
                    </div>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input name="password" type="password" className="form-control" id="password"
                           value={formValues.password} onChange={handleChange}
                           placeholder="Ingrese su contraseña" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su contraseña.
                    </div>
                </div>
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