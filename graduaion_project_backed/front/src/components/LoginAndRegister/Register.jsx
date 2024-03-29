
import { Fragment, useEffect, useState } from 'react';
import { getAll } from '../../Services/Roles';
import { useNavigate } from "react-router-dom";
import { register } from '../../Services/LogIn&Register'
import validator from 'validator';
import "./Register.css";
export default function Register() {
  const navigate = useNavigate();
  const [Roles, setRoles] = useState([]);

  //custom error msg
  const [userNameError, SetuserNameError] = useState("")
  const [passwordError, SetpasswordError] = useState("")
  const [ConfirmPasswordError, SetConfirmPasswordError] = useState("")


  const [userName, SetUserName] = useState("")
  const [password, Setpassword] = useState("")
  const [ConfirmPassword, SetConfirmPassword] = useState("")
  const [RoleName, SetRoleName] = useState("")

  const [IsValiduserName, SetIsValidUserName] = useState(true)
  const [IsValidpassword, SetIsValidpassword] = useState(true)
  const [IsValidConfirmPassword, SetIsValidConfirmPassword] = useState(true)
  const [IsSelectedRole, SetIsSelectedRole] = useState(false)


  const [ServerErrors, SetServerErrors] = useState("")
  const [ISServerErrors, SetIsServerErrors] = useState(false)
  let nav = useNavigate();
  function HandleRegister(params) {
    if (!validator.isAlpha(userName) || validator.isEmpty(userName) && validator.isEmpty(password)&& validator.isEmpty(ConfirmPassword)) {
      SetIsValidUserName(false);
      SetIsValidpassword(false);
      SetIsValidConfirmPassword(false);

      SetuserNameError("UserName is required ")
      SetpasswordError("Password is required ")
      SetConfirmPasswordError("Confirm Password is required ")
      return;
    }
    if (!validator.isAlpha(userName) || validator.isEmpty(userName)) {
      SetIsValidUserName(false);
      SetuserNameError("UserName is required ")
      return;
    }
    if (validator.isEmpty(password)) {
      SetIsValidpassword(false);
      SetpasswordError("Password is required ")

      return;
    }
    if (!validator.equals(password, ConfirmPassword)) {
      SetIsValidConfirmPassword(false);
      SetConfirmPasswordError("Password NotMatch ")

      return;
    }

    if (validator.equals(RoleName, '0') || validator.isEmpty(RoleName)) {
      //   SetIsValidConfirmPassword(false);
      return;
    }

    register(userName, password, ConfirmPassword, RoleName).then(
      ({ data }) => { 
        
        SetIsValidUserName(true)
        SetIsValidpassword(true);
        SetIsValidConfirmPassword(true);
        SetIsSelectedRole(true);
        

        SetUserName("");
        SetuserNameError("");

        Setpassword("");
        SetpasswordError("");

        SetConfirmPassword("");
        SetConfirmPasswordError("");
        
        alert(data) 
      },
      ({ response }) => {
        console.log("e", response.data.description)
        SetServerErrors(response.data.description);
        SetIsServerErrors(true);
      },
    )

  }
  function HandelInputName(e) {
    SetUserName(e.target.value);
    SetIsValidUserName(true);
    SetIsServerErrors(false);

  }
  function HandelInputPassword(e) {
    Setpassword(e.target.value);
    SetIsValidpassword(true);
    SetIsServerErrors(false);

  }

  function HandelInputConfirmPassword(e) {
    SetConfirmPassword(e.target.value);
    SetIsValidConfirmPassword(true);
    SetIsServerErrors(false);

  }

  function HadelSelectRole(e) {
    SetRoleName(e.target.value);
    SetIsSelectedRole(true)

  }
  useEffect(() => {
    getAll().then(
      ({ data }) => {
        setRoles(data)
      },
      (err) => { alert(err) }
    )}, [])

  const navigateToLogIn = () => {
    nav("/Login")
  }

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-xl-9 mx-auto">
            <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div class="card-img-left d-none d-md-flex"></div>
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">
                  Register
                </h5>

                <div class="form-floating mb-3">
                  <input
                    onChange={HandelInputName}
                    type="text"
                    class="form-control"
                    id="floatingInputUsername"
                    placeholder="myusername"
                    required
                    autofocus
                  ></input>
                  <label for="floatingInputUsername">Username</label>
                  <div>
                    {!IsValiduserName ? <span className="text-danger"> {userNameError}</span> : null}
                  </div>
                </div>



                <div class="form-floating mb-3">
                  <input
                    onChange={HandelInputPassword}
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  ></input>
                  <label for="floatingPassword">Password</label>
                  <div>
                    {!IsValidpassword ? <span className="text-danger"> {passwordError}</span> : null}
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    onChange={HandelInputConfirmPassword}
                    type="password"
                    class="form-control"
                    id="floatingPasswordConfirm"
                    placeholder="Confirm Password"
                  ></input>
                  <label for="floatingPasswordConfirm">
                    Confirm Password
                  </label>
                  <div>
                    {!IsValidConfirmPassword ? <span className="text-danger"> {ConfirmPasswordError}</span> : null}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <select className="form-select" onChange={HadelSelectRole}>
                    <option value="0" selected>Select Role</option>
                    {
                      Roles.map((v, i) => {
                        return (
                          <Fragment key={i}>
                            <option value={v.name} >{v.name}</option>
                          </Fragment>
                        )

                      })
                    }




                  </select>
                  <div>
                    {!IsSelectedRole ? <span className="text-danger">"please Select role</span> : null}
                  </div>
                </div>
                <div class="d-grid mb-2">

                  <div>
                    {ISServerErrors ? <span className="text-danger">{ServerErrors}</span> : null}
                  </div>

                  <button
                    onClick={HandleRegister}
                    class="btn btn-lg btn-primary btn-login fw-bold text-uppercase mb-3"
                  >
                    Register
                  </button>
                  <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={navigateToLogIn}>
                    LogIn
                  </button>

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
