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
      if(role.includes('ADM')||role.includes('EMP')){
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
        <div className="row justify-content-center">
          {

            Status.length !=0 ? 
              Status.map(({ statusName, orderCount }) => {
                return (
                  <div className="card m-2 " style={{width:170 , height:250}}>
                    <img src="https://www.shipbob.com/wp-content/uploads/2019/12/iStock-692898468-2.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Status Name : {statusName}</h5>
                      <p className="card-text">
                        <small className="  ">
                          Order Count : 
                        </small>
                        <span className='fs-4 text-danger'>{orderCount}</span>
                      </p>
                    </div>
                  </div>
                );
              }):
              
              <div className='row '>
                 <h1 className = 'm-auto col-11 text-center mt-5'> NO DATA Yet </h1>
                <img className='col-6 m-auto mt-5'   src='https://cdn.dribbble.com/users/2194014/screenshots/14835699/media/46375810773ee7867af3acd753b391ee.png' />
              </div>
              
              
              
          
          
          
          }
        </div>
      </>
    );
}