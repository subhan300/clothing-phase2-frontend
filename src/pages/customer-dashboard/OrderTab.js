import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import { tableStructureData } from "../../utils/TableStructureData";
import ProductDrawer from "../../components/ProductDrawer";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetEmployeesProductsQuery,
  useUpdateBudgetMutation,
  useGetCompanyAllProductsQuery
} from "../../apis/companyManager/index";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { showPopup, errorPopup } from "../../redux-slice/UserSliceAuth";

const Index = () => {
  const { data, error, isLoading, refetch } = useGetEmployeesProductsQuery();
  const  data2 = useGetCompanyAllProductsQuery();
  
  const [budgetUpdate, response] = useUpdateBudgetMutation();
  const dispatch = useDispatch();
  const authUser = useSelector((val) => val.authUser.user);

  const [tableData, setTableData] = useState([]);
  const [quantityCollection, setQuantityCollection] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [inputBudgetRequest, setInputBudgetRequest] = useState(false);
  const [activeBtn,setActiveBtn]=useState(false);
  const [addItemCart,setAddItemCart]=useState([]);
  const [selectedProductsMarked, setSelectedProductsMarked] = useState([]);

  const updatedInput = (selectedInput) => {
    setInputBudgetRequest(selectedInput);
  };

  const openDrawer = (row) => {
    setShowDrawer(!showDrawer);
    setSelectedEmployee(row);
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
  const addMoreProduct = (products, isProductRemove) => {
    addProductsToOrder(selectedEmployee, products);
    selectedProductMarkedF(selectedEmployee.id, products);
  };

  const updateProductQuantity = (pdId, qty, row,isDrawerProduct) => {
    debugger;
    let formatSelectedEmp={
       empId: row.id, products: row.slider.showProducts[0].products, row 
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
  const addProductsToOrder = (row, products) => {
    debugger;
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

  // this function will remove procut if exist else add it
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
  const removeAddProduct=(row)=>{
    let filterProduct=addItemCart.filter(val=>val.id != row.id);
  //  if(filterProduct.length>0){
    setAddItemCart(filterProduct)
  //  }

}
 const showActive=(row)=>{
  
  setAddItemCart(prev=>[...prev,row])
 }
  const addItem = (row) => {
    debugger;
    showActive(row)
    let cartItems = [];
    let getLocalStorageCartData;
    let getSelectedRow = selectedProductForOrder.filter(
      (val) => val.empId === row.id
    );

    if (getSelectedRow.length > 0) {
      getLocalStorageCartData = JSON.parse(localStorage.getItem("addToCart"));

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

      let totalBilled = getSelectedRow[0].products.map((val) => {
        let qty = val.productQuantity ?? 1;
        return val.productPrice * qty;
      });
      totalBilled = totalBilled.reduce(
        (previousScore, currentScore, index) => previousScore + currentScore,
        0
      );
      let cartItemObj;
      if (totalBilled <= row.budget) {
        if (
          getLocalStorageCartData != undefined ||
          getLocalStorageCartData != null
        ) {
          let filterData = getLocalStorageCartData.filter(
            (val) => val.empId != row.id
          );
          cartItemObj = {
            ...getSelectedRow[0],
            totalBilled,
            employeeEmail: row.employeeEmail,
            managerEmail: authUser.result.managerEmail,
          };
          filterData.push(cartItemObj);
          if (cartItemObj.products.length > 0) {
            localStorage.setItem("addToCart", JSON.stringify(filterData));
          } else {
            removeAddProduct(row)
            return dispatch(
              errorPopup({ state: true, message: "Add Product in List first" })
            );
          }
        } else {
          cartItemObj = {
            ...getSelectedRow[0],
            totalBilled: totalBilled,
            employeeEmail: row.employeeEmail,
            managerEmail: authUser.result.managerEmail,
          };
          cartItems.push(cartItemObj);
          if (cartItemObj.products.length > 0) {
            localStorage.setItem("addToCart", JSON.stringify(cartItems));
          } else {
            removeAddProduct(row)
            return dispatch(
              errorPopup({ state: true, message: "Add Product in List first" })
            );
          }
        }

        dispatch(showPopup({ state: true, message: "Product added in cart" }));
      } else {
        removeAddProduct(row)
        dispatch(errorPopup({ state: true, 
          message: "Budget not enough! Update budget for this employee before ordering!" }));
      }
    } else {
      removeAddProduct(row)
      dispatch(errorPopup({ state: true, message: "Select Order First" }));
    }
  };

  const budgetDecisionF = () => {
    if (inputBudgetRequest || inputBudgetRequest.value < 0) {
      const updatedBudget = {
        employeeId: inputBudgetRequest.inputId,
        changeBudgetAmount: inputBudgetRequest.value,
      };
      budgetUpdate(updatedBudget)
        .unwrap()
        .then((res) => {

          dispatch(
            showPopup({ state: true, message: "Budget Sucesssfully Increased" })
          );
          // setComment("");
        })
        .catch((error) => {
          dispatch(
            errorPopup({
              state: true,
              message: "Budget not enough! Update budget for this employee before ordering!",
            })
          );
        });
    } else {
      dispatch(
        errorPopup({
          state: true,
          message: "budget input should be positive value",
        })
      );
    }
  };
  const removeListItem = (row, pdId) => {
    let removeRowEntry = tableData.filter((val) => val.id != row.id);

    let updateRow = row.slider.showProducts[0].products.filter(
      (val) => val._id != pdId
    );
    let obj = { ...row };
    //  obj.slider.showProducts[0]={slider:{showProducts:{products:[...updateRow]}}};
    obj.slider.showProducts = [{ products: [...updateRow] }];
    const sortData = (data) => {
      return data.sort((a, b) => a.SNO - b.SNO);
    };
    let sortedData = sortData([...removeRowEntry, obj]);
    setTableData(sortedData);
  };
  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };
  useEffect(() => {
    let getLocalStorageCartData = JSON.parse(localStorage.getItem("addToCart"));
    if (data != undefined && data.length != 0) {
      let tableDataConvert = globalFunctions.tableDataFormatConverter(data);
      setTableData(tableDataConvert);
    }
  }, [data]);

  return (
    <>
      <Table
        tableData={tableData}
        setTableData={setTableData}
        columns={tableStructureData.columns}
        tableTitle="Create Order"
        openDrawer={openDrawer}
        addItem={addItem}
        inputBudgetRequest={inputBudgetRequest}
        setInputBudgetRequest={setInputBudgetRequest}
        updatedInput={updatedInput}
        updateBudgetF={budgetDecisionF}
        removeListItem={removeListItem}
        refresh={refresh}
        addProductsToOrder={addProductsToOrder}
        selectedProductsMarked={selectedProductsMarked}
        setSelectedProductsMarked={setSelectedProductsMarked}
        updateProductQuantity={updateProductQuantity}
        selectedProductForOrder={selectedProductForOrder}
        quantityCollection={quantityCollection}
        addItemCart={addItemCart}
        setAddItemCart={setAddItemCart}
      />
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
    </>
  );
};

export default Index;
