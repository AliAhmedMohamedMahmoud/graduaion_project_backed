import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getById, edit } from '../../Services/Order';
import {getAll as getAllState } from "../../Services/State"
import { getAll } from "../../Services/City"
import {getAll as getAllStatus } from "../../Services/Status"
import { getAllShipping } from "../../Services/Shipping"
import { getAllDelivery } from "../../Services/Delivery"
import { getAllPayment } from "../../Services/Payment"
import { useNavigate } from "react-router-dom";
export default function EditOrder() {

    const { id } = useParams()
    const [City, setCity] = useState([])
    const [states, setStates] = useState([])
    const [Cost, SetCost] = useState(0)
    const [Status, setStatus] = useState([])
    const [Shipping, setShipping] = useState([])
    const [Payment, setPayment] = useState([])
    const [Delivery, setDelivery] = useState([])
    let [error,setError]=useState({customerName:"",customerPhone:"",stateId:""})
    let [display,setDisplay]=useState(false)
 
    
    const [form, setForm] = useState({})
    const [serverError, setserverError] = useState(null)
    const navigate = useNavigate();
    let [Order, setOrder] = useState({ 
        cost: 0,
        customerName:"",
        customerPhone: 0,
        stateId: 0,
        statusId: 0,
        shipId: 0,
        payId: 0,
        deliveryId: 0, 
    })
    // const schema = {
    //     customerName:Joi.string().required(), 
    //     cost:Joi.required(),
    //     customerPhone:Joi.required(),
    //     shipId:Joi.required(),
    //     stateId:Joi.required(),
    //     payId:Joi.required(),
    //     deliveryId:Joi.required(),
    //     statusId:Joi.required()
    //   };

    //   let Validation=()=>{
    //     let error={}
    //     let errors=Joi.validate(Order,schema,{abortEarly:false})
    //     if(!errors.error) return null;
    //     const errorDate={}
    //     for(var item of errors.error.details)
    //     {
    //         const name=item.path[0]
    //         const message=item.message
    //         error[item.path[0]]=item.message
    //         errorDate[name]=message
    //     }
    //     console.log(error)
    //     setError(errorDate)
    //     return error
    //     };       

    let Validation=(Values)=>{
        let error={}
       if (!Values.customerName)
       {
        error.customerName="customerName is required"
       }
       if (!Values.customerPhone)
       {
        error.customerPhone="customerPhone is required"
       } 
      return error

    }












    const handleInput = (e) => {
        setOrder({
            ...Order,
            [e.target.name]: (
                e.target.type == "number" ||
                e.target.type == "select-one"
            ) ? +e.target.value : e.target.value
        })
    }
    useState(() => {
        (async function () {
            const { data: Order } = await getById(id)
            const { data: City } = await getAll()
            const { data: states } = await getAllState()
            const { data: Status } = await getAllStatus()
            const { data: Shipping } = await getAllShipping()
            const { data: Payment } = await getAllPayment()
            const { data: Delivery } = await getAllDelivery()
            console.log(Order);
            console.log(Payment);
            console.log(Status);
            setStates(states)
            setCity(City)
            setStatus(Status)
            setShipping(Shipping)
            setPayment(Payment)
            setDelivery(Delivery)

        })()
    }, [])


    useEffect(() => {

        getById(id).then((Data) => {

            setOrder(Data.data)

        })

            .catch((error) => {
                console.log(error)

            })
    }, [])







    const whenSubmit = async () => {
      
        let listOfError=Validation(Order)
        if(Object.keys(listOfError).length==0)
        {
         try{
               
            console.log(Order);
            await edit(id, Order)
            navigate("/Orders");
    
         }
         catch(error)
         {
            console.log(listOfError)
         }
              
        }
       
            console.log(listOfError)
            setError(listOfError)
       
    }
    return (
        <>
            <div className="container pt-5">
                <div class=" mb-3">
                    <input name='customerName' Value={Order.customerName} onChange={handleInput} type="text" class="form-control mt-3" placeholder="Client Name" aria-label="Username" aria-describedby="basic-addon1" />
                    <div className='text-danger'>{error.customerName}</div>


                  </div>

                <div class=" mb-3">
                    <input name='customerPhone' Value={Order.customerPhone} onChange={handleInput} type="Phone" class="form-control mt-3" placeholder="Client Phone" aria-label="Username" aria-describedby="basic-addon1" />
                    <div className='text-danger'>{error.customerPhone}</div>

                </div>
                <select value={Order.stateId} onChange={handleInput} name='stateId' class="form-select" aria-label="Default select example">
                    <option value={0} selected>select state</option>
                    {
                        states.map(({ id, name }) => {
                            return <option value={id}>{name}</option>
                        })
                    }
                  

                </select>
                <select value={Order.cityId} onChange={handleInput} name='CityId' class="form-select" aria-label="Default select example">
                    <option value={0} selected>select City</option>
                    {
                        City.map(({ id, name }) => {
                            return <option value={id}>{name}</option>
                        })
                    }
                </select>
           
                <select value={Order.payId} name='payId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Payment</option>
                    {Payment.map((pay) => {
                        return <option value={pay.id}>{pay.payment_Type}</option>
                    })}
                </select>
                <select value={Order.shipId} name='shipId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Shipping</option>
                    {Shipping.map((Ship) => {
                        return <option value={Ship.id}>{Ship.shipName}</option>
                    })}
                </select>
                <select value={Order.deliveryId} name='deliveryId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Delivery</option>
                    {Delivery.map((deliver) => {
                        return <option value={deliver.id}>{deliver.deliveryName}</option>
                    })}
                </select>
                <select value={Order.statusId} name='statusId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Status</option>
                    {Status.map((status) => {
                        return <option value={status.id}>{status.name}</option>
                    })}
                </select>
                <div class=" mb-3">
                    <input value={Order.cost} name="cost" onChange={handleInput} type="number" class="form-control mt-3" readOnly aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>

                </div>
                
                <div className='mt-5'>
                    <button onClick={whenSubmit} className='btn btn-success w-25 text-center' type='submit'>Edit</button>
                </div>
            </div>


        </>
    )
}
