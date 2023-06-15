"use client";
import "bootstrap/dist/css/bootstrap.css"
import {useState} from "react";

export default function Login() {
    const [viewLogin, setViewLogin] = useState(true);


    return (
        <div className="col-md-6">
            <form>
                <div id="loginForm" hidden={!viewLogin}>
                    <h2 className="text-center mb-3">Iniciar sesión</h2>
                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label">DNI</label>
                        <input type="text" className="form-control" id="dni"
                               placeholder="Ingrese su documento de identidad"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Ingrese su contraseña"/>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary col-8">Iniciar sesión</button>
                    </div>
                    <div className="text-center">
                        <p>Si no tienes cuenta <a role="button" onClick={() => setViewLogin(!viewLogin)}
                                                  className="blue">click aquí</a>
                        </p>
                    </div>
                </div>
                <div id="registerForm" hidden={viewLogin}>
                    <h2 className="text-center mb-3">Crear Cuenta</h2>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Ingrese su nombre"/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="name" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Ingrese su apellido"/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="dniNew" className="form-label">DNI</label>
                            <input type="text" className="form-control" id="dniNew"
                                   placeholder="Ingrese su documento de identidad"/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="emailNew" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="emailNew"
                                   placeholder="Ingrese su correo electrónico"/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="passwordNew" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="passwordNew"
                                   placeholder="Ingrese su contraseña"/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="passwordConfirmNew" className="form-label">Confirme Contraseña</label>
                            <input type="password" className="form-control" id="passwordConfirmNew"
                                   placeholder="Repita su contraseña"/>
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary col-8">Crear cuenta</button>
                    </div>
                    <div className="text-center">
                        <p>Si ya tienes cuenta <a role="button" onClick={() => setViewLogin(!viewLogin)}
                                                  className="blue">click aquí</a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}