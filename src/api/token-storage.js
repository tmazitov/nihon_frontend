import axios from "axios";

const token = axios.create({
    baseURL: "/aaa/api/auth/tokens",
})

class TokenService {
    static refreshToken() {
        token.post('/refresh')
            .then((response) => {
                let data = response.data
                let tokenPair = {
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken
                }

                this.set(tokenPair)
            })
            .catch(_ => {
                this.del()
            });
    }

    static set(tokenPair) {
        localStorage.setItem("nihonToken", JSON.stringify(tokenPair));
    }

    static del() {
        localStorage.removeItem("nihonToken");
    }

    static tokenIsExists() {
        let access = this.getAccess()
        return access != undefined && access != ""
    }

    static getAccess() {
        var jwtToken = localStorage.getItem("nihonToken")
        if (!jwtToken)
            return null

        let result = JSON.parse(jwtToken)

        return result.accessToken
    }
    static getRefresh() {
        var jwtToken = localStorage.getItem("nihonToken")
        if (!jwtToken)
            return null

        let result = JSON.parse(jwtToken)

        return result.refreshToken
    }
}



export default TokenService