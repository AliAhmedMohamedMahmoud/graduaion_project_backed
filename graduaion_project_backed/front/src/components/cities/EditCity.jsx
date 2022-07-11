import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { getById, edit } from '../../Services/City';
import { fromBackendObjectToJsObject } from './cityConverters';
import { getAll } from "../../Services/State"
import { useNavigate } from "react-router-dom";
export default function EditCity() {

    const { id } = useParams()
    const [states, setStates] = useState([])
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
            const { data: city } = await getById(id)
            const { data: states } = await getAll()
            console.log(city);
            setStates(states)
            setForm(fromBackendObjectToJsObject(city))
        })()
    }, [])


    const whenSubmit = async () => {
        if (validate()) {
            try {
                console.log(form);
                await edit(id, form)
                navigate("/cities");
            } catch ({ response: { data: { detail } } }) {
                setserverError(detail)
            }
        }
    }


    const validate = () => {

        const errors = {
            name: "",
            costPerCity: "",
            stateId: "",
            isValid: true
        }
        
        const namePattern =/^([A-Z]|[a-z]){3,20}$/g

        if (form.name == "" || namePattern.test(form.name)==false) {
            errors.name = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }

        if (form.costPerCity <= 0 ) {
            errors.costPerCity = "enter a valid number"
            errors.isValid = false
        }

        if (form.stateId == 0) {
            errors.stateId = "u must choose a state"
            errors.isValid = false
        }

        setFormErros(errors)

        if (errors.isValid) {
            return true
        }

    }

    return (
        <div className="container pt-5">
            <h1 className='mb-5'>Edit city</h1>
            <div class=" mb-3">
                <input value={form.name} onChange={handleChange} name='name' type="text" class="form-control" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
            <div>
                <small className=' text-danger'>{formErrors.name}</small>
            </div>
            </div>
            <div class=" mb-3">
                <input value={form.costPerCity} onChange={handleChange} name='costPerCity' type="number" class="form-control" placeholder="city shipping cost" aria-label="Username" aria-describedby="basic-addon1" />
            <div>
                <small className=' text-danger'>{formErrors.costPerCity}</small>
            </div>
            </div>
            <select value={form.stateId} onChange={handleChange} name='stateId' class="form-select" aria-label="Default select example">
                <option value={0} selected>select state</option>
                {
                    states.map(({ id, name }) => {
                        return <option value={id}>{name}</option>
                    })
                }
            </select>
            <div>
                <small className=' text-danger'>{formErrors.stateId}</small>
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
