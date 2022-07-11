import React, { useEffect, useState } from 'react'
import { getAll, deleteCity } from '../../Services/City'
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'

export default function ShowCities() {
    const [cities, setCities] = useState([])
    const [show, setShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setIdValAndShow = (id) => {
        setIdToDelete(id)
        setShow(true)
    }


    const whenclick = async () => {
        setShow(false)
        await deleteCity(idToDelete);
        const { data } = await getAll()
        setCities(data)
    }


    useEffect(() => {
        getAll()
            .then(({ data }) => {
                setCities(data)
            })
    }, [])
    return (
        <>
            <div class="container">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8">
                                    <Link to={`/addCity`} href="#" className=' btn btn-success' ><i class="fa-solid fa-plus"></i></Link>
                                </div>
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
                                    <th>Cost <i class="fa fa-sort"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map(({ id, name, costPerCity }) => {
                                    return (
                                        <tr>
                                            <td>{name}</td>
                                            <td>{costPerCity}</td>
                                            <td>
                                                <Link to={`/editCity/${id}`} href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></Link>
                                                <a style={{ cursor: "pointer" }} class="delete" title="Delete" data-toggle="tooltip" onClick={() => setIdValAndShow(id)}><i class="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul class="pagination">
                                <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
                                <li class="page-item"><a href="#" class="page-link">1</a></li>
                                <li class="page-item"><a href="#" class="page-link">2</a></li>
                                <li class="page-item active"><a href="#" class="page-link">3</a></li>
                                <li class="page-item"><a href="#" class="page-link">4</a></li>
                                <li class="page-item"><a href="#" class="page-link">5</a></li>
                                <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
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
    )
}





