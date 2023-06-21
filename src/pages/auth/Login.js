import React, { useState, useEffect } from "react";
import { login, logo } from "../../assets/images";
import { SignIn } from "../../redux-slice/middleware/authMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  errorRemove,
  showPopup,
  errorPopup,
} from "../../redux-slice/UserSliceAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  let url =
    process.env.REACT_APP_LOCAL_URL|| "https://system-frontend-ten.vercel.app";
    console.log("url>>>",url)
  const auth = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
  
    let user;
    e.preventDefault();
    if (email != "" && password != "") {
      if (role == "manager" || role == "manager#") {
        user = {
          managerEmail: email,
          managerPassword: password,
        };
      } else if (role == "employee") {
        user = {
          employeeEmail: email,
          employeePassword: password,
        };
      } else if (role == "admin") {
        user = {
          adminEmail: email,
          adminPassword: password,
        };
      } else {
        user = "404";
      }
      if (user != "404") {
        dispatch(SignIn({ user, navigate, role }));
      } else {
        alert("role is no valid", role);
      }
    }
  };
  useEffect(() => {
    dispatch(errorRemove());
    const getRoleFrombrowserPath = window.location.href.replace(
      `${url}/login?role=`,
      ""
    );
    if (getRoleFrombrowserPath != `${url}/login` || role === "manager") {
      if (
        getRoleFrombrowserPath == "manager" ||
        getRoleFrombrowserPath == "admin" ||
        getRoleFrombrowserPath == "employee"
      ) {
        setRole(getRoleFrombrowserPath);
      }
    }
  }, [window.location.href]);
  return (
    <div>
      <div className="flex col-span-12 h-[100vh] overflow-hidden">
        <div className="hidden lg:flex lg:flex-col lg:col-span-6 h-screen w-[50%] bg-black   items-center justify-center relative">
          <img
            src={login}
            alt=""
            srcset=""
            className="animate__bounceInUp -ml-5 -mt-20"
          />
          <div className="-mt-10 mx-auto w-[80%]">
            <h1 className="text-3xl font-extrabold text-white">
              Our philosophy is simple
            </h1>
            <h1 className="text-xl font-semibold text-white">
              Streamline your operations with our solutions.
            </h1>
          </div>
          <div className="absolute bottom-[20px] left-[65px]">
            <p className="font-semibold text-white text-sm">2023 © BISILUX</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 w-[100%] lg:w-[50%] flex justify-center items-center">
          <div className="text-center bg-red- w-[80%] mx-auto">
            <img src={logo} alt="" className="w-44 mx-auto py-5" />
            <h1 className="text-3xl font-semibold">
              {role === "manager"
                ? "Manager"
                : role == "employee"
                ? "Employee"
                : role == "admin"
                ? "Admin"
                : "Manager"}
              &nbsp;Login
            </h1>
            <form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="animate__bounceInRight max-w-lg lg:max-w-md mt-4 bg-white border-b-4 border-b-black rounded-xl shadow p-4 mx-auto">
                <h1 className="text-2xl font-medium text-left ml-2">Sign in</h1>
                <div className="form_element w-full p-2 relative">
                  <input
                    type="text"
                    name="email"
                    onFocus={() => {
                      dispatch(errorRemove());
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    placeholder="Email"
                    className="w-full p-2 active:outline-none focus:outline-none border-[#2070e9] border-b-2 rounded-md"
                  />
                  <div className="validation text-xs absolute top-[50%] right-[0.5rem]">
                    Required
                  </div>
                </div>
                <div className="form_element w-full p-2 mt-1 relative">
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    onFocus={() => {
                      dispatch(errorRemove());
                    }}
                    required
                    placeholder="Password"
                    className="w-full p-2 active:outline-none focus:outline-none border-[#2070e9] border-b-2 rounded-md"
                  />
                  <div className="validation text-xs absolute top-[50%] right-[0.5rem]">
                    Required
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black hover:bg-[#aca9a9] transition-all ease-in-out duration-500 w-[90%] text-white font-medium p-2 rounded-lg mt-5"
                >
                  Sign in
                </button>
              </div>
            </form>
            {auth.authErr != "" ? (
              <p className="mt-2" style={{ color: "red" }}>
                {auth?.authErr}
              </p>
            ) : (
              ""
            )}
            <div className="mt-4 ">
              <Link to="/login?role=employee">Employee Login</Link>
              <div className="mt-2">
                <Link to="/login?role=admin">Admin Login</Link>
              </div>
              <div className="mt-2">
                <Link to="/login?role=manager">Manager Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
