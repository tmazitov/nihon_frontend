import axios from 'axios'

const client = axios.create({
    baseURL: '',
    timeout: 1000,
  });


class DMS {
    static getAll(){
        return client.get("/dms/api/dictionary").catch(() => {
            console.error("DMS : dictionaries not received")
        })
    }
}

export default DMS