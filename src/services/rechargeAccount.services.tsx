import {API_BASE_URL_RECHARGE_AMOUNT} from "@/util/constants";
import {getSession} from "@/services/session";
import {RechargeAccountEntity} from "@/interfaces/RechargeAccountEntity";

const user: UserEntity = getSession('userSession')

export async function getRechargeAmounts() {
    const params = new URLSearchParams();
    params.append('accountCode', 'value1');
    const response = await fetch(`${API_BASE_URL_RECHARGE_AMOUNT}/${user.userCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    });
    return await response.json();
}

export async function getRechargeAmount(accountCode: String) {
    const response = await fetch(`${API_BASE_URL_RECHARGE_AMOUNT}/${user.userCode}?accountCode=${accountCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    });
    return await response.json();
}

export async function addRechargeAmount(rechargeAmount: RechargeAccountEntity) {
    rechargeAmount.userCode = user.userCode
    const response = await fetch(`${API_BASE_URL_RECHARGE_AMOUNT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rechargeAmount)
    });
    return await response.json();
}