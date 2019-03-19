import {URL_API} from "../url";

export function post(type, userData) {

    return new Promise((resolve, reject) => {
        fetch(`${URL_API}` + type, {
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("access_token"),
            },
            method: 'POST',
            body: userData,
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