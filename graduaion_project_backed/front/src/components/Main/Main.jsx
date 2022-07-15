import { Component, useState } from "react";
import React, { useEffect } from 'react'
import {getAll, getById ,getAllOrderCountUserId ,getAllOrderCount} from "../../Services/Status";
export default function Main()
{
    const[StatusName ,setStatuseName]=useState("")
  

    useEffect(() => {
        getAllOrderCount().then(({ data }) => {
          console.log(data)
        });
    
      
      }, []);
     
    return(
        <>
       
        </>
    )
}