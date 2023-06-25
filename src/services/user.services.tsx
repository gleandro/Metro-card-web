import {API_BASE_URL_USER} from "@/util/constants";

export async function getUsers() {
    const response = await fetch(`${API_BASE_URL_USER}`);
    return await response.json();
}

export async function addUser(user: UserEntity) {
    const response = await fetch(`${API_BASE_URL_USER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}

export async function loginUser(user: UserEntity) {
    const response = await fetch(`${API_BASE_URL_USER}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}