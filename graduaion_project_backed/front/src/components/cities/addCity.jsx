import React, { useState } from 'react'
import { add } from '../../Services/City'
import { getAll } from "../../Services/State"
import { useNavigate } from "react-router-dom";
import validator from 'validator';
export default function AddCity() {

    const navigate = useNavigate();
    const [states, setStates] = useState([])
    const [serverError,setserverError]=useState(null)
    const [form, setForm] = useState({
        name: "",
        costPerCity: 0,
        stateId: 0,
    })



    const [formErrors, setformErrors] = useState({
        name: "",
        costPerCity: "",
        stateId: "",
    })


    const handleChange = (e) => {
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
            costPerCity: "",
            stateId: "",
            isValid: true
        }




        if(!validator.isAlpha(form.name)){
            errors.name = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }


        if (form.costPerCity == 0) {
            errors.costPerCity = "costPerCity is required"
            errors.isValid = false
        }

        if (form.stateId == 0) {
            errors.stateId = "u must choose a state"
            errors.isValid = false
        }

        setformErrors(errors)

        if (errors.isValid) {
            return true
        }

    }

    const whenSubmit = async () => {
        if (validate()) {
            try{
                await add(form)
                navigate("/cities")
            }catch({response:{data:{detail}}}){
                setserverError(detail)
            }
        }
    }

    return (
        <div className="container pt-5">
            <h1 className='mb-5'>Add city</h1>
            <div class=" mb-3">
                <input onChange={handleChange} name='name' type="text" class="form-control" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
                <div>
                    <small className=' text-danger'>{formErrors.name}</small>
                </div>
            </div>
            <div class=" mb-3">
                <input onChange={handleChange} name='costPerCity' type="number" class="form-control" placeholder="city shipping cost" aria-label="Username" aria-describedby="basic-addon1" />
                <div>
                    <small className=' text-danger'>{formErrors.costPerCity}</small>
                </div>
            </div>
            <select onChange={handleChange} name='stateId' class="form-select" aria-label="Default select example">
                <option selected>select state</option>
                {states.map(({ id, name }) => {
                    return <option value={id}>{name}</option>
                })}
            </select>
            <div>
                <small className=' text-danger'>{formErrors.stateId}</small>
            </div>
            <div className='mt-5'>
                <button onClick={whenSubmit} className='btn btn-success' type='submit'>add</button>
            </div>
            <div className=' mt-2 text-center'>
                <small className=' text-danger'>{serverError}</small>
            </div>
        </div>
    )
}
