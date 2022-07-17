import { useState } from "react";
import React, { useEffect } from 'react'
import {getAllOrderCountUserId ,getAllOrderCount} from "../../Services/Status";
import { decoder } from './../../common/baseUrl';


export default function Main()
{
    const [Status, setCardsStatus] = useState([]);
const id=decoder( localStorage.getItem("userToken")).id
const role = decoder( localStorage.getItem("userToken")).role
    useEffect(() => {
      if(role=="EMPLOYEE"||role=="ADMIN"){
        getAllOrderCount().then(({ data }) => {
          setCardsStatus(data);
        }
        );
      }
      else {
        getAllOrderCountUserId(id).then(({data})=>
        {
          setCardsStatus(data);
        })
      }
      }, []);


     
     
    return (
      <>
        <div className="card-group container-fluid">
          {Status.map(({ statusName, orderCount }) => {
            return (
              <div className="card m-5">
                <img src="https://www.shipbob.com/wp-content/uploads/2019/12/iStock-692898468-2.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Status Name : {statusName}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Order Count : {orderCount}
                    </small>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
}