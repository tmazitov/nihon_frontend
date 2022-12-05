<template>
    <div class="input__field">
        <div class="lable">{{name}}</div>
        <input type="text" @input="onInput" v-model="field.value">
        <div v-if="errorMessage" class="error__message">{{errorMessage}}</div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import bus from './eventBus.js'
export default {
    name: 'InputField',
    props: {
        input: {
            type: Object,
            required: true,
            validation(){},
        },
        setter: {
            type: Function,
            required: true,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        annotation: {
            type: String,
            default: "",
        },
    },
    created() {
        
    },
    setup(props) {
        const errorMessage = ref("");

        bus.$on(`input_field_${props.name}`, 'view-error-message', ({message}) => errorMessage.value = message)
        const field = reactive({
            value : props.input.currentValue
        })

        const onInput = () => {
            if (errorMessage.value != ""){
                errorMessage.value = ""
            }
            props.setter(props.name, field.value)
        }

        return {field, onInput, errorMessage}
    } 
};
</script>

<style scoped>
.lable{
    margin-bottom: 8px;
}
input[type='text']{
    padding: 5px 7px;
    border: 2px solid;
    border-color: #d7bb8a;
    border-radius: 7px;
    width: calc(100% - 17px);
}

.error__message{
    color: red;
}
</style>