import { base ,config } from "../common/baseUrl"
import axios from "axios"

const statusBase=`${base}Status`


export const getAll=()=>{
    console.log("second Scheck")
    return axios.get(statusBase,config)
}

export const getNewStutesId=()=>{

    return axios.get(`${statusBase}/Newstatus`)
}

export const edit=(id,Status)=>{
    return axios.put(`${statusBase}/${id}`,Status,config)
}
export const add=(Status)=>{

    return axios.post(statusBase,Status,config)
}
export const deleteStatus=(id)=>{
    return axios.delete(`${statusBase}/${id}`,config)
}
export const getById=(id)=>{
    return axios.get(`${statusBase}/${id}`,config)
}
export const getAllOrderCountUserId=(id)=>
{
    return axios.get(`${statusBase}/SatatusOrdersPerUsers/${id}`,config)
}
export const getAllOrderCount=()=>
{
    return axios.get(`${statusBase}/AllSatatusOrders`,config)
}