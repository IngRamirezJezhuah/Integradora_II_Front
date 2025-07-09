export function getToken() {
    return localStorage.getItem('token');
}
export function requireTokenOrRedirect() {
    const token = getToken();
    if (!token) {
        window.location.href = '/login'; // o usa navigate si usas react-router
        return null;
    }
    return token;
}