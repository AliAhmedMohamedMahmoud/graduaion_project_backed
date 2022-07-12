import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getAll } from "../../Services/City"
import { getById, editBranch } from '../../Services/branch';
import { fromBackendObjectToJsObject } from './cityConverters';

export default function EditBranch() {
    const { id } = useParams()
    const [cities, setStates] = useState([])
    const [form, setForm] = useState({})
    const [formErrors, setFormErros] = useState({})
    const [serverError, setserverError] = useState(null)
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: (
                e.target.type == "number" ||
                e.target.type == "select-one"
            ) ? +e.target.value : e.target.value
        })
    }


    useState(() => {
        (async function () {
            const { data: branch } = await getById(id)
            const { data: cities } = await getAll()
            console.log(branch);
            setStates(cities)
            setForm(fromBackendObjectToJsObject(branch))
        })()
    }, [])


    const whenSubmit = async () => {
        if (validate()) {
            try {
                console.log(form);
                await editBranch(id, form)
                navigate("/branches");
            } catch ({ response: { data: { detail } } }) {
                setserverError(detail)
            }
        }
    }


    const validate = () => {

        const errors = {
            name: "",
            cityId: "",
            isValid: true
        }
        
        const namePattern =/^([A-Z]|[a-z]){3,20}$/g

        if (form.name == "" || namePattern.test(form.name)==false) {
            errors.name = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }


        if (form.cityId == 0) {
            errors.cityId = "u must choose a city"
            errors.isValid = false
        }

        setFormErros(errors)

        if (errors.isValid) {
            return true
        }

    }

    return (
        <div className="container pt-5">
            <h1 className='mb-5'>Edit Branch</h1>
            <div class=" mb-3">
                <input value={form.name} onChange={handleChange} name='name' type="text" class="form-control" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
            <div>
                <small className=' text-danger'>{formErrors.name}</small>
            </div>
            </div>
            <select value={form.cityId} onChange={handleChange} name='cityId' class="form-select" aria-label="Default select example">
                <option value={0} selected>Select City</option>
                {
                    cities.map(({ id, name }) => {
                        return <option value={id}>{name}</option>
                    })
                }
            </select>
            <div>
                <small className=' text-danger'>{formErrors.cityId}</small>
            </div>
            <div className='mt-5'>
                <button onClick={whenSubmit} className='btn btn-success w-25 text-center' type='submit'>Edit</button>
            </div>
            <div>
                <small className=' text-danger'>{serverError}</small>
            </div>
        </div>
    )
}
