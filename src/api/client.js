import axios from 'axios'
import router from '../router.js'

import TokenService from './token-storage.js'

const client = axios.create({
    baseURL: "",
    timeout: 3000,
});

client.interceptors.request.use(
    (request) => {
        let access = TokenService.getAccess()
        if (access)
            request.headers.Authorization = access

        return request
    },
    (error) => Promise.reject(error)
)

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

client.interceptors.response.use(
    (response) => {
        console.info("response interceptor: OK : ", response.config.url)
        return response
    },
    (error) => {

        const originalRequest = error.config;
        let statusCode = error.response.status

        if (statusCode === 401 && !originalRequest._retry) {

            console.log("response interceptor: 401 : ", error.config.url);

            if (isRefreshing) {
                console.log("is refreshing");
                return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                    .then((accessToken) => {
                        originalRequest.headers.Authorization = accessToken
                        return axios(originalRequest);

                    })
                    .catch((err) => {
                        console.log("promise reject");
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = TokenService.getRefresh()
            return new Promise(function(resolve, reject) {
                axios
                    .post("/aaa/api/tokens/refresh", { "Refresh" : refreshToken })
                    .then((response) => {
                        console.log('newtokenpair', response)

                        let tokenPair = response.data
                        console.log('tokenPair2:', tokenPair)
                        TokenService.set(tokenPair)
                        originalRequest.headers.Authorization = tokenPair.accessToken
                        processQueue(null, tokenPair.accessToken);
                        resolve(axios(originalRequest));

                    })
                    .catch((err) => {
                        console.error("refresh token failed!");
                        processQueue(err, null);
                        reject(err);

                        if (router.currentRoute.path != "/auth") {
                            console.log("router to /auth");
                            router.push("/auth");
                        }
                    })
                    .finally(() => {
                        console.error("interceptor finally");
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
)

export default client