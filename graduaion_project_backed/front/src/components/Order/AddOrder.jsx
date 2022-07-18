import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getAll as getCities, getByStateId } from "../../Services/City";
import { getAll as getAllBranch } from "../../Services/branch";
import { getAll as getAllState, getStateWithCities } from "../../Services/State";
import { add } from "../../Services/Order";
import { decoder } from "../../common/theDecoder";
import { get } from '../../Services/WeightSetting'
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from "react-router-dom";
import validator from 'validator';

const token = localStorage.getItem("userToken")
let name;
let id;
if (token) {
  const { name: userName, id: userId } = decoder(token)
  id = userId;
  name = userName;
}


export default function AddOrder() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const [sellerName, setSellerName] = useState(
    token ? name : ""
  )
  const navigate = useNavigate();
  const [weghtAndCost, setWeghtAndCost] = useState({
    costInput: 0,
    weightInput: 0
  })
  const [tableError, setTableError] = useState("")

  let [Product, setProduct] = useState([]);

  let [ProductName, setProductName] = useState("");
  let [Quantity, setQuantity] = useState("");
  let [Weigth, setWeigth] = useState("");


  let [total, setTotal] = useState(0);
  let [City, setCity] = useState([{}]);
  let [CityCost, setCityCost] = useState(0);
  let [Payment, setPayment] = useState([]);
  let [Delivery, setDelivery] = useState([]);
  let [Shipping, setShipping] = useState([]);
  let [Branch, setBranch] = useState([]);
  let [State, setState] = useState([]);
  const [serverError, setserverError] = useState(null);


  let [error, setError] = useState({
    customerName: "",
    customerPhone: "",
    stateId: "",
    StatusId: "",
    cityId: "",
    Cost: ""
  });


  const [form, setForm] = useState({
    Cost: 0,
    CustomerName: "",
    CustomerPhone: 0,
    stateId: 0,
    StatusId: 1,
    cityId: 0,
    userId: token ? id : "",
    date: new Date()
  });


  const [WeightSetting, SetWeightSetting] = useState({
    deafultWeight: 0,
    deafultCost: 0,
    exreaCost: 0
  })
  useEffect(() => {
    get().then(
      ({ data }) => {
        SetWeightSetting({
          deafultWeight: data.deafultWeight,
          deafultCost: data.deafultCost,
          exreaCost: data.exreaCost
        })
      }
    )
  }, [])

  //when products array changes 
  //recalculate the weight and 
  //the costs
  useEffect(() => {
    const products = Product
    if (products.length == 0) {
      setWeghtAndCost({
        costInput: 0,
        weightInput: 0
      })
      setForm({
        ...form,
        Cost: 0
      })
    } else {
      console.log("asdasd");
      setWeghtAndCost({
        costInput: OrderCost(),
        weightInput: calcWeight()
      })
      setForm({
        ...form,
        Cost: OrderCost()
      })
    }
  }, [Product])



  const handleInput = (e) => {
    if (e.target.name == "cityId") {
      setCityCost(
        City.find((item) => {
          return item.id == e.target.value;
        })
      );
    }
    setForm({
      ...form,
      [e.target.name]:
        e.target.type == "number" || e.target.type == "select-one"
          ? +e.target.value
          : e.target.value,
    });
  };

  const whenSubmit = async () => {
    console.log(form);
    if (validate()) {
      try {
        await add(form);
        setShow(true)
        setTimeout(() => {
          navigate("/Orders")
        }, 1100)
      } catch (error) {
        console.log(error);
      }
    }
  };

  let whenProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  let whenQuantityChange = (e) => {
    setQuantity(+e.target.value);
  };

  let whenWeigthChange = (e) => {
    setWeigth(+e.target.value);
  };


  //when add product
  let whenClick = () => {

    // let [ProductName, setProductName] = useState("");
    // let [Quantity, setQuantity] = useState("");
    // let [Weigth, setWeigth] = useState("");


    //products form validation

    //ProductName==============
    if (ProductName == "") {
      setTableError("the product name is required")
      return;
    }

    if (Number(ProductName[0])) {
      setTableError("the product name can not start with number")
      return;
    }

    if (Number(ProductName)) {
      setTableError("the product name can not be only numbers")
      return;
    }

    //Quantity==============
    if (Quantity == "") {
      setTableError("the quantity is required")
      return;
    }

    if (!Number(Quantity)) {
      setTableError("the quantity must be only numbers")
      return;
    }

    //Weigth==============
    if (Weigth == "") {
      setTableError("the Weigth is required")
      return;
    }

    if (!Number(Weigth)) {
      setTableError("the Weigth must be only numbers")
      return;
    }

    //check if user selected city==============
    if (!CityCost) {
      setTableError("you must choose city")
      return;
    }


    //if valid

    setTableError("")
    setError({
      ...error,
      Cost: ""
    })

    // setProduct([
    //   ...Product,
    //   {
    //     id: generateId(),
    //     ProductName,
    //     Quantity,
    //     Weigth,
    //   },
    // ]);

    addProduct()

  };


  // get selectboxes Data
  useEffect(() => {
    (
      async function () {
        const { data } = await getAllState()
        setState(data)
      }
    )()
  }, [])

  useState(() => {
    (async function () {
      const data = await getAllBranch()
        .then((branch) => {
          setBranch(branch.data);
          console.log(branch.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);


  //calculations
  const calcWeight = () => {
    return Product.reduce((total, currentValue) => {
      return total + (currentValue.Weigth * currentValue.Quantity);
    }, 0);
  }

  let OrderCost = () => {
    var total = calcWeight()
    console.log(WeightSetting);
    if (total > 0 && total <= WeightSetting.deafultWeight) {
      return WeightSetting.deafultCost + CityCost.costPerCity;
    }
    if (total > WeightSetting.deafultWeight) {
      return (total - WeightSetting.deafultWeight) * WeightSetting.exreaCost + CityCost.costPerCity;
    }
  };


  const validate = () => {

    const errors = {
      Cost: "",
      customerName: "",
      customerPhone: "",
      stateId: "",
      ShipId: "",
      PayId: "",
      DeliveryId: "",
      cityId: "",
      isValid: true
    }

    if (form.CustomerName == "") {
      errors.customerName = "the name is required"
      errors.isValid = false
    } else if (!validator.isAlpha(form.CustomerName)) {
      errors.customerName = "the name  can only have letters"
      errors.isValid = false
    }


    //CustomerPhone
    if (form.CustomerPhone == "") {
      errors.CustomerPhone = "the phone is required"
      errors.isValid = false
    } else if (!Number(form.CustomerPhone)) {
      errors.CustomerPhone = "the phone can only contains numbers"
      errors.isValid = false
    } else if (form.CustomerPhone.length < 11) {
      errors.CustomerPhone = "the phone must be 11 digits"
      errors.isValid = false
    } else if (!["011", "012", "010"].includes(form.CustomerPhone.substring(0, 3))) {
      errors.CustomerPhone = "the phone must start with 011 012 010"
      errors.isValid = false
    }


    // stateId: "",
    if (form.stateId == 0) {
      errors.stateId = "you must choose state"
      errors.isValid = false
    }


    //   cityId: "",
    if (form.cityId == 0) {
      errors.cityId = "you must choose city"
      errors.isValid = false
    }

    //   cityId: "",
    if (!form.Cost) {
      errors.Cost = "you must add products"
      errors.isValid = false
    }


    setError(errors)

    if (errors.isValid) {
      return true
    }

  }




  const whenDelete = (product_name) => {
    const products = Product
    const out = products.filter((ele) => { return ele.ProductName != product_name })
    setProduct(out)
  }



  const addProduct = () => {

    const productsArr = [...Product]
    let finalProductState;
    const ElementExists = productsArr.find(ele => { return ele.ProductName == ProductName })

    if (ElementExists) {
      productsArr.forEach(ele => {
        if (ele.ProductName == ProductName) {
          ele.Quantity = (ele.Quantity + Quantity)
        }
      })
      finalProductState = productsArr
      setProduct(finalProductState)
      return;
    }

    productsArr.push({
      ProductName,
      Quantity,
      Weigth,
    })

    finalProductState = productsArr
    setProduct(finalProductState)
  }

  const whenStateChange = async (e) => {
    const { data } = await getByStateId(+e.target.value)
    setCity(data)
    setForm({
      ...form,
      stateId: +e.target.value
    })
  }
  return (
    <div className="order">
      <div className="container pt-5">
        <h1 className="mb-5">Add Order</h1>
        <div className="row">
          <div className=" col-6">
            <select
              name="DeliveryId"
              onChange={handleInput}
              class="form-select p-3"
              aria-label="Default select example"
            >
              <option selected>Delivery Type</option>
              <option value='On Branch' >On Branch</option>
              <option value='Clint House' >Clint House</option>
            </select>
            <div className="text-danger">{error.DeliveryId}</div>

          </div>
          <div class=" col-6">
            <input
              name="CustomerName"
              onChange={handleInput}
              type="text"
              class="form-control p-3"
              placeholder="Client Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <div className="text-danger">{error.customerName}</div>
          </div>
        </div>

        <div class=" mb-3">
          <input
            name="CustomerPhone"
            onChange={handleInput}
            type="text"
            class="form-control mt-3 p-3"
            placeholder="Client Phone"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div className="text-danger">{error.CustomerPhone}</div>
        </div>
        <div className="row">

          <div className="mb-3 col-6">
            <select
              onChange={whenStateChange}
              name="stateId"
              class="form-select p-3"
              aria-label="Default select example"
            >
              <option selected>Select Governorats</option>
              {State.map(({ id, name }) => {
                return <option className=" p-3" value={id}>{name}</option>;
              })}
            </select>
            <div className="text-danger">{error.stateId}</div>
          </div>

          <div className="mb-3 col-6">
            <select
              onChange={handleInput}
              name="cityId"
              class="form-select p-3"
              aria-label="Default select example"
            >
              <option selected>Select City</option>
              {City.map((city) => {
                return <option value={city.id}>{city.name}</option>;
              })}
            </select>
            <div className="text-danger">{error.cityId}</div>
          </div>
        </div>

        <div className="mb-3">
          <select
            name="PayId"
            onChange={handleInput}
            class="form-select mt-3 p-3"
            aria-label="Default select example"
          >
            <option selected>Select Payment</option>
            <option value='Hand To Hand'>Hand To Hand</option>
            <option value='Cash'>Cash</option>
            <option value='Visa'>Visa</option>
            <option value='Free'>Free</option>
          </select>
          <div className="text-danger">{error.PayId}</div>
        </div>

        <select
          name="ShipId"
          onChange={handleInput}
          class="form-select mt-3 p-3"
          aria-label="Default select example"
        >
          <option selected>Select Shipping</option>
          <option value='Hand To Hand'>Hand To Hand</option>
          <option value='BY vehicle'>BY vehicle</option>
          <option value='ON Demand'>ON Demand</option>
        </select>
        <div className="text-danger">{error.ShipId}</div>

        <select
          name="branchId"
          onChange={handleInput}
          class="form-select mt-3 p-3"
          aria-label="Default select example"
        >
          <option selected>Select Branch</option>
          {Branch.map((branch) => {
            return <option value={branch.id}>{branch.name}</option>;
          })}
        </select>
        <div className="text-danger">{error.branchId}</div>

        <hr></hr>
        <div className=" row">
          <div>
            <input
              type="text"
              name="ProductName"
              onChange={whenProductNameChange}
              className="form-control p-3 mb-2"
              placeholder="Product Name"
              required
            ></input>
          </div>
          <div>
            <input required type="number" placeholder="Quantity" className="form-control p-3 mb-2" name="Quantity" onChange={whenQuantityChange}></input>
          </div>
          <div>
            <input required type="number" placeholder="Weigth" className="form-control p-3 mb-2" name="Weigth" onChange={whenWeigthChange}></input>
          </div>
        </div>
        <button onClick={whenClick} className="btn btn-primary mb-3">
          Add product
        </button>
        <div>
          <small className=" text-danger" >{tableError}</small>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Weigth</th>
            </tr>
          </thead>
          <tbody>
            {Product.map((ele) => {
              return (
                <tr>
                  <td>{ele.ProductName}</td>
                  <td>{ele.Quantity}</td>
                  <td>{ele.Weigth}</td>
                  <td className=" text-center"><button onClick={() => whenDelete(ele.ProductName)} className=" btn btn-danger" >delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <hr></hr>
        <div class=" mb-3">
          <input
            name="Cost"
            onChange={handleInput}
            type="number"
            class="form-control mt-3 p-3"
            readOnly
            value={weghtAndCost.costInput}
            placeholder="Order Cost"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div>
            <small className=" text-danger">{error.Cost}</small>
          </div>
        </div>
        <div class=" mb-3">
          <input
            name="Total"
            type="number"
            class="form-control mt-3 p-3"
            readOnly
            value={weghtAndCost.weightInput}
            placeholder="Total Weigth"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div>
            <small className=" text-danger"></small>
          </div>
        </div>
        <div class=" mb-3">
          <input
            name="costPerCity"
            type="text"
            class="form-control mt-3 p-3"
            placeholder="Notes"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div>
            <small className=" text-danger"></small>
          </div>
        </div>
        <hr></hr>
        <div class=" mb-3">
          <input
            type="text"
            class="form-control mt-3 p-3"
            placeholder="Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={sellerName}
          />
          <div>
            <small className=" text-danger"></small>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="btn btn-success"
            onClick={whenSubmit}
            type="submit"
          >
            Save
          </button>
        </div>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>order added successfully</Modal.Body>
      </Modal>
    </div>
  );
}
