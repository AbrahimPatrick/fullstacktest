export function logout() {
    sessionStorage.setItem("refresh_token", '');
    sessionStorage.clear();
    return (
        true
    )
}