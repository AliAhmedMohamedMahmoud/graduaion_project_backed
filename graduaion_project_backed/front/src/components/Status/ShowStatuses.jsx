import React, { useEffect, useState } from "react";
import { getAll, deleteStatus } from "../../Services/Status";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function ShowStatuses() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [show, setShow] = useState(false);
  const [DeleteId, setDeletedId] = useState(null);

  const setIdValAndShow = (id) => {
    setDeletedId(id);
    setShow(true);
  };
  const whenclick = async () => {
    setShow(false);
    try {
      await deleteStatus(DeleteId);
      const { data } = await getAll();
      setStatuses(data);
      navigate("/Statuses");
    } catch ({ response: { data, status } }) {
      if (status == 401) {
        navigate("/notAuthorized");
      }
    }

  };

  useEffect(() => {
    console.log("called ");
    getAll().then(({ data }) => {
      setStatuses(data);
    });
  }, []);

  return (
    <>
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-8">
                  <Link to={`/AddStatus`} href="#" className=" btn btn-success">
                    <i class="fa-solid fa-plus"></i>
                  </Link>
                </div>
                <div class="col-sm-4"></div>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  Status Id <i class="fa fa-sort"></i>
                </th>
                <th>
                  Name <i class="fa fa-sort"></i>
                </th>
                <th>
                  Delete<i class="fa fa-sort"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {statuses.map(({ id, name }) => {
                return (
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>
                      <Link to={`/EditStatus/${id}`} href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></Link>
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>are u sure u want to delete this item ??!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={whenclick}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
