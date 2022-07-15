import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { GetAll, GetNumberOfPages, Delete } from '../../Services/State'
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'
export default function ShowStates(params) {

    const [states, setStates] = useState([]);
    const [NumberOfPages, setNumberOfPages] = useState(0);
    const [PageIndex, setPageIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [deletee, setDelete] = useState(false);
    const handleClose = () => setShow(false);
    

    const navigate = useNavigate();
    const HelperARR = []
    useEffect(() => {
        GetAll(PageIndex + 1).then(
            ({ data }) => {
                setStates(data.record)
                setNumberOfPages(data.count)

            },
            (err) => { alert("errore while get state") }
        )
    }, [PageIndex])

    function HandelNew() {
        navigate("/addState")
    }
    function HandelPageination(par) {
        setPageIndex(par - 1);
    }
     async function HandelDelete(id) {

        alert("you are about to delete ");
       //  setShow(true);
      //   console.log(show);
    //    if(deletee)
         await  Delete(id);
        // navigate("/states")
        window.location.reload()
     //   else
      //  setShow(false) 
   
    }
    return (
        <>
            <div class="container">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2>States <b></b></h2></div>
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

                            </thead>
                            <tbody>

                                {states.map(({ name, id }, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <tr >
                                                <td>{name}</td>
                                                <td>
                                                    <a onClick={(event) => HandelDelete(id)} class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                                </td>
                                                <td>
                                                    <Link to={`/EditState/${id}`} href="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>{states.length}</b> out of {NumberOfPages}<b></b> entries</div>
                            <ul class="pagination">
                                {
                                    (() => new Array(Math.round(NumberOfPages / 2)).fill(0))().map((v, i) => {

                                        if (i == PageIndex) {
                                            return (
                                                <Fragment key={i}>
                                                    <li class="page-item  active"><a onClick={(event) => HandelPageination(i + 1)} class="page-link">{i + 1}</a></li>
                                                </Fragment>
                                            )
                                        }
                                        else {
                                            return (

                                                <Fragment key={i}>
                                                    <li class="page-item "><a onClick={(event) => HandelPageination(i + 1)} class="page-link">{i + 1}</a></li>
                                                </Fragment>
                                            )
                                        }
                                    })
                                }

                                <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-1 m-auto">

                    <button onClick={HandelNew} className='btn btn-success m-auto'>New</button>
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
                    <Button variant="primary" onClick={()=>{setDelete(true)}}>
                        yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}