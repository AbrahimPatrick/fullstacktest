import {postdata} from "../../postdata";

export function refresh() {
    let redirect = false;
    if (sessionStorage.getItem("refresh_token")) {
        let refreshToken = {
                                grant_type: "refresh_token",
                                client_id: "1",
                                client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
                                refresh_token: sessionStorage.getItem("refresh_token")
                            };
        /*postdata('oauth/token', refreshToken).then((result) => {
            let responseJSON = result;
            if(responseJSON.access_token) {
                sessionStorage.setItem('refresh_token', responseJSON.refresh_token);
                sessionStorage.setItem('access_token', responseJSON.access_token);
                redirect = false;
            } else {
                console.log("Login error");
                redirect = true;
            }
        })*/
    } else {
        console.log("Não autenticado");
        redirect = true;
    }
    return (
        redirect
    )
}