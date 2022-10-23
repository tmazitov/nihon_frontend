<template>
    <div class="header">
        <div class="logo">
            日本の辞書
        </div>
        <div class="routes">
            <div class="route__item"
            v-for="route,index in routes"
            @click="routerPush(route.pathName)"
            :key="`route_item_${index}`">
                {{route.title}}
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router'


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
    {
        title: "Profile",
        pathName: "profile"
    },
]

export default {
    name: 'Header',
    setup() {
      return {routes, routerPush}  
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

    font-family: 'Kiwi Maru', serif;
    font-weight: 500;
    font-size: 28px;

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