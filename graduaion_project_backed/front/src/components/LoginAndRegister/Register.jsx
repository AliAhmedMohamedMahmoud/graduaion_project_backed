
import { Fragment, useEffect, useState } from 'react';
import { GetAll } from '../../Services/Role';
import { useNavigate } from "react-router-dom";
import {register} from '../../Services/LogIn&Register'
import validator from 'validator';
import "./Register.css";
export default function Register() {

  const [Roles, setRoles] = useState([]);
  const[userName, SetUserName] = useState("")
  const[password, Setpassword] = useState("")
  const[ConfirmPassword, SetConfirmPassword] = useState("")
  const[RoleName, SetRoleName] = useState("")
  
  const[IsValiduserName, SetIsValidUserName] = useState(true)
  const[IsValidpassword, SetIsValidpassword] = useState(true)
  const[IsValidConfirmPassword, SetIsValidConfirmPassword] = useState(true)
  const[IsSelectedRole, SetIsSelectedRole] = useState(false)


  const[ServerErrors, SetServerErrors] = useState("")
  const[ISServerErrors, SetIsServerErrors] = useState(false)
  function HandleRegister (params) {
      if(!validator.isAlpha(userName) || validator.isEmpty(userName) )
      {
          SetIsValidUserName(false);
          return;
      }
      if( validator.isEmpty(password))
      {
          SetIsValidpassword(false);
          return;
      }
      if(!validator.equals(password,ConfirmPassword))
      {
          SetIsValidConfirmPassword(false);
          return;
      }

      if(validator.equals(RoleName,'0')||validator.isEmpty(RoleName))
      {
       //   SetIsValidConfirmPassword(false);
          return;
      }
   
   register(userName,password,ConfirmPassword,RoleName).then(
    ({data})=>{alert(data)},
    ({response})=>{
      console.log("e",response.data.description)
      SetServerErrors(response.data.description);
      SetIsServerErrors(true);
    },
   )
   //  nav('/')
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
    GetAll().then(
      ({ data }) => { setRoles(data) },
      (err) => { alert(err) }
    )
  }, [])







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
                     {!IsValiduserName?<span className="text-danger"> Please Enter valid Name</span>:null}
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
                     {!IsValidpassword?<span className="text-danger"> Please Enter valid PassWord</span>:null}
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
                     {!IsValidConfirmPassword?<span className="text-danger"> Please Enter valid PassWord</span>:null}
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <select class="form-control" onChange={HadelSelectRole}>
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
                     {!IsSelectedRole?<span className="text-danger">"please Select role</span>:null}
                    </div>
                  </div>
                  <div class="d-grid mb-2">

                  <div>
                     {ISServerErrors?<span className="text-danger">{ServerErrors}</span>:null}
                    </div>

                    <button
                    onClick={HandleRegister}
                      class="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    >
                      Register
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
