import { URL_API } from "./url";
import {header} from "./auth/header/header";

export function deletedata(type) {

    return new Promise((resolve, reject) => {
        fetch(`${URL_API}` + type, {
            headers: header(),
            method: 'DELETE'
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