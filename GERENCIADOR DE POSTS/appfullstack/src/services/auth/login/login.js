import {URL_API} from "../../url";

export function login(type, userData) {

    return new Promise((resolve, reject) => {
        fetch(`${URL_API}` + type, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
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