import React, { useState } from 'react'
import { add } from '../../Services/Status'


export default function AddStatus() {
    const [Status, setStatus] = useState([])


    return (
        <div className="container">
           
           <form>

  <div className="form-outline mb-4">
  <label className="form-label w-25" for="form5Example1">Status Name</label>
    <input type="text" id="form5Example1" className="form-control" />
   
  </div>

 
 
  <button type="submit" className="btn btn-primary btn-block mb-4">Add Status</button>
</form>
        </div>
    )
}
