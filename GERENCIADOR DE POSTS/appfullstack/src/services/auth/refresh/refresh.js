export function refresh() {
    let redirect = false;
    if (!sessionStorage.getItem("access_token")) {
        console.log("Não autenticado");
        redirect = true;
    }
    return (
        redirect
    )
}