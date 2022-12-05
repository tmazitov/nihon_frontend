import bus from "../eventBus"

const onSendError = (name, message) => {
    bus.$emit(`input_field_${name}`, 'view-error-message', {message})
}

export default onSendError