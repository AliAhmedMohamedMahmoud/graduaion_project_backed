import { Component, useState } from "react";
import React, { useEffect } from 'react'
import {getAll, getById ,getAllOrderCountUserId ,getAllOrderCount} from "../../Services/Status";
import { decoder } from './../../common/baseUrl';
export default function Main()
{
    const[StatusName ,setStatuseName]=useState("")
  
const id=decoder( localStorage.getItem("userToken")).id
const role = decoder( localStorage.getItem("userToken")).role
    useEffect(() => {
      if(role=="Employee"){
        getAllOrderCount().then(({ data }) => {
          console.log(data)
        });
      }
      else {
        getAllOrderCountUserId(id).then(({data})=>
        {
            console.log(data);
        })
      }
      }, []);


     
     
    return(
        <>
       
        </>
    )
}