import { base } from "../common/baseUrl"
import axios from "axios"

const cityBase=`${base}City`


export const getAll=()=>{
    return axios.get(cityBase)
}

export const add=(city)=>{
    return axios.post(city)
}
