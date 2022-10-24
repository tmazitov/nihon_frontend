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
                    <div class="field">
                        <div class="lable">Email</div>
                        <input type="text" v-model="signInForm.email">
                    </div>
                    <div class="field">
                        <div class="lable">Password</div>
                        <input type="text" v-model="signInForm.password">
                    </div>
                    <div class="help__container">
                        <a href="">Lost password</a>
                    </div>
                    <div class="submit_button_cont">
                        <div class="submit__button">
                            Sign in
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    name: 'AuthPage',   
    setup() {
        const isRegForm = ref(false)

        const signInForm = reactive({
            email: "",
            password: "",
        })

        const regForm = reactive({
            email: "",
            password: "",
        })

        const switchForm = () => {
            isRegForm.value = !isRegForm.value
        }

        return {isRegForm, signInForm, regForm, switchForm}
    }
}
</script>

<style scoped>
.auth__page{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.auth__container{
    height: 400px;
    width: 660px;
    border: 3px solid #3c6e71;
    border-radius: 7px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

.description{
    background: #3c6e71;
    color: wheat;

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
    border-color: #3c6e71;
    border-radius: 7px;
    width: calc(100% - 17px);
}

.field{
    width: 290px;
}

.lable{
    margin-bottom: 8px;
}

.submit_button_cont{
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.submit__button{
    background: #3c6e71;
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
    background: #335d5f;   
}

.switch__button{
    color: #3c6e71;
    cursor: pointer;
}

.help__container{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>