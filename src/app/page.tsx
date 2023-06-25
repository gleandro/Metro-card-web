"use client"
import * as React from 'react';
import {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import {existSession} from "@/services/session";
import {redirect} from "next/navigation";
import {addAccount, getAccounts} from "@/services/account.services";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SimpleDialog from "@/components/Dialog";
import {ACEPTAR, formatCardNumber} from "@/util/constants";
import {getRechargeAmount} from "@/services/rechargeAccount.services";
import {RechargeAccountEntity} from "@/interfaces/RechargeAccountEntity";
import moment from "moment/moment";


export default function Home() {
    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [rechargeAccounts, setRechargeAccounts] = useState<RechargeAccountEntity[]>([]);
    if (!existSession('userSession')) {
        redirect("/login")
    }

    useEffect(() => {
        getAccounts().then((data) => {
            setAccounts(data);
            console.log(data);
        });
    }, []);

    const handleClickOpen = () => {
        setShowDialog(true);
    }
    const handleClose = (event: any) => {
        setShowDialog(false);
        if (event.target.innerText.trim() === ACEPTAR) {
            addAccount().then((resp) => {
                setAccounts(oldState => [...oldState, resp.data]);
            });
        }
    }

    const handleAccountClick = (account: AccountEntity) => {
        getRechargeAmount(account.accountCode).then((resp) => {
            setRechargeAccounts(resp);
        });
    }

    return (
        <>
            <div className="container">
                <h2> Mis Cuentas </h2>
                {accounts.length === 0 ?
                    <div className="alert alert-warning mb-0" role="alert"> No hay cuentas disponibles.</div>
                    :
                    <div className="d-inline-flex" style={{width: "inherit", overflowX: "scroll"}}>
                        {accounts.map((account) => (
                            <div className="card me-3" style={{minWidth: "250px", cursor: "pointer"}} key={account.id}
                                 onClick={() => handleAccountClick(account)}>
                                <div className="card-body">
                                    <p className="card-text">{account.accountDefault ? "Tarjeta por Defecto" : "Tarjeta Secundaria"}
                                        <b className="text-success"> {account.accountCode}</b></p>
                                    <h5 className="card-title">{formatCardNumber(account.accountNumber)}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Saldo {account.balance}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="col-2 align-items-center d-flex text-warning mt-3">
                    <AddCircleIcon style={{cursor: "pointer"}} sx={{fontSize: 50}} onClick={handleClickOpen}/> Agregar
                    Nueva Cuenta
                </div>
            </div>
            {
                rechargeAccounts.length === 0 ?
                    <div className="mt-3">Selecciona una cuenta para ver el historial de recargas</div>
                    :
                    <div className="container">
                        <table className="table caption-top">
                            <caption>Lista de Recargas</caption>
                            <thead>
                            <tr>
                                <th className="text-center" scope="col">#</th>
                                <th className="text-center" scope="col">Código</th>
                                <th className="text-center" scope="col">Número de Cuenta</th>
                                <th className="text-center" scope="col">Fecha</th>
                                <th className="text-center" scope="col">Hora</th>
                                <th className="text-center" scope="col">Monto S/</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rechargeAccounts.map((rechargeAccount, index) => (
                                <tr key={index}>
                                    <th className="text-center" scope="row">{index + 1}</th>
                                    <td className="text-center">{rechargeAccount.accountEntity?.accountCode}</td>
                                    <td className="text-center">{rechargeAccount.accountEntity?.accountNumber}</td>
                                    <td className="text-center">{moment(rechargeAccount.createdDate).format('YYYY-MM-DD')}</td>
                                    <td className="text-center">{moment(rechargeAccount.createdDate).format('h:mm:ss A')}</td>
                                    <td className="text-center text-success">S/ {rechargeAccount.amount?.toFixed(2)}</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
            }

            <SimpleDialog showDialog={showDialog} title={"Agregar Cuenta"}
                          content={"Si desea agregar una cuenta, por favor haga click en el botón aceptar."}
                          handleClose={handleClose}/>
        </>

    )
}
