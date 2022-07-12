import { base } from "../common/baseUrl"
import axios from "axios"

const branchUrl=`${base}Branche`



export const getAll=()=>{
    return axios.get(branchUrl)
}

export const add=(branch)=>{
    return axios.post(branchUrl,branch)
}

export const paginationaBaranches=(pageNumber)=>{
    console.log("first")
    return axios.get(`${branchUrl}/pagination/${pageNumber}`)
}

export const editBranch=(id,branch)=>{
    return axios.put(`${branchUrl}/${id}`,branch)
}

export const getById=(id)=>{
    return axios.get(`${branchUrl}/${id}`)
}

export const deleteBranch=(id)=>{
    return axios.delete(`${branchUrl}/${id}`)
}