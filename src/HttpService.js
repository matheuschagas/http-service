import {ENVS} from "./utils/enum";
import {extractGetParams} from "./utils/aux";

export class HttpService {

    static env = ENVS.PRODUCTION;

    static debug = false;

    static defaultApiKey = '';

    static apis = {};

    static defaultHeaders = {};

    static headers = {};

    static successCodes = [200, 201, 202, 203, 204, 205, 206, 207];

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

    static async createError(response){
        let error;
        try{
            let resp = await response.json();
            error = {...resp};
            console.log(error);
        }catch(e){
            error = {status: response.status, error: response._bodyText};
            console.log(e, error);
        }
        return error;
    }

    static get(endpoint, params = [], apiKey = HttpService.apis[0][0], token = null){
        return new Promise((resolve, reject)=> {
            try {
                let url = HttpService.getApi(apiKey) + endpoint + extractGetParams(params, token);
                let headers = {
                    ...HttpService.defaultHeaders,
                    ...HttpService.headers,
                };
                if (token !== null) {
                    headers.Authorization = token;
                }
                fetch(url, {headers: headers}).then(async (response) => {
                    HttpService.headers = {};
                    if(!HttpService.successCodes.includes(response.status)){
                        throw await HttpService.createError(response);
                    }
                    if(HttpService.debug){
                        console.log(response)
                    }
                    return response.json();
                }).then(responseJson => {
                    resolve(responseJson);
                }).catch((error) => {
                    HttpService.headers = {};
                    console.log(url, headers);
                    reject(error);
                });
            } catch (e) {
                HttpService.headers = {};
                reject(e);
            }
        });
    }

    static post(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = HttpService.getApi(apiKey) + endpoint;
                let headers = {
                    ...HttpService.defaultHeaders,
                    ...HttpService.headers,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body
                }).then(async (response) => {
                    HttpService.headers = {};
                    if(!HttpService.successCodes.includes(response.status)){
                        throw await HttpService.createError(response);
                    }
                    if(HttpService.debug){
                        console.log(response)
                    }
                    let res = await response.text();
                    return res !== "" ? JSON.parse(res) : true;
                }).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    HttpService.headers = {};
                    console.log(url, headers, body, error);
                    reject(error);
                });
            }catch(e){
                HttpService.headers = {};
                reject(e);
            }
        });
    }

    static patch(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = HttpService.getApi(apiKey) + endpoint;
                let headers = {
                    ...HttpService.defaultHeaders,
                    ...HttpService.headers,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'PATCH',
                    headers: headers,
                    body: body
                }).then(async (response) => {
                    HttpService.headers = {};
                    if(!HttpService.successCodes.includes(response.status)){
                        throw await HttpService.createError(response);
                    }
                    if(HttpService.debug){
                        console.log(response)
                    }
                    return response._bodyText !== ""?response.json(): true;
                }).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    HttpService.headers = {};
                    console.log(url, headers, body, error);
                    reject(error);
                });
            }catch(e){
                HttpService.headers = {};
                reject(e);
            }
        });
    }

    static put(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = HttpService.getApi(apiKey) + endpoint;
                let headers = {
                    ...HttpService.defaultHeaders,
                    ...HttpService.headers,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'PUT',
                    headers: headers,
                    body: body
                }).then(async (response) => {
                    HttpService.headers = {};
                    if(!HttpService.successCodes.includes(response.status)){
                        throw await HttpService.createError(response);
                    }
                    if(HttpService.debug){
                        console.log(response)
                    }
                    return response._bodyText !== ""?response.json(): true;
                }).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    HttpService.headers = {};
                    console.log(url, headers, body, error);
                    reject(error);
                });
            }catch(e){
                HttpService.headers = {};
                reject(e);
            }
        });
    }

    static delete(endpoint, params = {}, apiKey = HttpService.apis[0][0], token = null) {
        return new Promise((resolve, reject)=>{
            try {
                let url = HttpService.getApi(apiKey) + endpoint;
                let headers = {
                    ...HttpService.defaultHeaders,
                    ...HttpService.headers,
                };
                if(token !== null) {
                    headers.Authorization = token;
                }
                let body = JSON.stringify(params);
                fetch(url, {
                    method: 'DELETE',
                    headers: headers,
                    body: body
                }).then(async (response) => {
                    HttpService.headers = {};
                    if(!HttpService.successCodes.includes(response.status)){
                        throw await HttpService.createError(response);
                    }
                    if(HttpService.debug){
                        console.log(response)
                    }
                    return response._bodyText !== ""?response.json(): true;
                }).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    HttpService.headers = {};
                    console.log(url, headers, body);
                    reject(error);
                });
            }catch(e){
                HttpService.headers = {};
                reject(e);
            }
        });
    }
}
