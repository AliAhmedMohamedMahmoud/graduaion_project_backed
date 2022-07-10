import { Fragment, useEffect, useState } from "react"

import {GetAll,GetNumberOfPages} from '../../Services/State'
export default function  ShowStates(params) {

    const [states , setStates ] = useState([]);
    const [NumberOfPages , setNumberOfPages] = useState(0);
    const [PageIndex , setPageIndex] = useState(0);

    useEffect(()=>{
     GetAll().then(
        ({data})=>{
            setStates(data)
        },
        (err)=>{alert("errore while get state")}
     )
    },[])


    useEffect(()=>{
        GetNumberOfPages().then(
           ({data})=>{
            console.log( "we gpt the number ");
            setNumberOfPages(data)
           },
           (err)=>{alert(err)}
        )
       },[PageIndex])

       function HandelPageination(par) {
        setPageIndex(par-1);
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
                                {states.map(({ name },i) => {
                                    return (

                                        <Fragment key={i}>

                                        <tr >
                                            <td>{name}</td>
                                            <td>
                                                <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul class="pagination">

                               {
                                 (new Array(3,3,3)).map((v,i)=>{

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