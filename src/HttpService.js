import {ENVS} from "./utils/enum";
import {extractGetParams} from "./utils/aux";

export class HttpService {

    static env = ENVS.PRODUCTION;

    static defaultApiKey = '';

    static apis = {};

    static defaultHeaders = {};

    static setApi(key, url, env = ENVS.PRODUCTION) {
        let urlEnv = {
            env,
            url
        };
        let apiKey = false;
        for (let api in HttpService.apis) {
            if (api === key) {
                apiKey = true;
            }
        }
        if (apiKey) {
            let envAux = HttpService.apis[key].find((item)=>{
                return item.env === env;
            });
            if(envAux) {
                envAux = {
                    ...urlEnv
                };
            }else {
                HttpService.apis[key].push(
                    {
                        ...urlEnv
                    });
            }
        } else {
            HttpService.apis[key] = [
                {
                    ...urlEnv
                }
            ];
        }
    }

    static getApi(key){
        let api = HttpService.apis[key];
        let env = api.find((item)=>{
            return item.env === HttpService.env;
        });
        if(env){
            return env.url;
        }else{
            throw 'URL não encontrada para a API e Env determinados';
        }
    }

    static createParam(key, value){
        return {key, value};
    }

    static get(endpoint, params = [], apiKey = HttpService.apis[0][0], token = null){
        return new Promise((resolve, reject)=> {
            try {
                let url = HttpService.getApi(apiKey) + endpoint + extractGetParams(params, token);
                let headers = {
                    ...HttpService.defaultHeaders,
                };
                if (token !== null) {
                    headers.Authorization = token;
                }
                fetch(url, {headers: headers}).then((response) => {
                    if(response.status !==200){
                        throw response.status + ': ' + response;
                    }
                    console.log(response)
                    return response.json();
                }).then(responseJson => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers);
                    throw error;
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    static post(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = toAPI?(this.apiURL + endpoint):endpoint;
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...HttpService.defaultHeaders,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body
                }).then((response) => {
                    if(response.status !==200){
                        throw response.status + ': ' + response;
                    }
                    return response.json();
                }).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers, body);
                    throw error;
                });
            }catch(e){
                reject(e);
            }
        });
    }

    static patch(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = toAPI?(this.apiURL + endpoint):endpoint;
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...HttpService.defaultHeaders,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'PATCH',
                    headers: headers,
                    body: body
                }).then((response) => response.json()).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers, body);
                    throw error;
                });
            }catch(e){
                reject(e);
            }
        });
    }

    static put(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = toAPI?(this.apiURL + endpoint):endpoint;
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...HttpService.defaultHeaders,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'PUT',
                    headers: headers,
                    body: body
                }).then((response) => response.json()).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers, body);
                    throw error;
                });
            }catch(e){
                reject(e);
            }
        });
    }

    static delete(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = toAPI?(this.apiURL + endpoint):endpoint;
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...HttpService.defaultHeaders,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'DELETE',
                    headers: headers,
                    body: body
                }).then((response) => response.json()).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers, body);
                    throw error;
                });
            }catch(e){
                reject(e);
            }
        });
    }
}
