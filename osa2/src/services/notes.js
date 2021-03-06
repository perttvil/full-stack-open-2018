import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'
// This was changed to direct to node server created in osa3
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const wrongNote = {
            "id": 99999,
            "content": "Puuttuva note",
            "date": "2017-12-10T17:30:31.098Z",
            "important": true
        }
    return request.then(response => response.data.concat(wrongNote))
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }