import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Add} from '../../Services/State'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
export default function AddState(params) {

  const [name,setName]= useState("");
  const [isValid,setIsvalid]= useState(true);
  const navigate = useNavigate();
 function HandelAdd(){
  if( validator.isAlpha(name)&& !validator.isEmpty(name)){
   Add(name);
   navigate("/states");
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
          <Form.Control  onChange={handelInput} type="text" placeholder="name" />    
          {
            !isValid ? <small id="emailHelp" class="form-text text-muted">please enter valid name </small>
             : null 
          }     
        </Form.Group>
        <Button onClick={HandelAdd} variant="primary" >
          add
        </Button>
      </Form>
    )
}