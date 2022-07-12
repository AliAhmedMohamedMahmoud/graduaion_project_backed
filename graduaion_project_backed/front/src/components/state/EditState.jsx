import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Edit,GetById} from '../../Services/State'
import validator from 'validator';
import { useParams ,useNavigate } from "react-router-dom";
export default function EditState(params) {

    const [name,setName]= useState("");
    const [isValid,setIsvalid]= useState(true);
    const { id } = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(id);
        GetById(id).then(
        ({data})=>{setName(data.name)},
        (er)=>{alert(er)}
        
      )
    },[])
    function HandelEdit(params) {
        if( validator.isAlpha(name)&& !validator.isEmpty(name))
        {
            Edit(id,name);
            navigate("/ShowState")

        }
        else
        setIsvalid(false);
    }
    function handelInput(e) {
        setName(e.target.value);
        console.log(e.target.value);
        setIsvalid(true);
       }
    return(
        <Form>
        <Form.Group className="mb-3 col-6 m-auto " controlId="formBasicEmail">
          <Form.Label>Satae Name</Form.Label>
          <Form.Control  onChange={handelInput} type="text" placeholder="name" value={name} />    
          {
            !isValid ? <small id="emailHelp" class="form-text text-muted">please enter valid name </small>
             : null 
          }     
        </Form.Group>
        <Button onClick={HandelEdit} variant="primary" >
          Save
        </Button>
      </Form>
    )
}