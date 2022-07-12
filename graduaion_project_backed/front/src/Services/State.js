import { base } from "../common/baseUrl"
import axios from "axios"

const stateBase=`${base}State`


export const GetAll=(pageNumber)=>{
   
    return axios.get(stateBase,{ params: { pageNumber } })
}
export const GetNumberOfPages=()=>{
    return axios.get(`${stateBase}/Number`)
}
export const GetById=(id)=>{
    return axios.get(`${stateBase}/${id}`);
}
export const Add=(stateName)=>{
    console.log(stateName);
    return axios.post(stateBase, { name:stateName });
}
export const Delete=(id)=>{
    return axios.delete(`${stateBase}/${id}`);
}


export const Edit=(id,stateName)=>{
    return axios.put(`${stateBase}/${id}`,{ name:stateName });
    
}