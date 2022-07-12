import { base } from "../common/baseUrl"
import axios from "axios"

const cityBase=`${base}City`


export const getAllWithPagination=(pageNumber)=>{
    console.log("first")
    return axios.get(`${cityBase}/pagination/${pageNumber}`)
}

export const getAll=()=>{
    return axios.get(`${cityBase}`)
}

export const add=(city)=>{
    return axios.post(cityBase,city)
}

export const edit=(id,city)=>{
    return axios.put(`${cityBase}/${id}`,city)
}

export const getById=(id)=>{
    return axios.get(`${cityBase}/${id}`)
}

export const deleteCity=(id)=>{
    return axios.delete(`${cityBase}/${id}`)
}





