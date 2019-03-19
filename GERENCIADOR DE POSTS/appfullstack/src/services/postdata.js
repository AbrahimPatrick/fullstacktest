import {URL_API} from "./url";
import {header} from "./auth/header/header";

export function postdata(type, userData) {

    return new Promise((resolve, reject) => {
        fetch(`${URL_API}` + type, {
            headers: header(),
            method: 'POST',
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}