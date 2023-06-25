"use client"
import "bootstrap/dist/css/bootstrap.css"
import {useEffect, useState} from "react";
import {getAccounts} from "@/services/account.services";
import {useForm} from "@/util/useForm";
import {addRechargeAmount, getRechargeAmounts} from "@/services/rechargeAccount.services";
import {SUCCESS} from "@/util/constants";
import {RechargeAccountEntity} from "@/interfaces/RechargeAccountEntity";
import moment from "moment";

const rechargeAccountInterface: RechargeAccountEntity = {
    id: 0,
    amount: 0,
    createdDate: "",
    accountCode: "",
    userCode: "",
    userEntity: null,
    accountEntity: null
}

export default function RecargaPage() {
    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [rechargeAmounts, setRechargeAmounts] = useState<RechargeAccountEntity[]>([]);
    const [formValues, handleInputChange, reset] = useForm(rechargeAccountInterface)

    const sendForm = (event: any) => {
        event.preventDefault();
        addRechargeAmount(formValues).then((resp) => {
            if (resp.code === SUCCESS) {
                reset()
                setRechargeAmounts(oldState => [...oldState, resp.data]);
                alert("Recarga realizada con éxito")
            } else {
                alert("Error al realizar la recarga")
            }
        });
    }

    useEffect(() => {
        getRechargeAmounts().then((data) => {
            setRechargeAmounts(data)
            console.log(data)
        });
        getAccounts().then((data) => {
            setAccounts(data);
        });
    }, []);

    return (
        <div className="container">
            <form onSubmit={sendForm}>
                <h2 className="text-center mb-3">Recarga de Saldo</h2>
                <div className="row">
                    <div className="col-md">
                        <div className="form-floating">
                            <input name="amount" type="text" className="form-control" value={formValues.amount}
                                   onChange={handleInputChange} required
                                   pattern={"^(\\d{1,3}(,\\d{3})*|(\\d+))(\\.\\d{2})?$"}/>
                            <label htmlFor="amount" className="form-label">Monto</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">

                            <select name="accountCode" className="form-select"
                                    aria-label="Floating label select example" value={formValues.accountCode}
                                    onChange={handleInputChange} required>
                                <option value="">-</option>
                                {
                                    accounts.map((account) => (
                                        <option key={account.id}
                                                value={account.accountCode}>{account.accountCode} - {account.accountNumber} - {account.accountDefault ? "P" : "S"}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="accountCode" className="form-label">Cuenta</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary col-2">Recargar Saldo</button>
                </div>
            </form>

            <table className="table caption-top mt-3">
                <caption>Lista de Recargas</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th className="text-center" scope="col">Código</th>
                    <th className="text-center" scope="col">Numero de Cuenta</th>
                    <th className="text-center" scope="col">Fecha</th>
                    <th className="text-center" scope="col">Hora</th>
                    <th className="text-center" scope="col">Monto S/</th>

                </tr>
                </thead>
                <tbody>
                {rechargeAmounts.map((row, index) => (
                    <tr key={row.id}>
                        <td>{index}</td>
                        <td className="text-center">{row.accountCode}</td>
                        <td className="text-center">{row.accountEntity?.accountNumber}</td>
                        <td className="text-center">{moment(row.createdDate).format('YYYY-MM-DD')}</td>
                        <td className="text-center">{moment(row.createdDate).format('h:mm:ss A')}</td>
                        <td className="text-center text-success">S/{row.amount?.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}