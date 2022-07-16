import { base } from "../common/baseUrl"
import axios from "axios"

const OrderBase = `${base}Order`


export const getAllOrder = () => {
    return axios.get(OrderBase)
}

export const getAllOrderBySellerId = (id) => {
    return axios.get(`${OrderBase}/seller/${id}`)
}

export const getById = (id) => {
    return axios.get(`${OrderBase}/${id}`)
}
export const add = (order) => {
    return axios.post(OrderBase, order)
}

export const edit = (id, order) => {
    return axios.put(`${OrderBase}/${id}`, order)
}

export const deleteOrder = (id) => {
    return axios.delete(`${OrderBase}/${id}`)
}
export const getByStatus = (Statusid, PageId) => {

    return axios.get(`${OrderBase}/s/${Statusid}?pageIndex=${PageId}`)

}

// export const getByStatusAndDate=(StartDate,EndDate,Statusid,PageId)=>{

//     return axios.get(`${OrderBase}/ss/${Statusid}?start=${StartDate}&end=${EndDate}&pageIndex=${PageId}`)

// }
export const getByStatusAndDate=(StatusData)=>{

        return axios.get(`${OrderBase}/ss/${StatusData.Statusid}?start=${StatusData.StartDate}&end=${StatusData.EndDate}&pageIndex=${StatusData.PageId}`)
    
     }

