<template>
    <div class="profile__page">
        <div class="profile__card">
            <div class="head__content">
                <div class="avatar__cont"></div>
                <div class="user_main_info">
                    <div class="nickname">{{nickname}}</div>
                    <div class="field">
                        <div class="label">Имя:</div>
                        Рустам
                    </div>
                    <div class="field">
                        <div class="label">Фамилия:</div>
                        Ниязов
                    </div>
                    <div class="field">
                        <div class="label">Деятельность:</div>
                        Преподаватель иностранных языков
                    </div>

                    <div class="field">
                        <div class="label">Языки:</div>
                        <div class="language__cont">
                            <div class="language"
                                v-for="lang,index in languages"
                                :key="`language__${index}`">
                                {{lang.title}}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="label">О себе:</div>
                        Ничего
                    </div>
                </div>
            </div>
            <!-- <div class="field">
                <div class="label">Проведённых диктантов:</div>
            </div>
            <div class="field">
                <div class="label">Участий в состязаниях:</div>
            </div>
            <div class="field">
                <div class="label">Выйгранных состязаний:</div>
            </div> -->

        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'ProfilePage',
    setup(){
        const store = useStore()
        const nickname = ref("")
        store.getters.getNickname().then(nick => nickname.value = nick)

        const languages = reactive([
            {title: "Английский"},
            {title: "Испанский"},
            {title: "Русский"},
        ])

        return {
            nickname : nickname,
            languages
        }
    }
}
</script>

<style scoped>
.profile__page{
    font-family: 'Mulish', sans-serif;
    height: calc(100vh - 70px - 50px);    
    padding-top: 50px;
}

.profile__card{
    margin: 0 auto;
    height: 600px;
    width: 600px;
    padding: 25px 40px;
    background: white;
    border-radius: 7px;
    border: 2.5px solid #B6D5D7;
}

.head__content{
    display: flex;
    flex-direction: row;
    gap:25px;
}

.user_main_info{
    display: flex;
    gap: 10px;
    flex-direction: column;
}

.nickname{
    font-size: 24px;
    font-weight: 600;
}

.avatar__cont{
    height: 150px;
    width: 150px;
    border: 1.5px solid lightgray;
    border-radius: 75px;

}

.field{
    display: flex;
    gap:10px;
}

.field > .label {
    font-weight: 600;
    color: rgb(170, 170, 170);
    display: flex;
    align-items: center;
}

.language__cont{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap:10px;
}
.language{
    cursor: pointer;
    padding: 5px;
    border: 1px solid #0C7478;
    border-radius: 2px;
}

.language:hover{
    background: #0C7478;
    color: white;
}



</style>

