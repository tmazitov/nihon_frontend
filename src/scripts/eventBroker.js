const IS_DEV = true 

class EventBroker{
    #eventRoutes
    constructor () {
        this.#eventRoutes = {}
    }

    $on(type, endpoint, func){
        if(!this.#eventRoutes[type]){
            this.#eventRoutes[type] = {}
        }

        if(this.#eventRoutes[type][endpoint]){
            if(IS_DEV) {console.log('Event list', this.#eventRoutes)}
            throw new Error(`EventBroker : event with enpoint ${endpoint} and type ${type} already exists`)
        }

        this.#eventRoutes[type][endpoint] = func
    }
    
    #deleteEvent(type, endpoint){
        this.#checkEndpoint(type, endpoint)

        delete this.#eventRoutes[type][endpoint]
    }
    
    #checkType(type){
        if(!this.#eventRoutes[type]){
            if(IS_DEV) {console.log('Event list', this.#eventRoutes)}
            throw new Error(`EventBroker : event with type "${type}" is undefined`)
        }
    }

    #checkEndpoint(type, endpoint){
        if(!this.#eventRoutes[type][endpoint]){
            if(IS_DEV) {console.log('Event list', this.#eventRoutes)}
            throw new Error(`EventBroker : event with endpoint "${endpoint}" is undefined`)
        }
    }

    $off(type, endpoint=""){
        this.#checkType(type)

        if (endpoint){
            this.#deleteEvent(type, endpoint)
            return
        }   

        Object.keys(this.#eventRoutes[type]).forEach(endpoint => {
            this.#deleteEvent(type, endpoint)
        })
    }

    $emit(type, endpoint, data){
        this.#checkType(type)
        this.#checkEndpoint(type, endpoint)

        let handler = this.#eventRoutes[type][endpoint]
        handler(data)
    }
}

export default EventBroker