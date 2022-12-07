<template>
    <div class="profile__page">
        <div class="profile__card">
            <div class="head__content">
                <div class="avatar__cont"></div>
                <div class="user_main_info">
                    <div class="nickname">{{user.nickname}}</div>
                    
                    <div class="field" v-for="field,index in user.details" :key="`field_detail_${index}`">
                        <div class="label">{{field.title}}</div>
                        <div class="content"
                            v-if="(field.value && !field.isEdit)"
                            @mouseover="field.isHover = true" 
                            @mouseleave="field.isHover = false"
                            @click="() => {
                                field.isEdit = true
                                field.isHover = false
                            }"
                            >
                            <div>
                                {{field.value}}
                            </div>
                            <div class="edit__selector" v-show="field.isHover">
                                <span class="iconify" data-icon="material-symbols:edit" data-width="16" data-height="16"></span>
                            </div>
                        </div>
                        <div v-else>
                            <input type="text"  
                            @input="onEdit" 
                            @focusout="field.isEdit = false"
                            v-model="field.value">
                        </div>
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
            <div class="submit__button" v-if="dataIsChanched()" @click="submitChanges">
                Save
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import AAA from '../api/AAA';

export default {
    name: 'ProfilePage',
    setup(){
        const store = useStore()
        const user = reactive({
            nickname: "",
            details: {},
        })

        const initialValues = []

        const submitChanges = () => {
            AAA.user.putDetails({
                FirstName : user.details.FirstName.value,
                LastName : user.details.LastName.value,
                JobName : user.details.JobName.value,
                About : user.details.About.value,
            })
        }
        
        const dataIsChanched = () => {
            return Object.values(user.details).find((detail, index) => {
                return detail.value != initialValues[index]
            }) !== undefined
        }

        const titles = ["Имя:", "Фамилия:", "Деятельность:", "О себе:"]

        store.getters.getUser().then(({nick, uid}) => {
            user.nickname = nick
            AAA.user.getDetails(uid).then(({data}) => {
                Object.keys(data).forEach((field, index) => {
                    initialValues.push(data[field])
                    user.details[field] = {
                        title : titles[index],
                        value : data[field],
                        isEdit : false,
                        isHover : false,
                    }
                })
            })
        })

        const languages = reactive([
            {title: "Английский"},
            {title: "Испанский"},
            {title: "Русский"},
        ])

        return {
            languages,
            user,
            dataIsChanched,
            submitChanges,
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

.field > .content{
    cursor: pointer;
    border-bottom: 1px solid white;
    display: flex;
    gap:5px;
}

.field > .content:hover{
    border-color: #0C7478;;
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

.submit__button{
    background: #0C7478;
    color: white;
    padding: 7px 25px;
    width:140px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
}

</style>

