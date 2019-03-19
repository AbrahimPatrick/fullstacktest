export function header() {
    let header = {
        'Authorization': 'Bearer '+sessionStorage.getItem("access_token"),
        'Accept': 'application/json'
    };
    return (
        header
    )
}