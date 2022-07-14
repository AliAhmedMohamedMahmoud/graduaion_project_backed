import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getAll as getControllers } from "../../Services/Controller"
import { getAll as getPermissions } from "../../Services/permission"
import { useNavigate } from "react-router-dom";
import { addPermissionRoleController } from '../../Services/Roles';
import validator from 'validator';

export default function AddRole() {
    const navigate = useNavigate();
    const [pc, setPc] = useState({
        permissions: [],
        controllers: [],
        roleName: ""
    })

    const [Errors,setErrors]=useState({
        nameErr:"",
        roleErr:""
    })

    const [form, setForm] = useState({})

    useEffect(() => {
        (async function () {
            const { data: permissions } = await getPermissions()
            const { data: controllers } = await getControllers()
            setPc({
                ...pc,
                permissions,
                controllers
            })
            assignControllersToFormState(controllers)
        }
        )()
    }, [])


    const whenSubmit = async () => {
        if (validate()) {
            const { arr: emptyIdsArray, hasEmptyArr } = checkIfIncludesEmptyArray()
            const finalStateToSend = filterEmptyBeforeSend(emptyIdsArray)
            setForm(finalStateToSend)
            try {
                if (hasEmptyArr) {
                    await addPermissionRoleController(finalStateToSend)
                } else {
                    await addPermissionRoleController(form)
                }
                navigate("/cities")
            } catch (err) {
                console.log(err);
            }
        }
    }


    const handleChange = ({ target: myInput }, controllerId, permissionId) => {
        if (myInput.checked) {
            add(controllerId, permissionId)
            return;
        }
        remove(controllerId, permissionId)
    }

    const add = (controllerId, permissionId) => {
        const myForm = form
        const myArr = myForm.permissionMat[controllerId]
        myForm.permissionMat[controllerId] = [...myArr, permissionId]
        setForm({ ...myForm })
    }

    const remove = (controllerId, permissionId) => {
        const myForm = form
        const myArr = myForm.permissionMat[controllerId]
        myForm.permissionMat[controllerId] = [...myArr.filter(ele => { return ele !== permissionId })]
        setForm({ ...myForm })
    }


    const assignControllersToFormState = (controllers) => {
        const initialForm = {
            permissionMat: {

            },
            roleName: ""
        }
        controllers.forEach(({ id }) => {
            initialForm.permissionMat[id] = []
        })
        setForm(initialForm)
    }


    const checkIfIncludesEmptyArray = () => {
        let out = {
            arr: [],
            hasEmptyArr: false
        }
        for (const property in form["permissionMat"]) {
            if (form["permissionMat"][property].length == 0) {
                out.arr.push(+property)
                out.hasEmptyArr = true
            }
        }
        return out;
    }

    const filterEmptyBeforeSend = (emptyIdsArr) => {
        const myForm = form
        const ArraysObj = myForm.permissionMat;
        let out = {}

        //extract non-empty arrays
        for (const prop in ArraysObj) {
            if (!emptyIdsArr.includes(+prop)) {
                out[prop] = ArraysObj[prop]
            }
        }

        myForm.permissionMat = out;
        return myForm
    }


    const formIsEmpty = () => {
        const myForm = form
        for (const prop in myForm.permissionMat) {
            if (myForm.permissionMat[prop].length !== 0) {
                return false;
            }
        }
        return true;
    }


    const handleChangeName = (e) => {
        setForm({
            ...form,
            roleName: e.target.value
        })
    }



    const validate = () => {
        let nameError = "";
        let roleErorr = ""

        if (!validator.isAlpha(form.roleName)) {
            nameError = "the name is required and must be  only letters"
        }


        if (formIsEmpty()) {
            console.log("object");
            roleErorr = "u must choose permission"
        }

        setErrors({
            ...Errors,
            nameErr:nameError,
            roleErr:roleErorr
        })

        if (nameError.length == 0 && roleErorr.length == 0) {
            return true
        }
    }


    return (
        <div className="container">
            <div className="table-responsive">
                <div className="table-wrapper py-5 px-5">
                    <div className="table-title">
                        <div class="input-group mb-3 w-75 mx-auto" >
                            <div class="input-group-prepend">
                                <button onClick={whenSubmit} class="btn btn-outline-secondary" type="button">Add Role</button>
                            </div>
                            <input onChange={handleChangeName} type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                        </div>
                        <div className='w-75 mx-auto'>
                            <small className=' text-danger'>{Errors.nameErr}</small>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th className=' text-center'>Page</th>
                                {pc.permissions.map(({ id, name }) => { return <th className=' text-center'>{name}</th> })}
                            </tr>
                        </thead>
                        <tbody>
                            {pc.controllers.map(({ id: controllerId, name }) => {
                                return <tr>
                                    {
                                        <td className='text-center'>{name}</td>
                                    }
                                    {pc.permissions.map(({ id: permissionId, name }) => { return <td className=' text-center'><input onChange={(e) => handleChange(e, controllerId, permissionId)} type="checkbox" /></td> })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className='w-75 mx-auto'>
                        <small className=' text-danger'>{Errors.roleErr}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
