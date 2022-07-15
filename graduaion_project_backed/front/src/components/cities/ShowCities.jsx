import React, { useEffect, useState } from 'react'
import { deleteCity, getAllWithPagination } from '../../Services/City'
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'


export default function ShowCities() {
    const [cities, setCities] = useState([])
    const [citiesCount, setcitiesCount] = useState([])
    const [show, setShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null)
    const [currentPge, setCurrentPge] = useState(1)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setIdValAndShow = (id) => {
        setIdToDelete(id)
        setShow(true)
    }


    const whenclick = async () => {
        setShow(false)
        await deleteCity(idToDelete);
        const { data: { cities } } = await getAllWithPagination(currentPge)
        setCities(cities)
    }

    const renderPagesNumbers = () => {
        let out = []
        for (let i = 1; i <= citiesCount; i++) {
            out.push(<li onClick={() => handlePagination(i)} className="page-item"><a href="#" className="page-link">{i}</a></li>)
        }
        return out;
    }

    const handlePagination = async (pageNumber) => {
        setCurrentPge(pageNumber)
        const { data: { cities } } = await getAllWithPagination(pageNumber);
        setCities(cities)
    }

    useEffect(() => {
        (async function () {
            try {
                const { data: { cities, count } } = await getAllWithPagination(1);
                setCities(cities)
                setcitiesCount(count)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    return (
        <>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <Link to={`/addCity`} href="#" className=' btn btn-success' ><i className="fa-solid fa-plus"></i></Link>
                                </div>
                                <div className="col-sm-4">
                                    <div className="search-box">
                                        <i className="material-icons">&#xE8B6;</i>
                                        <input type="text" className="form-control" placeholder="Search&hellip;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>City <i className="fa fa-sort"></i></th>
                                    <th>Cost <i className="fa fa-sort"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map(({ id, name, costPerCity }) => {
                                    return (
                                        <tr>
                                            <td>{name}</td>
                                            <td>{costPerCity}</td>
                                            <td>
                                                <Link to={`/editCity/${id}`} href="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>
                                                <a style={{ cursor: "pointer" }} className="delete" title="Delete" data-toggle="tooltip" onClick={() => setIdValAndShow(id)}><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="clearfix">
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                                {renderPagesNumbers()}
                                <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
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





