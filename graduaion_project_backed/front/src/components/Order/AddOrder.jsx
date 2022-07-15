import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react"
import { getAll } from "../../Services/City"
import { getAllPayment } from "../../Services/Payment"
import { getAllDelivery } from "../../Services/Delivery"
import { getAllShipping } from "../../Services/Shipping"
import {getAll as getAllBranch } from "../../Services/branch"
import {getAll as getAllState} from "../../Services/State"
import { useNavigate } from "react-router-dom";
import { add } from "../../Services/Order";

export default function AddOrder() {
    const navigate = useNavigate();
    let [Product, setProduct] = useState([])
    let [ProductName, setProductName] = useState("")
    let [Quantity, setQuantity] = useState("")
    let [Weigth, setWeigth] = useState(0)
    let [total, setTotal] = useState(0)
    let [City, setCity] = useState([{}])
    let [CityCost, setCityCost] = useState({})
    let [Payment, setPayment] = useState([])
    let [Delivery, setDelivery] = useState([])
    let [Shipping, setShipping] = useState([])
    let [Branch, setBranch] = useState([])
    let [State, setState] = useState([])
    const [serverError, setserverError] = useState(null)
    let [error,setError]=useState({customerName:"",customerPhone:"",stateId:"",StatusId:"",ShipId:"",PayId:"",DeliveryId:""})
    const [form, setForm] = useState({
        Cost: 0,
        CustomerName: "",
        CustomerPhone: 0,
        StateId: 0,
        StatusId: 1,
        ShipId: 0,
        PayId: 0,
        DeliveryId: 0,
    })

    const handleInput = (e) => {
        console.log(e.target.value);
        if (e.target.name == "CityId") {
            setCityCost(City.find(item => {
                return item.id == e.target.value
            }))

        }
        setForm({
            ...form,          
            [e.target.name]: (e.target.type == "number" || e.target.type == "select-one") ? +e.target.value : e.target.value,

        })
    }



    const whenSubmit = async () => {
      let Error= Validation(form)
    //   if(Object.keys(Error).length==0)
     
    //   {
        try {
            await add(form)
            navigate("/Orders")
        } catch ({ response: { data: { detail } } }) {
            setserverError(detail)
        }
    //  }
            
      console.log(Error)
            setError(Error)
       
        console.log(form)

    }

    let whenProductNameChange = (e) => {
        setProductName(e.target.value)
    }
    let whenQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    let whenWeigthChange = (e) => {
        setWeigth(e.target.value)
    }
    let whenClick = () => {


        setProduct([...Product,
        {
            ProductName,
            Quantity,
            Weigth
        }])

    }
    useState(() => {
        (async function () {
            const data = await getAll().then((city) => {
                setCity(city.data)
                console.log(city.data)
            }).catch((error) => {
                console.log(error)
            })

        })()
    }, [])
    useState(() => {
        (async function () {
            const data = await getAllState().then((stat) => {
                setState(stat.data)
                console.log(stat.data)
            }).catch((error) => {
                console.log(error)
            })

        })()
    }, [])
    useState(() => {
        (async function () {
            const data = await getAllBranch().then((branch) => {
                setBranch(branch.data)
                console.log(branch.data)
            }).catch((error) => {
                console.log(error)
            })

        })()
    }, [])

    useState(() => {
        (async function () {
            const data = await getAllShipping().then((ship) => {
                setShipping(ship.data)
                console.log(ship.data)
            }).catch((error) => {
                console.log(error)
            })

        })()



    }, [])
    useState(() => {

        (async function () {
            const data = await getAllPayment().then((pay) => {
                setPayment(pay.data)
                console.log(pay.data)
            }).catch((error) => {
                console.log(error)
            })

        })()


    }, [])

    useState(() => {

        (async function () {
            const data = await getAllDelivery().then((div) => {
                setDelivery(div.data)
                console.log(div.data)
            }).catch((error) => {
                console.log(error)
            })

        })()


    }, [])
    let TotalWeigth = () => {

        return Product.reduce((total, currentValue) => { return total + (+currentValue.Weigth) }, 0)

    }
    let OrderCost = () => {

        var total = TotalWeigth()
        if (total > 0 && total <= 10) {
            
            return 5 + CityCost.costPerCity
        }
        if (total > 10) {

            return ((total - 10) * 5) + CityCost.costPerCity
        }

    }
    var totalCost=OrderCost()

    console.log(totalCost)
    // let handleChange = (e) => {
    //     console.log(e.target.value)



    // }
    useEffect(() => {
        setForm({
            ...form,
            Cost: totalCost
        })
    }, [CityCost, City])
     let Validation=(Values)=>{}
    //     let error={}
    //    if (!Values.customerName)
    //    {
    //     error.customerName="customerName is required"
    //    }
    //    if (!Values.Email)
    //    {
    //     error.Email="Email is required"
    //    }
    //    if (!Values.customerPhone)
    //    {
    //     error.customerPhone="customerPhone is required"
    //    }
    //    if(!Values.stateId)
    //    {
    //     error.stateId="State Id is required"

    //    }
    //    if(!Values.StatusId)
    //    {
    //     error.StatusId="State is required"

    //    }
    //    if(!Values.ShipId)
    //    {
    //     error.ShipId="Shipping is required"

    //    }
    //    if(!Values.PayId)
    //    {
    //     error.PayId="Payment is required"

    //    }
    //    if(!Values.DeliveryId)
    //    {
    //     error.DeliveryId="Delivery Type is required"

    //    }
       
    //   return error

    // }












   

    return (


        <>

            <div className="container pt-5">
                <h1 className='mb-5'>Add Order</h1>
                <select name='DeliveryId' onChange={handleInput} class="form-select" aria-label="Default select example">
                    <option selected>Delivery Type</option>
                    {Delivery.map(({ id, deliveryName }) => {
                        return <option value={id}>{deliveryName}</option>
                    })}
                </select>
                <div className='text-danger'>{error.DeliveryId}</div>

                <div class=" mb-3">
                    <input name='Clientname' onChange={handleInput} type="text" class="form-control mt-3" placeholder="Client Name" aria-label="Username" aria-describedby="basic-addon1" />
                    <div className='text-danger'>{error.customerName}</div>

                </div>
                <div class=" mb-3">
                    <input name='ClientPhone' onChange={handleInput} type="Phone" class="form-control mt-3" placeholder="Client Phone" aria-label="Username" aria-describedby="basic-addon1" />
                    <div className='text-danger'>{error.customerPhone}</div>

                </div>
                <div class=" mb-3">
                    <input name='Email' onChange={handleInput} type="Email" class="form-control mt-3" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" />
                    
                  
                </div>
                <select name='StateId' onChange={handleInput} class="form-select" aria-label="Default select example">
                    <option selected>Select Governorats</option>
                    {State.map(({ id, name }) => {
                        return <option value={id}>{name}</option>
                    })}
                </select>
                <div className='text-danger'>{error.StateId}</div>

                <select onChange={handleInput} name='CityId' class="form-select" aria-label="Default select example">
                    <option selected>Select City</option>
                    {City.map((city) => {
                        return <option value={city.id}>{city.name}</option>
                    })}
                </select>
                <div className='text-danger'>{error.CityId}</div>
                <select name='PayId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Payment</option>
                    {Payment.map((pay) => {
                        return <option value={pay.id}>{pay.payment_Type}</option>
                    })}
                </select>
                <div className='text-danger'>{error.PayId}</div>

                <select name='ShipId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Shipping</option>
                    {Shipping.map(({ id, shipName }) => {
                        return <option value={id}>{shipName}</option>
                    })}
                </select>
                <div className='text-danger'>{error.ShipId}</div>

                <select name='branchId' onChange={handleInput} class="form-select mt-3" aria-label="Default select example">
                    <option selected>Select Branch</option>
                    {Branch.map((branch) => {
                        return <option value={branch.id}>{branch.name}</option>
                    })}
                </select>
                <div className='text-danger'>{error.branchId}</div>

                <hr></hr>

                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Weigth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td><input name="ProductName" onChange={whenProductNameChange} ></input></td>
                            <td><input name="Quantity" onChange={whenQuantityChange} ></input></td>
                            <td><input name="Weigth" onChange={whenWeigthChange} ></input></td>
                        </tr>
                    </tbody>
                </Table>
                <button onClick={whenClick} className="btn btn-primary">Add Product</button>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Weigth</th>
                            <tr> <button>Delete</button></tr>
                        </tr>
                    </thead>
                    <tbody>
                        {Product.map(ele => {
                            return (
                                <tr>
                                    <td>{ele.ProductName}</td>
                                    <td>{ele.Quantity}</td>
                                    <td>{ele.Weigth}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <hr></hr>
                <div class=" mb-3">
                    <input name="Cost" onChange={handleInput} type="number" class="form-control mt-3" readOnly value={OrderCost() || 0} placeholder="Order Cost" aria-label="Username" aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>
                </div>
                <div class=" mb-3">
                    <input name='Total' type="number" class="form-control mt-3" readOnly value={TotalWeigth()} placeholder="Total Weigth" aria-label="Username" aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>
                </div>
                <div class=" mb-3">
                    <input name='costPerCity' type="number" class="form-control mt-3" placeholder="Notes" aria-label="Username" aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>
                </div>
                <hr></hr>
                <h1>Data Of Merchant</h1>
                <div class=" mb-3">
                    <input name='CustomerName' onChange={handleInput} type="text" class="form-control mt-3" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>
                </div>
                <div class=" mb-3">
                    <input name='CustomerPhone' onChange={handleInput} type="phone" class="form-control mt-3" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1" />
                    <div>
                        <small className=' text-danger'></small>
                    </div>
                </div>

                <div className='mt-5'>
                    <button className='btn btn-success' onClick={whenSubmit} type='submit' >Save</button>
                </div>







                {/* <div>
                <small className=' text-danger'></small>
            </div>
            <div className='mt-5'>
                <button  className='btn btn-success' type='submit'>add</button>
            </div>
            <div className=' mt-2 text-center'>
                <small className=' text-danger'></small>
            </div> */}
            </div>
        </>
    )
}