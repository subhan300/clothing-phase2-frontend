import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./pages/customer-dashboard/Layout";
import AdminLayout from "./pages/admin-dashboard/AdminLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Index from "./pages/index";
import TestModal from "./pages/TestModal";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Employee from "./pages/Employee-dashboard/Employee-1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorPopup, hidePopup } from "./redux-slice/UserSliceAuth";

import {
  BudgetRequestTab,
  CompanyProfileTab,
  EmployeesTab,
  DashboardTab,
  CartTab,
  OrderTab,
  PastOrderTab,
} from "./pages/customer-dashboard/index";

import {
  // EmployeesTab,
  DashboardTabAdmin,
  EmployeeTabAdmin,
  ManagerTabAdmin,
  // CartTab,
  OrderTabAdmin,
  ProductTabAdmin,
  AddCompanyTabAdmin,
  AddManagerTabAdmin,
  AddEmployeeTabAdmin,
  AllProductsTabAdmin,
  AdminEditTab,
} from "./pages/admin-dashboard/index";

function App() {
  const user = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const browserPath = window.location.href;

  const navigate = useNavigate();

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  let url =
    process.env.REACT_APP_LOCAL_URL || "https://system-frontend-ten.vercel.app";
  let routeUrl = window.location.href.replace(`${url}/`, "");
  useEffect(() => {
    debugger

    if (user.userLoggedIn) {
      if (user?.user?.role === "manager") {
        navigate(`/${routeUrl?routeUrl:"manager"}`);
      } else if (user?.user?.role === "employee") {
        navigate(`/${routeUrl?routeUrl:"employee"}`);
      } else if (user?.user?.role === "admin") {
        // navigate("/admin");
        navigate(`/${routeUrl?routeUrl:"admin"}`);
      } else {
        dispatch(
          errorPopup({
            state: true,
            message: "There is some issue , plz login again ",
          })
        );
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } else {
      if (window.location.pathname === "/") {
        navigate("/login");
      }
    }
  }, [user.userLoggedIn]);

  useEffect(() => {
    if (user.successPopup.state) {
      notify(user?.successPopup?.message);
      setTimeout(() => {
        dispatch(hidePopup());
      }, 4500);
    }
  }, [user.successPopup.state]);

  useEffect(() => {
    if (user.errorPopup.state) {
      notifyError(user?.errorPopup?.message);
      setTimeout(() => {
        dispatch(hidePopup());
      }, 4000);
    }
  }, [user.errorPopup.state]);
  return (
    <div>
      {/* <Routes>
           <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<DashboardTabAdmin />}></Route>
              <Route path="/orders" element={<OrderTabAdmin />}></Route>
              <Route path="/employee" element={<EmployeeTabAdmin />}></Route>
              <Route path="/manager" element={<ManagerTabAdmin />}></Route>
              <Route path="/upload-company" element={<ProductTabAdmin />}></Route>
              <Route path="/add-company" element={<AddCompanyTabAdmin />}></Route>
              <Route path="/add-manager" element={<AddManagerTabAdmin />}></Route>
              <Route path="/add-employee" element={<AddEmployeeTabAdmin />}></Route>
            </Routes>
          </AdminLayout>
        }
      />
    
     </Routes> */}
      {user.errorPopup.state || user.successPopup.state ? (
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      ) : (
        ""
      )}
      {user.userLoggedIn ? (
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />}></Route>
          {user?.user?.role === "employee" ? (
            <Route path="/employee" element={<Employee />} />
          ) : (
            ""
          )}

          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<DashboardTabAdmin />}></Route>
                  <Route path="/orders" element={<OrderTabAdmin />}></Route>
                  <Route
                    path="/employee"
                    element={<EmployeeTabAdmin />}
                  ></Route>
                  <Route path="/manager" element={<ManagerTabAdmin />}></Route>
                  <Route
                    path="/upload-company"
                    element={<ProductTabAdmin />}
                  ></Route>
                  <Route
                    path="/add-company"
                    element={<AddCompanyTabAdmin />}
                  ></Route>
                  <Route
                    path="/add-manager"
                    element={<AddManagerTabAdmin />}
                  ></Route>
                  <Route
                    path="/add-employee"
                    element={<AddEmployeeTabAdmin />}
                  ></Route>
                  <Route
                    path="/all-products"
                    element={<AllProductsTabAdmin />}
                  ></Route>
                  <Route path="/all-companies" element={<AdminEditTab />}></Route>
                </Routes>
              </AdminLayout>
            }
          />

          {user?.user?.role === "manager" ? (
            <Route
              path="/customer/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<DashboardTab />}></Route>
                    <Route path="/order-tab" element={<OrderTab />}></Route>
                    <Route
                      path="/company-profile"
                      element={<CompanyProfileTab />}
                    ></Route>
                    <Route
                      path="/budget-request"
                      element={<BudgetRequestTab />}
                    ></Route>
                    <Route path="/employee" element={<EmployeesTab />}></Route>
                    <Route path="/cart" element={<CartTab />}></Route>
                    <Route
                      path="/past-order"
                      element={<PastOrderTab />}
                    ></Route>
                  </Routes>
                </Layout>
              }
            />
          ) : (
            ""
          )}

          <Route path="/modal" element={<TestModal />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<Login />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
