import React, { useEffect, useState } from 'react'
import { getAll } from '../../Services/branch'
import { paginationaBaranches } from './../../Services/branch';

export default function ShowBranches() {
    const [branches, setBranches] = useState([])
    const [branchesCount, setBranchesCount] = useState([])
    const [show, setShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        paginationaBaranches(1)
            .then(({ data }) => {
                setBranches(data.record)
            })
    }, [])
    const pagesNumbers = () => {
        let out = []
        for (let i = 1; i <= branchesCount; i++) {
            out.push(<li onClick={() => pagination(i)} className="page-item"><a href="#" className="page-link">{i}</a></li>)
        }
        return out;
    }
    const pagination = async (pageNumber) => {
        setCurrentPage(pageNumber)
        const { data: { record } } = await paginationaBaranches(pageNumber);
        setBranches(record)
    }
    useEffect(() => {
        (async  ()=> {
            try {
                const { data: { record, count } } = await paginationaBaranches(1);
               setBranches(record)
                setBranchesCount(count)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    return (
        <>
            <div class="container">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2>Customer <b>Details</b></h2></div>
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
                                {branches.map(({ name, cityId }) => {
                                    return (
                                        <tr>
                                            <td>{name}</td>
                                            <td>{cityId}</td>
                                            <td>
                                                <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                                <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="clearfix">
                            {/* <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div> */}
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                                {pagesNumbers()}
                                <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
