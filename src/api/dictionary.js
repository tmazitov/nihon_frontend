import {create} from 'axios'

const client = create({
    baseURL: 'https://localhost:8080/',
    timeout: 1000,
  });


class Dictioary {
    static getAll(){
        return client.get("/dictioary")
    }
}

export default Dictioary