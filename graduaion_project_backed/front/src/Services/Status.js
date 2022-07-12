import { base } from "../common/baseUrl"
import axios from "axios"

const statusBase=`${base}Status`


export const getAll=()=>{
    return axios.get(statusBase)
}
export const edit=(id,Status)=>{
    return axios.put(`${statusBase}/${id}`,Status)
}
export const add=(Status)=>{

    return axios.post(statusBase,Status)
}
export const deleteStatus=(id)=>{
    return axios.delete(`${statusBase}/${id}`)
}
export const getById=(id)=>{
    return axios.get(`${statusBase}/${id}`)
}