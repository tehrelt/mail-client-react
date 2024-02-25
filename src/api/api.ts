import axios from "axios";

const BASE_URL = "http://127.0.0.1:7000"

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
})

export const smtp = axios.create({
    baseURL: `${BASE_URL}/smtp`,
    timeout: 100000
})

export const pop3 = axios.create({
    baseURL: `${BASE_URL}/pop3`,
    timeout: 1000
})