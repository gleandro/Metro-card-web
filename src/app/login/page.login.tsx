import {Dispatch, SetStateAction, useState} from "react";

export default function PageLogin({setViewLogin}: { setViewLogin: Dispatch<SetStateAction<boolean>> }) {
    const [formValidated, setFormValidated] = useState(false);

    // valores de login
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");

    const sendForm = (event: any) => {
        event.preventDefault()
        //
        setFormValidated(true)
    }

    return (
        <form onSubmit={sendForm} className={formValidated ? 'was-validated' : ''} noValidate>
            <h2 className="text-center mb-3">Iniciar sesión</h2>
            <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input type="text" className="form-control" id="dni" value={dni}
                       onChange={(event) => setDni(event.target.value)}
                       placeholder="Ingrese su documento de identidad" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}
                       placeholder="Ingrese su contraseña" required/>
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