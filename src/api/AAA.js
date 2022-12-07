import axios from 'axios'
import User from './user.js'
import TokenService from './token-storage.js'

const auth = axios.create({
    baseURL: "/aaa/api/auth",
})

class AAA {
    static signIn(authData){
        return auth.post("", authData).then(response => {
            let data = response.data
            let tokenPair = {
                refreshToken: data["Refresh"],
                accessToken: data["Access"]
            }

            TokenService.set(tokenPair)
            return response
       })
    }

    static signUp(authData){
        return auth.post("/sign-up", authData).then(response => {
            let data = response.data
            let tokenPair = {
                refreshToken: data.refreshToken,
                accessToken: data.accessToken
            }

            TokenService.set(tokenPair)
            return response
        })
    }

    static user = User
}

export default AAA