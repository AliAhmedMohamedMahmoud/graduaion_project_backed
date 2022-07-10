import { base } from "../common/baseUrl"
import axios from "axios"

const stateBase=`${base}State`


export const getAll=()=>{
    return axios.get(stateBase)
}
