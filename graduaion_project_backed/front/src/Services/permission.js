import { base } from "../common/baseUrl"
import axios from "axios"

const permissionBase=`${base}Permission`



export const getAll=()=>{
    return axios.get(`${permissionBase}`)
}