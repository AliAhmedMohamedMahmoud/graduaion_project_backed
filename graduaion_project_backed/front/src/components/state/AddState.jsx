import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Add} from '../../Services/State'
export default function AddState(params) {

 function HandelAdd(){
    
 }
    return(
        <Form>
        <Form.Group className="mb-3 col-6 m-auto " controlId="formBasicEmail">
          <Form.Label>Satae Name</Form.Label>
          <Form.Control  type="text" placeholder="name" />         
        </Form.Group>
        <Button onClick={HandelAdd} variant="primary" >
          add
        </Button>
      </Form>
    )
}