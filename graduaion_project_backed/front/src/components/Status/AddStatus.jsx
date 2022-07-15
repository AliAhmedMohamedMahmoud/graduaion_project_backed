import { render } from "@testing-library/react";
import React, { useState } from "react";
import axios from "axios";
import { add } from "../../Services/Status";
import { useNavigate } from 'react-router-dom';

function AddStatus(props) {
  const [Name, SetName] = useState({ Name: "" });
  const navigate = useNavigate();

  const [formErrors, setformErrors] = useState({});

  const validate = () => {
    const errors = {
      Name: "",
      isValid: true,
    };

    const namePattern =/^([A-Z]|[a-z]){3,20}$/g
    if (Name.Name == "" || namePattern.test(Name.Name)==false) {
      errors.Name = "name is required and must be between 3 and 20";
      errors.isValid = false;
    }



    setformErrors(errors);

    if (errors.isValid) {
      return true;
    }
  };

  const  insertStatus = async (e) => {
    e.preventDefault();
    if (validate()) {
     await add(Name);
      navigate("/Statuses");
    }
  };
  const onchange = (e) => {
    SetName({ Name: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={insertStatus}>
        <div className="form-outline mb-4">
          <label className="form-label" for="form5Example1">
            Status Name
          </label>
          <input
            type="text"
            id="form5Example1"
            className="form-control w-50"
            onChange={onchange}
          />
          <div className="text-danger">{formErrors.Name}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Add Status
        </button>
      </form>
    </div>
  );
}

export default AddStatus;
