import React, { useState } from 'react'
import { add } from '../../Services/City'
import {getAll} from "../../Services/State"

export default function AddCity() {
    const [city,setCity]=useState([])

    return (
        <div className="container">
            <form action="">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" placeholder="city shipping cost" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <select class="form-select" aria-label="Default select example">
                    <option selected>select state</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </form>
        </div>
    )
}
