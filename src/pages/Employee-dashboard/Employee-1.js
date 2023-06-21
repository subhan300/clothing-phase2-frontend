import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import ProductDrawer from "../../components/ProductDrawer";

import { useDispatch, useSelector } from "react-redux";
import {
  useEmployeeGetProductQuery,
  useEmployeeRequestBudgetIncrementMutation,
  useAddNewOrderMutation,
  useGetCompanyAllProductsQuery
} from "../../apis/companyManager/index";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";
import { showPopup, errorPopup } from "../../redux-slice/UserSliceAuth";
import { Header } from "../../components";

const Index = () => {
  const employeeId = JSON.parse(localStorage.getItem("user"))?.result?._id;
  const { data, error, isLoading, refetch } =
    useEmployeeGetProductQuery(employeeId);
  const [addNewOrder, responseOrder] = useAddNewOrderMutation();
  const  data2 = useGetCompanyAllProductsQuery();
  const [budgetRequest, response] = useEmployeeRequestBudgetIncrementMutation();
  const companyName = JSON.parse(localStorage.getItem("user"))?.result
      ?.companyName;
  // only to show editable input
  const [inputBudgetRequest, setInputBudgetRequest] = useState(true);
  const [selectedProductsMarked, setSelectedProductsMarked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantityCollection, setQuantityCollection] = useState([]);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [inputBudgetValue, setInputBudgetValue] = useState(0);

  const authUser = useSelector((state) => state.authUser.user);

  const openDrawer = (row) => {
    setShowDrawer(!showDrawer);
    setSelectedEmployee(row);
  };

  const updateProductQuantity = (pdId, qty, row,isDrawerProduct) => {
    debugger;
    let formatSelectedEmp={
       empId: row.id, products: row.slider.showProducts, row 
    }
    let filterQuantityCollection =[]
    const empRowFilter = [formatSelectedEmp];

    if (empRowFilter.length > 0) {
      let productFilter=[];
      console.log("isproduct",isDrawerProduct)
      if(isDrawerProduct != undefined){
        productFilter = data2.data.products.filter(
          (val) => val._id == pdId
        );
      }else{
        productFilter = empRowFilter[0].products.filter(
          (val) => val._id == pdId
        );
      }

      if (productFilter.length > 0) {
        let quantityCollectionArray = {
          empId: row.id,
          productId: pdId,
          productQuantity: qty,
        };
         filterQuantityCollection = quantityCollection.filter(
          (val) => val.productId != pdId
        );
        filterQuantityCollection.push(quantityCollectionArray);
        setQuantityCollection(filterQuantityCollection);
      }
    }
  };

  const createOrder = (row) => {
    setLoading(true);
    let getSelectedRow = selectedProductForOrder.filter(
      (val) => val.empId === row.id
    );
    if (getSelectedRow.length > 0) {
      const updateQty = (productsCollection) => {
        debugger;
        let updatedProductQtyCollection = [];
        productsCollection.map((product) => {
          const filterProductToUpdateQty = quantityCollection.filter(
            (val) => val.productId === product._id
          );
          if (filterProductToUpdateQty.length > 0) {
            let obj = { ...product };
            obj.productQuantity = filterProductToUpdateQty[0]?.productQuantity;
            updatedProductQtyCollection.push(obj);
          } else {
            updatedProductQtyCollection.push(product);
          }
        });

        getSelectedRow[0].products = updatedProductQtyCollection;
      };

      updateQty(getSelectedRow[0].products);
      debugger
      let orderData = orderBodyConvert(row, getSelectedRow[0]);
       console.log("row==",row,orderData.bill)
      if (orderData.products.length > 0) {
        addNewOrder([orderData])
          .unwrap()
          .then((res) => {
            dispatch(showPopup({ state: true, message: "Order Created" }));
          })
          .catch((error) => {
            if (error.status == 400) {
              dispatch(
                errorPopup({
                  state: true,
                  message: "Error! Your Budget is not enough! Request new budget before ordering!",
                })
              );
            } else {
              dispatch(
                errorPopup({
                  state: true,
                  message: "Error! Your Budget is not enough! Request new budget before ordering!",
                })
              );
            }
          })
          .finally(() => {
            setSelectedProductForOrder([]);
          });
      } else {
        dispatch(
          errorPopup({
            state: true,
            message: "Add Product In List , first",
          })
        );
      }
    } else {
      dispatch(
        errorPopup({
          state: true,
          message: "Select Product First",
        })
      );
    }
  };
  const addItem = (row) => {
    
      createOrder(row);
    
  };

  const updatedInput = (selectedInput) => {
    setInputBudgetRequest(selectedInput);
  };
  const dispatch = useDispatch();
  const updateBudgetF = () => {
    if (inputBudgetRequest || inputBudgetRequest.value < 0) {
      const updatedBudget = {
        employeeId: inputBudgetRequest.inputId,
        requestAmount: inputBudgetRequest.value,
        companyId: authUser.result.companyId,
      };

      budgetRequest(updatedBudget)
        .unwrap()
        .then((res) => {
          dispatch(
            showPopup({
              state: true,
              message: "Manager has notified ,about your request",
            })
          );
        })
        .catch((error) => {
          dispatch(
            errorPopup({
              state: true,
              message: "A Budget Request has already been made",
            })
          );
        });
    } else {
      dispatch(
        errorPopup({ state: true, message: "Input Value is not correct" })
      );
    }
  };

  const orderBodyConvert = (row, cartProducts) => {
  
    const companyId = JSON.parse(localStorage.getItem("user"))?.result
      ?.companyId;
      let quantity=0;
    let total = cartProducts.products.map((val) => {
      quantity += Number(val.productQuantity)
      let qty = val.productQuantity ?? 1;
      return val.productPrice * qty;
    });
    total = total.reduce(
      (previousScore, currentScore, index) => previousScore + currentScore,
      0
    );

    return {
      employeeId: cartProducts.empId,
      products: cartProducts.products,
      companyName,
      bill: total,
      quantity:quantity,
      companyId: companyId,
      comment: "Employee Created Order By Himself",
      employeeEmail:authUser.result.employeeEmail
    };
  };

  const selectedProductMarkedF = (empId, product) => {
    const filterProducts = selectedProductsMarked;
    let index;
    if (filterProducts.length > 0) {
      index = filterProducts.findIndex(
        (products) => products.productId === product._id
      );
    } else {
      index = -1;
    }

    if (index !== -1) {
      filterProducts.splice(index, 1);
    } else {
      filterProducts.push({ empId: empId, productId: product._id });
    }
    setSelectedProductsMarked([...filterProducts]);
  };
  const addMoreProduct = (products) => {
    addProductsToOrder(selectedEmployee, products);
    selectedProductMarkedF(selectedEmployee.id, products);
  };
  const addProductsToOrder = (row, products) => {
    let empExist = selectedProductForOrder.filter(
      (val) => val.empId === row.id
    );

    if (empExist.length > 0) {
      const getUpdatedProducts = productUpdate(empExist[0].products, products);
      let filterSelectedRow = selectedProductForOrder.filter(
        (val) => val.empId != empExist[0].empId
      );
      if (getUpdatedProducts.length > 0) {
        empExist[0].products = getUpdatedProducts;
        empExist[0].row = row;
        setSelectedProductForOrder([...filterSelectedRow, empExist[0]]);
      } else {
        setSelectedProductForOrder([...filterSelectedRow]);
      }
    } else {
      const productsCollected = { empId: row.id, products: [products], row };
      setSelectedProductForOrder([
        ...selectedProductForOrder,
        productsCollected,
      ]);
    }
  };

  const productUpdate = (collections, getProduct) => {
    // debugger
    let collection = collections;
    const index = collection.findIndex(
      (product) => product._id === getProduct._id
    );

    if (index !== -1) {
      collection.splice(index, 1);
    } else {
      collection.push(getProduct);
    }
    return collection;
  };

  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };

  useEffect(() => {
    if (data != undefined && data.length != 0) {
      let tableDataConvert =
        globalFunctions.employeeOrderBudgetFormatConverter(data);
      setTableData(tableDataConvert);
    }
  }, [isLoading, data]);

 

  return (
    <div className="px-auto  mx-auto w-11/12">
      <Header />
      <div className="mt-12 py-12">
        <Table
          tableData={tableData}
          setTableData={setTableData}
          columns={tableStructureData.employeeOrderBudgetColumns}
          tableTitle="Create Order"
          openDrawer={openDrawer}
          addItem={addItem}
          inputBudgetValue={inputBudgetValue}
          setInputBudgetValue={setInputBudgetValue}
          setInputBudgetRequest={setInputBudgetRequest}
          updatedInput={updatedInput}
          updateBudgetF={updateBudgetF}
          addProductsToOrder={addProductsToOrder}
          refresh={refresh}
          selectedProductForOrder={selectedProductForOrder}
          selectedProductsMarked={selectedProductsMarked}
          setSelectedProductsMarked={setSelectedProductsMarked}
          updateProductQuantity={updateProductQuantity}
          quantityCollection={quantityCollection}
        />
      </div>

      <ProductDrawer
        show={showDrawer}
        setShow={setShowDrawer}
        addMoreProduct={addMoreProduct}
        addProductsToOrder={addProductsToOrder}
        updateProductQuantity={updateProductQuantity}
        selectedEmployee={selectedEmployee}
        selectedProductsMarked={selectedProductsMarked}
        selectedProductForOrder={selectedProductForOrder}
        data2={data2}
      />
    </div>
  );
};

export default Index;
