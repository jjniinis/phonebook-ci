import axios from "axios"

const PORT = process.env.REACT_APP_PORT || 8080
const baseUrl = `https://localhost:${PORT}/api/persons`
console.log(`env port value: ${process.env.REACT_APP_PORT}`)
console.log(`baseUrl: ${baseUrl}`)

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    update
}