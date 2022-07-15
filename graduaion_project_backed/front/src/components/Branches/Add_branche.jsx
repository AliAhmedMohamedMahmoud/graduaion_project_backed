import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { add } from '../../Services/branch';
import { getAll } from "../../Services/City"

export default function Add_branche() {
    const navigate = useNavigate();
    const [states, setStates] = useState([])
    const [serverError, setserverError] = useState(null)
    const [form, setForm] = useState({
        name: "",
        cityId: 0,
    })

    const [formErrors, setformErrors] = useState({
        name: "",
        cityId: "",
    })


    const handleChange = (e) => {
        console.log(e.target.type);
        setForm({
            ...form,          //if input is select or number convert it to number
            [e.target.name]: (e.target.type == "number" || e.target.type == "select-one") ? +e.target.value : e.target.value
        })
    }



    useState(() => {
        (async function () {
            const data = await getAll()
            setStates(data.data)
        })()
    }, [])

    const validate = () => {

        const errors = {
            name: "",
            cityId: "",
            isValid: true
        }

        if (form.name == "") {
            errors.name = "name is required"
            errors.isValid = false
        }

        if (form.cityId == 0) {
            errors.cityId = "u must choose a city"
            errors.isValid = false
        }

        setformErrors(errors)

        if (errors.isValid) {
            return true
        }

    }

    const whenSubmit = async () => {
        if (validate()) {
            try {
                await add(form)
                navigate("/branches")
            } catch ({ response: { data: { detail } } }) {
                setserverError(detail)
            }
        }
    }

    return (
        <div className="container pt-5">
            <h1 className='mb-5'>Add Branch</h1>
            <div class=" mb-3">
                <input onChange={handleChange} name='name' type="text" class="form-control" placeholder="Branch Name" aria-label="Username" aria-describedby="basic-addon1" />
                <div>
                    <small className=' text-danger'>{formErrors.name}</small>
                </div>
            </div>
            <select onChange={handleChange} name='cityId' class="form-select" aria-label="Default select example">
                <option selected>select City</option>
                {states.map(({ id, name }) => {
                    return <option value={id}>{name}</option>
                })}
            </select>
            <div>
                <small className=' text-danger'>{formErrors.cityId}</small>
            </div>
            <div className='mt-5'>
                <button onClick={whenSubmit} className='btn btn-success' type='submit'>Add Branch</button>
            </div>
            <div className=' mt-2 text-center'>
                <small className=' text-danger'>{serverError}</small>
            </div>
        </div>
    )
}


