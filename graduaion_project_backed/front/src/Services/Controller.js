import { base } from "../common/baseUrl"
import axios from "axios"

const controllerBase=`${base}Conroller`



export const getAll=()=>{
    return axios.get(`${controllerBase}`)
}