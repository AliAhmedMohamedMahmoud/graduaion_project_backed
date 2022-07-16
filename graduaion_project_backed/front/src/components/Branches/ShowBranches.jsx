import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteBranch, getAll } from "../../Services/branch";
import { paginationaBaranches } from "./../../Services/branch";
import { useNavigate } from "react-router-dom";

export default function ShowBranches() {
  const [branches, setBranches] = useState([]);
  const [branchesCount, setBranchesCount] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  useEffect(() => {
    paginationaBaranches(1).then(({ data }) => {
      setBranches(data.record);
      
    });
  }, []);
  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };
  const whenclick = async () => {
    setShow(false);
    try {
      await deleteBranch(idToDelete);
      const {
        data: { record },
      } = await paginationaBaranches(currentPage);
      setBranches(record);
      
    } catch ({ response: { data, status } }) {
      if (status == 401) {
          navigate("/notAuthorized")
      }
  }
  };
  const pagesNumbers = () => {
    let out = [];
    for (let i = 1; i <= branchesCount; i++) {
      out.push(
        <li onClick={() => pagination(i)} className="page-item">
          <a href="#" className="page-link">
            {i}
          </a>
        </li>
      );
    }
    return out;
  };
  const pagination = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const {
      data: { record },
    } = await paginationaBaranches(pageNumber);
    setBranches(record);
  };
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { record, count },
        } = await paginationaBaranches(1);
        setBranches(record);
        setBranchesCount(count);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div className="col-sm-8">
                  <Link to={`/addBranch`} href="#" className=" btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </Link>
                </div>
                <div class="col-sm-4">
                  <div class="search-box">
                    <i class="material-icons">&#xE8B6;</i>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search&hellip;"
                    />
                  </div>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>
                    Branch
                  </th>
                </tr>
              </thead>
              <tbody>
                {branches.map(({ id, name, cityId }) => {
                  return (
                    <tr>
                      <td>{name}</td>
                      <td>
                        <Link
                          to={`/editBranch/${id}`}
                          href="#"
                          className="edit"
                          title="Edit"
                          data-toggle="tooltip"
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        <a
                          style={{ cursor: "pointer" }}
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          onClick={() => setIdValAndShow(id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="clearfix">
              {/* <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div> */}
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#">
                    <i className="fa fa-angle-double-left"></i>
                  </a>
                </li>
                {pagesNumbers()}
                <li className="page-item">
                  <a href="#" className="page-link">
                    <i className="fa fa-angle-double-right"></i>
                  </a>
                </li>
              </ul>
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
