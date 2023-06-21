import React, { useState } from "react";
import { Cart, User, Carret, View } from "../assets/images/index.js";
import { useDispatch, useSelector } from "react-redux";
import { userRemove } from "../redux-slice/UserSliceAuth.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user = useSelector((auth) => auth.authUser.user);
  console.log("user>>>>",user)
  const userName = user?.name;
 let userRole= ()=>{
    switch (user?.role) {
        case "manager":
          return "managerEmail";
          break;
        case "admin":
          return "adminEmail";
          
        case "employee":
          return "employeeEmail";
          
    
        default:
          return "null"
          
      }
 }
    // let userEmail = user?.result[userRole()]
    let userEmail="k"
    ;
    

  
const signout=()=>{
    dispatch(userRemove())
    navigate("/login?role=manager")
}
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-black text-white py-3 px-5 z-50">
      <div className="relative flex items-center lg:w-[35%] justify-between">
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-lg p-1">
            <img src={Cart} alt="logo" className="text-white" />
          </div>
          <div className="flex flex-col ml-1.5 justify-center items-start">
            <h1 className="text-base uppercase font-semibold leading-3">
              martvill
            </h1>
            <p className="text-xs">A platform to sell anything.</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center cursor-pointer">
          <img src={View} alt="view site" className="h-6 mr-1 -scale-x-[1]" />
          <h1>View Site</h1>
        </div>
      </div>
      <div className="relative">
        <div className="relative flex items-center cursor-pointer">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center focus:outline-none"
          >
            <img src={User} alt="user" className="h-5 w-10" />
            <h1 className="text-lg">{userName}</h1>
            <img src={Carret} alt="carret" className="ml-2 mt-1" />
          </button>
          {dropdown === true ? (
            <div className="absolute top-8 right-0 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow mt-2.5 transition-all duration-500 ease-out">
              <ul className="py-1 px-1 text-sm">
                <li className="flex items-center px-4 py-2 rounded-md hover:bg-[#F3F4F6]">
                  <a className="flex items-center justify-between" href="#">
                    <div>
                      <span className="material-symbols-rounded !text-4xl text-[#9B9B9B]">
                        person
                      </span>
                    </div>
                    <div className="flex flex-col ml-2">
                      <span className="text-xs font-semibold text-black">
                        {userName}
                      </span>
                      <span className="text-xs text-[#9B9B9B]">
                       {userEmail}
                      </span>
                    </div>
                  </a>
                </li>
                <li className="flex items-center px-4 py-2 rounded-md text-[#9B9B9B] hover:bg-[#fd4444] hover:text-white">
                  <a href="#" className="text-sm flex items-center w-full">
                    <span className="material-symbols-rounded !text-md">
                      logout
                    </span>
                    <span className="ml-3" onClick={()=>{signout()}}>Sign out</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
