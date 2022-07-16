import React, { useEffect, useState, useCallback, useRef } from "react";
import { getAllOrder, deleteOrder, getByStatus } from "../../Services/Order";
import { getAll } from "../../Services/Status";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "../Order/SearchBar";
import { useNavigate } from "react-router-dom";
export default function ShowOrderss() {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [State, setState] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const order = useRef([]);
  const [filteredOrder, setFilteredOrder] = useState([]);

  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };

  //////// search
  async function getOrders() {
    const orderData = await getAllOrder();
    console.log(orderData);
    setOrders(orderData.sort((a, b) => a.Orders.localeCompare(b.Orders)));
    setFilteredOrder(Orders.current);
  }

  useEffect(() => {
    getOrders();
  }, []);

  const onSearchSubmit = useCallback(
    async (term) => {
      if (term) {
        const o = Orders.filter((Orders) =>
          Orders.customerName.toLowerCase().includes(term)
        );
        setFilteredOrder(o);
      } else {
        setFilteredOrder(Orders);
      }
      console.log(Orders);
    },
    [Orders]
  );

  const whenclick = async () => {
    setShow(false);
    await deleteOrder(idToDelete);
    window.location.reload();
    const { data } = await getAllOrder();
    setOrders(data);
  };

  useEffect(() => {
    getAllOrder().then(({ data }) => {
      setOrders(data);
      setFilteredOrder(data);
    });

    getAll().then(({ data }) => {
      console.log(data);
      setState(data);
    });
  }, []);
  let SentId = (id) => {
    console.log(id);
    getByStatus(id, 1).then(({ data }) => {
      setOrders(data.value);
      setFilteredOrder(data.value);
    });
  };
  let SentAll = () => {
    getAllOrder().then(({ data }) => {
      setOrders(data);
      setFilteredOrder(data);
    });
  };
  return (
    <>
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-4">
                  <React.Fragment>
                    <SearchBar onSubmit={onSearchSubmit} />
                  </React.Fragment>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover table-bOrdersed">
              <thead>
                <tr>
                  <th>
                    <button className=" btn btn-success" onClick={SentAll}>
                      All
                    </button>
                  </th>

                  {State.map(({ id, name }) => {
                    return (
                      <th>
                        <button
                          className=" btn btn-success"
                          onClick={() => SentId(id)}
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
                    Governorat <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Status <i class="fa fa-sort"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrder.map(
                  ({
                    id,
                    customerName,
                    customerPhone,
                    cost,
                    cityName,
                    stateName,
                    statusName,
                  }) => {
                    return (
                      <tr>
                        <td>{id}</td>
                        <td>{customerName}</td>
                        <td>{customerPhone}</td>
                        <td>{cost}</td>
                        <td>{cityName}</td>
                        <td>{stateName}</td>
                        <td>{statusName}</td>

                        <td>
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
