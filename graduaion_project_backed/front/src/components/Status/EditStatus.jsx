import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, edit } from "../../Services/Status";
import validator from 'validator';

import { useNavigate } from "react-router-dom";
export default function EditStatus() {
  const { id } = useParams()
  const [Name, setName] = useState("")
  const navigate = useNavigate();
  const [formErrors, setformErrors] = useState({});

  const handleChange = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    getById(id).then(data => {
      setName(data.data.name)
    })
  }, [])

  const whenSubmit = async () => {
    if (validate()) {
      try {
        await edit(id, { name: Name })
        navigate("/Statuses");
      } catch ({ response: { data, status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }
    }
  };

  const validate = () => {
    const errors = {
      Name: "",
      isValid: true,
    };

    if (!validator.isAlpha(Name)) {
      errors.Name = "the name is required and can only contain letters";
      errors.isValid = false;
    }

    setformErrors(errors);

    if (errors.isValid) {
      return true;
    }
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
          required
        />
        <div>
          <small className=" text-danger" >{formErrors.Name}</small>
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
