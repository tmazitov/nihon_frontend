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
        Nickname: (state) => {
            return state.NickName
        },
        getNickname: (state) => () => {
            return new Promise((success, _) => {
                setInterval(() => {

                    if (state.NickName != ""){
                        success(state.NickName)
                    }
                }, 100, state)
            })
        },
        isLogin: (state) => {
            return state.isLogin
        }
    },
    actions: {
        'set-user-info': async(context, _) => {
            AAA.getUserProfile().then(({data}) => {
                if (!data.NickName){
                    return
                }
                context.commit('set-user-info', data)
            })
        },
    }
}