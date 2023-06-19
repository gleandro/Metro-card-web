import {API_BASE_URL} from "@/util/constants";

export async function fetchData() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return await response.json();
}

export async function addUser(user: UserEntity) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}

export async function loginUser(user: UserEntity) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}