<template>
    <div class="main__template">
        <Header/>
        <slot></slot>
    </div>
</template>

<script>
import Header from '../components/header/Header.vue'

export default {
    name: 'MainTemplate',
    components:{
        Header
    }
}
</script>