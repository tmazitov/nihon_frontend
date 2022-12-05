function getCreateUserForm() {
    return {
        header: {
            "Username": 0,
            "Password": 1, 
        }, 
        fields: [
            {
                isRequired: true,
                name: "Username",
                json: "NickName",
                input: {
                    type: "text",
                    currentValue: "",
                },
                validation: function(){},
                setter: function(){},
                //annotation: "Will be part of URL. Only a-z, 0-9 are allowed",
            },
            {
                isRequired: true,
                name: "Password",
                json: "Password",
                input: {
                    type: "text",
                    currentValue: "",
                },
                validation: function(){},
                setter: function(){},
            }
        ]
    }
}

export default getCreateUserForm