<template>
    <div class="auth__page">
        <div class="auth__container">
            <div class="description">
                Learn new words effectively!
            </div>
            <div class="form">

                <!-- Registration -->
                <div v-if="isRegForm" class="registration">
                    <div><h1>Registration</h1><a @click="switchForm" class="switch__button">Authorization</a></div>
                </div>

                <!-- Sign in -->
                <div v-else class="sign__in">
                    
                    <div><h1>Authorization</h1><a @click="switchForm" class="switch__button">Registration</a></div>
                    <InputField 
                        v-for="field,index in forms.signInForm.fields" 
                        :key="`auth_field_${index}`"
                        :name="field.name"
                        :input="field.input"
                        :label="field.label"
                        :setter="field.setter"
                        :placeholder="field.placeholder"
                        :annotation="field.annotation"
                    />
                    
                    <div class="help__container">
                        <a href="">Lost password</a>
                    </div>
                    <div class="submit_button_cont">
                        <div class="submit__button" @click="onSubmitSignIn">
                            Sign in
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getCreateUserForm from '../components/forms/templates/createUser.js';

import InputField from '../components/forms/InputField.vue';
import onSendError from '../components/forms/actions/onSendError.js'

import { reactive, ref } from '@vue/reactivity'
import AAA from '../api/AAA';
import router from '../router.js'
import {useStore} from 'vuex'

function setupFieldSetter(form, setter){
    form.fields.forEach(field => {
        field.setter = setter
    });
}



export default {
    name: 'AuthPage',   
    components: { 
        InputField    
    },
    setup() {
        const store = useStore()
        const isRegForm = ref(false)

        const signInForm = getCreateUserForm();
        setupFieldSetter(signInForm, ((name, value) => {
            let index = signInForm.header[name]
            signInForm.fields[index].input.currentValue = value
        }))

        const onSubmitSignIn = () => {
            let submitData = {}
            try{
                signInForm.fields.forEach( field => {
                    if (field.isRequired && field.input.currentValue == ""){
                        throw new Error(`${field.name} : ${field.name} is required`)
                    }

                    submitData[field.json] = field.input.currentValue
                })
            }
            catch (err){
                let errParts = err.message.split(" : ")
                let fieldName = errParts[0]
                let message = errParts[1]
                onSendError(fieldName, message)
                return
            }

            AAA.signIn(submitData).then((_) => {
                store.dispatch('set-user-info')
                router.push({name: 'profile'})
            })
        }

        const regForm = reactive({
            email: "",
            password: "",
        })

        const switchForm = () => {
            isRegForm.value = !isRegForm.value
        }

        return {
            forms : {
                signInForm,
                regForm,
            }, 
            onSubmitSignIn,
            switchForm,
        }
    }
}
</script>

<style scoped>
.auth__page{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(215, 187, 138);
}

.auth__container{
    height: 400px;
    width: 660px;
    background: wheat;
    border-radius: 7px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

.description{
    background: #BB2649;
    color: wheat;
    border-radius: 7px;
    font-weight: 700;
    font-size: 30px;

    padding: 10px 15px;
    display: flex;
    align-items: flex-end;
}

.form {
    padding: 10px 20px;
}

.form > * {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    height: 100%;
}

input[type='text']{
    padding: 5px 7px;
    border-color: #BB2649;
    border-radius: 7px;
    width: calc(100% - 17px);
}



.submit_button_cont{
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.submit__button{
    background: #BB2649;
    color: wheat;
    width: 250px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
}

.submit__button:hover{
    background: #a31f3e;   
}

.switch__button{
    color: #a31f3e;
    cursor: pointer;
}

.help__container{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>