import {Dispatch, SetStateAction, useState} from "react";

export default function PageLogin({setViewLogin}: { setViewLogin: Dispatch<SetStateAction<boolean>> }) {
    const [formValidated, setFormValidated] = useState(false);

    // valores de registro
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dniNew, setDniNew] = useState("");
    const [email, setEmail] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const sendForm = (event: any) => {
        event.preventDefault()
        //
        setFormValidated(true)
    }

    return (
        <form onSubmit={sendForm} className={formValidated ? 'was-validated' : ''} noValidate>
            <h2 className="text-center mb-3">Crear Cuenta</h2>
            <div className="row">
                <div className="mb-3 col-6">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" value={name}
                           onChange={(event) => {
                               setName(event.target.value)
                           }} placeholder="Ingrese su nombre" required/>
                    <div className="invalid-feedback">
                        Por favor, ingrese su nombre.
                    </div>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastName" value={lastName}
                           onChange={(event) => {
                               setLastName(event.target.value)
                           }}
                           placeholder="Ingrese su apellido" required/>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="dniNew" className="form-label">DNI</label>
                    <input type="text" className="form-control" id="dniNew" value={dniNew}
                           onChange={(event) => {
                               setDniNew(event.target.value)
                           }} placeholder="Ingrese su documento de identidad" required/>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" value={email}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }}
                           placeholder="Ingrese su correo electrónico" required/>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="passwordNew" className="form-label">Contraseña</label>
                    <input name="passwordNew" type="password" className="form-control" id="passwordNew"
                           value={passwordNew}
                           onChange={(event) => {
                               setPasswordNew(event.target.value)
                           }}
                           placeholder="Ingrese su contraseña" required/>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="passwordConfirm" className="form-label">Confirme Contraseña</label>
                    <input type="password" className="form-control" id="passwordConfirm" value={passwordConfirm}
                           onChange={(event) => {
                               setPasswordConfirm(event.target.value)
                           }}
                           placeholder="Repita su contraseña" required/>
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