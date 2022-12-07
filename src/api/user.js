import client from "./client"

class User {
    static get(uid=""){
        let userData = ""
        if (uid){
            userData = `?uid=${uid}`
        }
        return client.get('/aaa/api/user' + userData)
    }

    static getDetails(uid=""){
        let userData = ""
        if (uid){
            userData = `?uid=${uid}`
        }
        return client.get('/aaa/api/profile' + userData)
    }

    static putDetails(details){
        return client.put('/aaa/api/profile', details)
    }
}

export default User