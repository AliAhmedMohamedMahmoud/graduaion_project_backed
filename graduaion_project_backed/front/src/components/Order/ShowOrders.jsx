import React, { useEffect, useState, useCallback, useRef } from "react";
import { getAllOrder, deleteOrder, getByStatus } from "../../Services/Order";
import { getAll } from "../../Services/Status";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { decoder, user } from '../../common/baseUrl'

let role;
let userId;

if(user){
  role = decoder(localStorage.getItem("userToken")).role
  userId = decoder(localStorage.getItem("userToken")).id
}


export default function ShowOrderss() {
  const [Orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [State, setState] = useState([]);
  const handleClose = () => setShow(false);
  const [ordersAfterFilter, setordersAfterFilter] = useState([]);

  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };

  const [searchValue, setSearchValue] = useState("")
  const [statusValue, setStatusValue] = useState("")



  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const myOrders = Orders
    let searchFilter;
    if (statusValue) {
      searchFilter = myOrders.filter(ele => {
        return ele.customerName.includes(e.target.value) && ele.status == statusValue
      })
      setordersAfterFilter(searchFilter)
      return;
    }
    searchFilter = myOrders.filter(ele => {
      return ele.customerName.includes(e.target.value)
    })
    setordersAfterFilter(searchFilter)
  }



  const whenclick = async () => {
    setShow(false);
    await deleteOrder(idToDelete);
    window.location.reload();
    const { data } = await getAllOrder();
    setOrders(data);
  };

  useEffect(() => {
    (async function () {
      const { data: ordrs } = await getAllOrder()
      const { data: status } = await getAll()

      if (role == "seller") {
        setOrders(ordrs.filter(ele => {
          return ele.userId == userId
        }))
        setordersAfterFilter(ordrs.filter(ele => {
          return ele.userId == userId
        }));
      } else {
        setOrders(ordrs);
        setordersAfterFilter(ordrs);
      }

      setState(status);
    })()
  }, []);

  let whenChangeStatus = (status) => {
    setStatusValue(status)
    let filterOrder;
    if (searchValue) {
      filterOrder = Orders.filter(ele => {
        return ele.status == status && ele.customerName.includes(searchValue)
      })
      setordersAfterFilter(filterOrder);
      return
    }
    filterOrder = Orders.filter(ele => {
      return ele.status == status
    })
    setordersAfterFilter(filterOrder);
  };

  let whenAll = () => {
    const allOrders = Orders;
    setStatusValue("")
    setordersAfterFilter(allOrders)
  };



  return (
    <>
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="input-group mb-3">
                <input onChange={handleSearch} type="text" class="form-control" placeholder="Customer name" aria-label="Username" aria-describedby="basic-addon1" />
              </div>

              <div class="row">
                <div class="col-sm-4">
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover table-bOrdersed">
              <thead>
                <tr>
                  <th>
                    <button className=" btn btn-success" onClick={whenAll}>
                      All
                    </button>
                  </th>

                  {State.map(({ id, name }) => {
                    return (
                      <th>
                        <button
                          className=" btn btn-success"
                          onClick={() => whenChangeStatus(name)}
                        >
                          {name}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            </table>
            <table class="table table-striped table-hover table-bOrdersed">
              <thead>
                <tr>
                  <th>
                    id <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    name <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    phone <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Cost <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    City <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    State <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Status <i class="fa fa-sort"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordersAfterFilter.map(
                  ({
                    id,
                    customerName,
                    customerPhone,
                    cost,
                    city,
                    state,
                    status
                  }) => {
                    return (
                      <tr>
                        <td>{id}</td>
                        <td>{customerName}</td>
                        <td>{customerPhone}</td>
                        <td>{cost}</td>
                        <td>{city}</td>
                        <td>{state}</td>
                        <td>{status}</td>
                        <td style={role == "seller" ? { display: "none" } : { display: "block" }}>
                          <Link
                            to={`/editOrder/${id}`}
                            href="#"
                            class="edit"
                            title="Edit"
                            data-toggle="tooltip"
                          >
                            <i class="material-icons">&#xE254;</i>
                          </Link>
                          <a
                            style={{ cursor: "pointer" }}
                            class="delete"
                            title="Delete"
                            data-toggle="tooltip"
                            onClick={() => setIdValAndShow(id)}
                          >
                            <i class="material-icons">&#xE872;</i>
                          </a>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <div class="clearfix">
              <div class="hint-text">

              </div>

            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>are u sure u want to delete this item ??!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={whenclick}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
