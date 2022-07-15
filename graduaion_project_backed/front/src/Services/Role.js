import { base ,config } from "../common/baseUrl"
import axios from "axios"

const stateBase=`${base}Role`


export const GetAll=()=>{
    return axios.get(stateBase,config)
}

