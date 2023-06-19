export function addSession(name: string, user: UserEntity) {
    localStorage.setItem(name, JSON.stringify(user));
}

export function getSession(name: string): UserEntity {
    return JSON.parse(localStorage.getItem(name) || '{}');
}

export function removeSession(name: string) {
    localStorage.removeItem(name);
}

export function clearSession() {
    localStorage.clear();
}

export function existSession(name: string): boolean {
    return localStorage.getItem(name) !== null;
}

export function updateSession(name: string, user: UserEntity) {
    removeSession(name);
    addSession(name, user);
}