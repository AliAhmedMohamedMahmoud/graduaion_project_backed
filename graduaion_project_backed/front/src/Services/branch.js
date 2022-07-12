import { base } from "../common/baseUrl"
import axios from "axios"

const branchUrl=`${base}Branche`


export const getAll=()=>{
    return axios.get(branchUrl)
}

export const add=(branch)=>{
    return axios.post(branch)
}