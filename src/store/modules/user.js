import AAA from "../../api/AAA"
import TokenService from "../../api/token-storage"

const getDefaultState = () => {
    return {
        isLogin: TokenService.tokenIsExists(),
        Uid: "",
        NickName: ""
    }
}

export default {
    state: getDefaultState(),
    mutations: {
        'set-user-info' : (state, payload) => {
            state.isLogin = true
            Object.keys(payload).forEach( field => {
                state[field] = payload[field]
            })
        }
    },  
    getters: {
        getUser: (state) => () => {
            return new Promise((success, _) => {
                setInterval(() => {
                    if (state.NickName != ""){
                        success({
                            nick : state.NickName,
                            uid : state.Uid
                        })
                    }
                }, 50, state)
            })
        },
        isLogin: (state) => {
            return state.isLogin
        }
    },
    actions: {
        'set-user-info': async(context, _) => {
            AAA.user.get().then(({data}) => {
                if (!data.NickName){
                    return
                }
                context.commit('set-user-info', data)
            })
        },
    }
}