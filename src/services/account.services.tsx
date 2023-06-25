import {API_BASE_URL_ACCOUNT} from "@/util/constants";
import {getSession} from "@/services/session";

export async function getAccounts() {
    const response = await fetch(`${API_BASE_URL_ACCOUNT}`);
    return await response.json();
}

export async function addAccount() {
    let user: UserEntity = getSession('userSession')
    const response = await fetch(`${API_BASE_URL_ACCOUNT}/${user.userCode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}