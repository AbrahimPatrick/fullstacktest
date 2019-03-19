import { URL_API } from "./url";
import {header} from "./header/header";

export function getdata(type, callback) {

    return new Promise((resolve, reject) => {
        fetch(`${URL_API}` + type, {
            headers: header(),
            method: 'GET'
        })
            .then((response) => response.json())
            .then(callback)
            .catch((error)=> {
                reject(error);
            })
    });
}