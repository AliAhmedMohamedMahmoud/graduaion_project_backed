import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, edit } from "../../Services/Status";

import { useNavigate } from "react-router-dom";
export default function EditStatus() {
    const { id } = useParams()
  const[Name,setName]=useState("")
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value)
}
useEffect(()=>{
    getById(id).then(data=>{
        setName(data.data.name)
    })

},[])
 
  const whenSubmit=(e)=>{
    e.preventDefault();
    edit(id,{name:Name})
    navigate("/Statuses");

  };

  

  return (
    <div className="container pt-5">
      <h1 className="mb-5">Edit Status</h1>
      <div class=" mb-3">
        <input
          value={Name}
          onChange={handleChange}
          name="name"
          type="text"
          class="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <div>
        
        </div>
      </div>
      <button
        onClick={whenSubmit}
        className="btn btn-success w-25 text-center"
        type="submit"
      >
        Edit
      </button>
    </div>
  );
}
