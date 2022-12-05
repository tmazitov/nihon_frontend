<template>
<div class="app">

  <!-- Main temlate pages -->
  <span v-if="choiceTemplate() == 'main'">
    <MainTemplate>
      <router-view></router-view>
    </MainTemplate>
  </span>


  <!-- No temlate pages -->
  <span v-if="choiceTemplate() == null">
    <router-view></router-view>
  </span>

</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MainTemplate from './templates/MainTemplate.vue'

const noTemplatePathNames = [
  'auth'
]

export default {
  name: 'App',
  components: {
    MainTemplate
  },
  setup(){
    const store = useStore()
    const route = useRoute()

    if (store.getters.isLogin){
      store.dispatch('set-user-info')
    }

    const choiceTemplate = () => {

      if (noTemplatePathNames.includes(route.name)){
        return null
      }

      return "main"
    }

    return {choiceTemplate: choiceTemplate}
  }
}
</script>

<style>
#app {
  font-family: rubik, sans-serif;
  font-weight: 400;
  font-style: normal;
  background: #E7F1F2;
  color: #2c3e50;
  height: 100vh;
}

.page__content{
  width: 700px;
}

.card{
    border-radius: 7px;
    background: white;
    border: 2.5px solid #e1e1e1;
    margin-top: 32px;
    padding: 15px;
}

.main__title{
  font-size: 28px;
  font-weight: 600;
}

a:link {
  color: #3c6e71;
  background-color: transparent;
}

h1{
  margin: 0;
}

a:visited {
  color: #3c6e71;
  background-color: transparent;
}

.fcc{
  display: flex;
  justify-content: center;
  align-items: center;
}

body{
  margin: 0;
  padding: 0;
}
</style>
