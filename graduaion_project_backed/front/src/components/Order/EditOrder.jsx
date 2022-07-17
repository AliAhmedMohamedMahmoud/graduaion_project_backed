import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, edit } from "../../Services/Order";
import { getAll as getAllState } from "../../Services/State";
import { getAll } from "../../Services/City";
import { getAll as getAllStatus } from "../../Services/Status";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { decoder } from '../../common/baseUrl'
import Modal from 'react-bootstrap/Modal';
export default function EditOrder() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { id } = useParams();
    const [City, setCity] = useState([]);
    const [states, setStates] = useState([]);
    const [Status, setStatus] = useState([]);
    const navigate = useNavigate();

    const [ShippmentInfo, setShippmentInfo] = useState({
        delivery: "",
        shipping: "",
        payMent: ""
    });

    const [error, setError] = useState({
        CustomerName: "",
        CustomerPhone: ""

    });

    function HandelINputShipmentInfo(e) {
        setShippmentInfo(
            {
                ...ShippmentInfo,
                [e.target.name]: e.target.value
            }
        )
    }


    let [Order, setOrder] = useState({
        cost: 0,
        customerName: "",
        customerPhone: 0,
        stateId: 0,
        statusId: 0,
        cityId: 0,
        userId: ""
    });




    const handleInput = (e) => {
        setOrder({
            ...Order,
            [e.target.name]:
                e.target.type == "number" || e.target.type == "select-one"
                    ? +e.target.value
                    : e.target.value,
        });

        setError({
            CustomerName: "",
            CustomerPhone: ""
        })
    };
    useState(() => {
        (async function () {

            const { data: City } = await getAll();
            const { data: states } = await getAllState();
            const { data: Status } = await getAllStatus();
            //   const { data: Shipping } = await getAllShipping();
            //   const { data: Payment } = await getAllPayment();
            //   const { data: Delivery } = await getAllDelivery();

            setStates(states);
            setCity(City);
            setStatus(Status);

        })();
    }, []);

    useEffect(() => {
        getById(id)
            .then((Data) => {
                // setOrder(Data.data);
                setOrder({
                    ...Data.data,
                    userId: decoder(localStorage.getItem("userToken")).id
                })

            })
            .catch((error) => {
                console.log(error);
            });

        console.log("d", decoder(localStorage.getItem("userToken")));

    }, []);


    function IsValidData() {
        if (!validator.isAlpha(Order.customerName) || validator.isEmpty(Order.customerName)) {
            setError({
                ...error,
                CustomerName: " please Enter Valid user Name"
            })
            console.log(Order.customerName);
            return false;
        }

        if (!validator.isMobilePhone(Order.customerPhone + '', ['ar-EG'], { strictMode: false }) || validator.isEmpty(Order.customerPhone + '')) {
            setError({
                ...error,
                CustomerPhone: " please Enter Valid user phone"
            })
            return false;
        }

        return true;
    }
    const whenSubmit = async () => {
        if (IsValidData()) {
            Order.customerPhone = +Order.customerPhone
            await edit(id, Order);
            setShow(true)
            setTimeout(()=>{
              navigate("/Orders")
            },1100)
        }
    };
    return (
        <>
            <div className="container pt-5">
                <div class=" mb-3">
                    <label>customerName</label>
                    <input
                        name="customerName"
                        Value={Order.customerName}
                        onChange={handleInput}
                        type="text"
                        class="form-control mt-3"
                        placeholder="Client Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <div className="text-danger">{error.CustomerName}</div>
                </div>

                <div class=" mb-3">
                    <label>customerPhone</label>
                    <input
                        name="customerPhone"
                        Value={Order.customerPhone}
                        onChange={handleInput}
                        type="Phone"
                        class="form-control mt-3"
                        placeholder="Client Phone"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <div className="text-danger">{error.CustomerPhone}</div>
                </div>

                <label>State</label>
                <select
                    value={Order.stateId}
                    onChange={handleInput}
                    name="stateId"
                    class="form-select"
                    aria-label="Default select example"
                >

                    {states.map(({ id, name }) => {
                        return <option value={id}>{name}</option>;
                    })}
                </select>
                <div></div>
                <label>City</label>

                <select
                    value={Order.cityId}
                    onChange={handleInput}
                    name="cityId"
                    class="form-select"
                    aria-label="Default select example"
                >

                    {City.map(({ id, name }) => {
                        return <option value={id}>{name}</option>;
                    })}
                </select>
                <div></div>
                <label>Payment</label>

                <select

                    name="payment"
                    onChange={HandelINputShipmentInfo}
                    class="form-select mt-3"
                    aria-label="Default select example"
                >

                    <option value='Hand To Hand'>Hand To Hand</option>
                    <option value='Cash'>Cash</option>
                    <option value='Visa'>Visa</option>
                    <option value='Free'>Free</option>
                </select>
                <div></div>
                <label>Shipping</label>

                <select
                    name="shipping"
                    onChange={HandelINputShipmentInfo}
                    class="form-select mt-3"
                    aria-label="Default select example"
                >

                    <option value='Hand To Hand'>Hand To Hand</option>
                    <option value='BY vehicle'>BY vehicle</option>
                    <option value='ON Demand'>ON Demand</option>
                </select>
                <div></div>
                <label>Delivery</label>

                <select
                    name="delivery"
                    onChange={HandelINputShipmentInfo}
                    class="form-select mt-3"
                    aria-label="Default select example"
                >

                    <option value='On Branch' >On Branch</option>
                    <option value='Clint House' >Clint House</option>
                </select>
                <div></div>
                <label>Status</label>
                <select
                    value={Order.statusId}
                    name="statusId"
                    onChange={handleInput}
                    class="form-select mt-3"
                    aria-label="Default select example"
                >
                    <option selected>Select Status</option>
                    {Status.map((status) => {
                        return <option value={status.id}>{status.name}</option>;
                    })}
                </select>
                <label>Cost</label>

                <div class=" mb-3">
                    <input
                        value={Order.cost}
                        name="cost"
                        onChange={handleInput}
                        type="number"
                        class="form-control mt-3"
                        readOnly
                        aria-describedby="basic-addon1"
                    />
                    <div>
                        <small className=" text-danger"></small>
                    </div>
                </div>

                <div className="mt-5">
                    <button
                        onClick={whenSubmit}
                        className="btn btn-success w-25 text-center"

                    >
                        Edit
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>order updated successfully</Modal.Body>
            </Modal>
        </>
    );
}
