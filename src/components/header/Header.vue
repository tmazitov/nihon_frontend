<template>
    <div class="header">
        <div class="logo">
            Nihon
        </div>
        <div class="routes">
            <div class="route__item"
            v-for="route,index in routes"
            @click="routerPush(route.pathName)"
            :key="`route_item_${index}`">
                {{route.title}}
            </div>
            <div v-if="isLogin" class="route__item"
            @click="routerPush('profile')">
                {{user.Nickname}}
            </div>
            <div v-else class="route__item"
            @click="routerPush('auth')">
                Auth
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router'
import { useStore } from 'vuex'
import { ref , reactive} from 'vue'

const routerPush = (pathName) => {
    router.push({name: pathName})
}

const routes = [

    {
        title: "About",
        pathName: "about"  
    },
    {
        title: "Dictionary",
        pathName: "dictionary" 
    },

]

export default {
    name: 'Header',
    setup() {
        const store = new useStore()
        
        const isLogin = ref(store.getters.isLogin)
        const user = reactive({
            Nickname : ""
        })

        store.getters.getNickname().then(nickname => {
            user.Nickname = nickname
        })

        return {isLogin, routes, routerPush, user}  
    }
}
</script>

<style scoped>
.header{
    color: #ffffff;
    width: 100%;
    height: 70px;
    position: relative;
    background: #3c6e71;
}

.routes{
    display: flex;
    justify-content: center;
    height: inherit;
}

.logo{ 
    height: inherit;
    width: 200px;

    font-weight: 700;
    font-size: 28px;
    color: wheat;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.route__item{
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.route__item:hover {
    background: #353535;
}
</style>