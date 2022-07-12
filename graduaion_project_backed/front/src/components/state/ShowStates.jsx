import { Fragment, useEffect, useState } from "react"

import {GetAll,GetNumberOfPages,Delete} from '../../Services/State'
export default function  ShowStates(params) {

    const [states , setStates ] = useState([]);
    const [NumberOfPages , setNumberOfPages] = useState(0);
    const [PageIndex , setPageIndex] = useState(0);
     const HelperARR=[]
    useEffect(()=>{
     GetAll(PageIndex+1).then(
        ({data})=>{
            setStates(data)
        },
        (err)=>{alert("errore while get state")}
     )
    },[PageIndex])


    useEffect(()=>{
        GetNumberOfPages().then(
           ({data})=>{
            console.log( "we gpt the number ");

            for (let index = 0; index < NumberOfPages; index++) {
               HelperARR.push(1);                
            }
            setNumberOfPages(data)


           },
           (err)=>{alert(err)}
        )
       },[])

       function HandelPageination(par) {
        setPageIndex(par-1);
       }
       function HandelDelete(id) {
        // let res = confirm("Press to confirm!");
        // if(res)
            Delete(id);
       }
    return (
        <>
            <div class="container">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2>Customer <b>Details</b></h2></div>
                                <div class="col-sm-4">
                                    <div class="search-box">
                                        <i class="material-icons">&#xE8B6;</i>
                                        <input type="text" class="form-control" placeholder="Search&hellip;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>City <i class="fa fa-sort"></i></th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {states.map(({ name,id },i) => {
                                    return (

                                        <Fragment key={i}>

                                        <tr >
                                            <td>{name}</td>
                                            <td>
                                                <a onClick={(event)=>HandelDelete(id)} class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>2</b> out of {NumberOfPages}<b></b> entries</div>
                            <ul class="pagination">

                               {
                               
                                 HelperARR.map((v,i)=>{

                                    if (i == PageIndex) { return( 
                                       
                                        <Fragment key={i}>                               
                                            <li class="page-item  active"><a  onClick={(event)=>HandelPageination(i+1)}  class="page-link">{i+1}</a></li>                                               
                                        </Fragment> 
                                    )}
                                    else
                                    {
                                        return( 
                                       
                                            <Fragment key={i}>                               
                                                <li class="page-item "><a  onClick={(event)=>HandelPageination(i+1)}  class="page-link">{i+1}</a></li>                                               
                                            </Fragment> 
                                        )   
                                    }
                                   

                                 })
                               }
{                             
                           /*      <li class="page-item"><a href="#" class="page-link">2</a></li>
                                <li class="page-item active"><a href="#" class="page-link">3</a></li>
                                <li class="page-item"><a href="#" class="page-link">4</a></li>
                                <li class="page-item"><a href="#" class="page-link">5</a></li> */}
                                <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}