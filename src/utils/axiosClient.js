import axios from "axios";

const token = JSON.parse(localStorage.getItem("token")) || ""

const clientAxios = axios.create({
    // baseURL: "http://localhost:1212"
    baseURL: "https://backend-proyecto-juan.vercel.app"
})

export const config = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": token
    }
}

export default clientAxios