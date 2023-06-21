import React, { useEffect, useState } from "react";
import "./table.css";
import { tableFunctions } from "../../global-functions/GlobalFunctions";
import { type } from "@testing-library/user-event/dist/type";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { tableStructureData } from "../../utils/TableStructureData";
import EditableInput from "../editable-input/EditableInput-1";
import DoubleCheckbox from "../checkbox/DoubleCheckbox";
import QuantityInput from "../quantity-input/QuantityInput";
import GroupButton from "../group-buttons/GroupButton";

function Table({
  tableData,
  setTableData,
  addItemCart,
  setAddItemCart,
  columns,
  removeListItem,
  tableTitle,
  openDrawer,
  refresh,
  addItem,
  hideButtons,
  setInputBudget,
  inputBudget,
  setInputSelectedResult,
  inputSelectedResult,
  inputBudgetRequest,
  setInputBudgetRequest,
  updatedInput,
  updateBudgetF,
  budgetDecisionF,
  addProductsToOrder,
  selectedProductForOrder,
  selectedProductsMarked,
  setSelectedProductsMarked,
  updateProductQuantity,
  pastOrder,
  quantityCollection,
  hideCounter,
  activeBtn,
  setActiveBtn,
}) {
  const [filterDrop, setFilterDrop] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [initialQty, setInitialQty] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeAction, setTypeAction] = useState(false);
  const [typeSlider, setTypeSlider] = useState(false);

  const role = localStorage.getItem("role");

  // sorting functionality
  // const sortData = (data, sortOrder) => {
  //   const sortedData = [...tableData];
  //   sortedData.sort((a, b) => {
  //     if (sortOrder === "ascending") {
  //       return a.budget - b.budget;
  //     } else {
  //       return b.budget - a.budget;
  //     }
  //   });
  //   return sortedData;
  // };
  const checkIsProductSelected = (productId, empId) => {
    let isProductSelected = [];
    let empFilter = selectedProductForOrder.filter(
      (val) => val.empId === empId
    );
    if (empFilter.length > 0) {
      isProductSelected = empFilter[0]?.products?.filter(
        (val) => val._id == productId
      );
    }

    if (isProductSelected.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const selectedProductMarkedF = (row, product) => {
    const filterProducts = selectedProductsMarked;

    const index = filterProducts.findIndex(
      (products) => products.productId === product._id
    );

    if (index !== -1) {
      filterProducts.splice(index, 1);
      setInitialQty(!initialQty);
    } else {
      filterProducts.push({ empId: row.id, productId: product._id });
    }
    setSelectedProductsMarked([...filterProducts]);
  };
  const addColor = (productId) => {
    let addColorState = selectedProductsMarked?.filter(
      (val) => val.productId === productId
    );
    if (addColorState?.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const empProductCount = (empId) => {
    // debugger
    console.log("quantity colelction : ", quantityCollection);
    let counterProduct = selectedProductsMarked.filter(
      (val) => val.empId == empId
    );
    let totalCountArray = [];
    let qtyCount = 0;
    if (counterProduct.length > 0) {
      counterProduct.forEach((val) => {
        let tempCount = quantityCollection.filter(
          (c) => c.productId === val.productId
        );
        if (tempCount.length > 0) {
          totalCountArray.push(tempCount[0].productQuantity);
        }
      });
      if (totalCountArray.length > 0) {
        qtyCount = totalCountArray.reduce(
          (previousScore, currentScore, index) =>
            Number(previousScore) + Number(currentScore),
          0
        );
        qtyCount = qtyCount - totalCountArray.length + counterProduct.length;
      } else {
        qtyCount = counterProduct.length;
      }
    }
    return qtyCount;
  };
  const activeBtnF = (empId) => {
    debugger;
    const filterItem = addItemCart?.filter((val) => val.id === empId);
    if (filterItem != undefined) {
      return filterItem?.length;
    }
  };

  const filteredData = tableData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  let sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    columns.forEach((element) => {
      if (element.type == "action") {
        setTypeAction(true);
      } else if (element.type == "slider") {
        if (hideButtons == undefined) {
          setTypeSlider(true);
        } else if (hideButtons == false) {
          setTypeSlider(false);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (selectedProductForOrder?.length == 0) {
      setSelectedProductsMarked([]);
    }
  }, [selectedProductForOrder]);
  return (
    <div>
      <h1 className="text-2xl font-semibold">{tableTitle ? tableTitle : ""}</h1>
      <div className="relative shadow-md sm:rounded-lg mt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
          <button
            onClick={() => {
              refresh();
            }}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1 ml-2"
          >
            <span className="material-symbols-rounded text-base">refresh</span>
          </button>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <div className="w-full h-[65vh] overflow-auto bg-gray-50">
          <table className="w-full bg-gray-50 relative text-sm text-left text-gray-500">
            <thead className="text-xs sticky z-10 top-0 text-gray-700 uppercase bg-gray-50">
              <tr>
                {columns.map((val) => {
                  return (
                    <th scope="col" className={`px-2 py-3 `}>
                      {val.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                  <td scope="col" className="px-3 py-3">
                    {row.SNO}
                  </td>
                  {row.name ? (
                    <th
                      scope="row"
                      className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap min-w-[150px] max-w-[150px]"
                    >
                      {row.name}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.requestAmount ? (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.requestAmount}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.company ? (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.company}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.email ? (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.email}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.noOfProducts ? (
                    <th
                      scope="row"
                      className="px-4 py-4   font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.noOfProducts}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.gender ? (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.gender}
                    </th>
                  ) : (
                    ""
                  )}

                  {row.slider ? (
                    <td className="px-6 py-4 relative">
                      <Slider
                        {...sliderSettings}
                        className="!mx-auto w-full   min-w-[500px] max-w-[720px]"
                      >
                        {role === "manager"
                          ? row.slider.showProducts.map((val, i) => {
                              return val.products.map((val, i) => (
                                <div
                                  key={val._id}
                                  className={`w-[9rem] h-[10rem] max-w-[9rem] rounded-md cursor-pointer relative ${
                                    addColor(val._id) ? "add_color" : ""
                                  }`}
                                >
                                  <div
                                    className={`${
                                      addColor(val._id) ? "batch" : "hide_batch"
                                    }`}
                                  >
                                    Marked
                                  </div>
                                  <img
                                    src={val.productImage}
                                    alt={val.productName}
                                    className="w-full h-full rounded-md"
                                  />
                                  <div className="w-full h-full absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-100 flex flex-col py-4 items-center rounded-md transition-all duration-500 ease-in-out">
                                    <span className="text-xs text-white text-center font-semibold">
                                      {val.productName}
                                    </span>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold">
                                        size : {val.productSize}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold">
                                        price : €{val.productPrice}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold">
                                        size : {val.productSize}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span className="text-xs mt-3 flex text-white text-center font-semibold">
                                        Qty: &nbsp;
                                        {val.productQuantity != undefined ? (
                                          <div className="w-14">
                                            <QuantityInput
                                              initialQty={val.productQuantity}
                                              updateQtyTo1={initialQty}
                                              updateProductQuantity={
                                                updateProductQuantity
                                              }
                                              productId={val._id}
                                              rowId={row}
                                              selectedProductForOrder={
                                                selectedProductForOrder
                                              }
                                              checkIsProductSelected={
                                                checkIsProductSelected
                                              }
                                              pastOrder={pastOrder}
                                            />
                                          </div>
                                        ) : (
                                          1
                                        )}
                                      </span>
                                    </div>
                                    {pastOrder ? (
                                      ""
                                    ) : (
                                      <div className="absolute w-[100%] bottom-0 bg-black text-white flex items-center ">
                                        <button
                                          className="px-3 py-1.5 mx-auto "
                                          onClick={() => {
                                            addProductsToOrder(row, val);
                                            selectedProductMarkedF(row, val);
                                          }}
                                        >
                                          Add
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ));
                            })
                          : role === "employee"
                          ? row.slider.showProducts.map((val, i) => (
                              <div
                                key={val._id}
                                className={`w-[9rem] h-[10rem] max-w-[9rem] rounded-md cursor-pointer relative ${
                                  addColor(val._id) ? "add_color" : ""
                                }`}
                              >
                                <div
                                  className={`${
                                    addColor(val._id) ? "batch" : "hide_batch"
                                  }`}
                                >
                                  Marked
                                </div>
                                <img
                                  src={val.productImage}
                                  alt=""
                                  className="w-full h-full rounded-md"
                                />
                                <div className="w-full h-full absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-100 flex flex-col justify-center items-center rounded-md transition-all duration-500 ease-in-out">
                                  <span className="text-xs text-white text-center font-semibold">
                                    {val.productName}
                                  </span>
                                  <div>
                                    {" "}
                                    <span className="text-xs text-white text-center font-semibold">
                                      price : €{val.productPrice}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs mt-3 flex text-white text-center font-semibold">
                                      Qty: &nbsp;
                                      {val.productQuantity != undefined ? (
                                        <div className="w-14">
                                          <QuantityInput
                                            initialQty={val.productQuantity}
                                            updateQtyTo1={initialQty}
                                            updateProductQuantity={
                                              updateProductQuantity
                                            }
                                            productId={val._id}
                                            rowId={row}
                                            selectedProductForOrder={
                                              selectedProductForOrder
                                            }
                                            checkIsProductSelected={
                                              checkIsProductSelected
                                            }
                                            pastOrder={pastOrder}
                                          />
                                        </div>
                                      ) : (
                                        1
                                      )}
                                    </span>
                                  </div>
                                  {pastOrder ? (
                                    ""
                                  ) : (
                                    <div className="absolute w-[100%] bottom-0 bg-black text-white flex items-center ">
                                      <button
                                        className="px-3 py-1.5 mx-auto "
                                        onClick={() => {
                                          addProductsToOrder(row, val);
                                          selectedProductMarkedF(row, val);
                                        }}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          : row.slider.showProducts[0].products.map((val) => {
                              return (
                                <div
                                  key={val._id}
                                  className="w-[8rem] h-[10rem] max-w-[8rem] rounded-md cursor-pointer relative"
                                >
                                  <img
                                    src={val.productImage}
                                    alt=""
                                    className="w-full h-full rounded-md"
                                  />
                                  <div className="w-full h-full absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-100 flex flex-col justify-center items-center rounded-md transition-all duration-500 ease-in-out">
                                    <span className="text-xs text-white text-center font-semibold">
                                      {val.productName}
                                    </span>{" "}
                                    <span className="text-xs text-white text-center font-semibold">
                                      size : {val.productSize}
                                    </span>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold">
                                        price : €{val.productPrice}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold">
                                        size : {val.productSize}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span className="text-xs text-white text-center font-semibold flex">
                                        Quantity : {val?.productQuantity}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </Slider>
                    </td>
                  ) : (
                    ""
                  )}
                  {row.bill ? <td className="px-3 py-4">€{row.bill}</td> : ""}
                  {row.createdAt ? (
                    <td className="px-6 py-4">{row.createdAt}</td>
                  ) : (
                    ""
                  )}

                  {inputBudgetRequest != undefined ? (
                    <td className="px-6 py-4  w-28">
                      <EditableInput
                        inputBudgetRequest={inputBudgetRequest}
                        updateBudgetF={updateBudgetF}
                        value={row.budget}
                        id={row.id}
                        updatedInput={updatedInput}
                      />
                    </td>
                  ) : row.budget ? (
                    <td className="px-6 py-4">€{row.budget}</td>
                  ) : (
                    ""
                  )}

                  {/* {row.allocateBudget ? <td className="px-6 py-4">{row.allocateBudget}</td> : ""} */}
                  {row.allocateBudget ? (
                    <td className="px-6 py-4 w-40 min-w-[20px]">
                      <EditableInput
                        showBtn={row.allocateBudget.showBtn}
                        updateBudgetF={updateBudgetF}
                        id={row.id}
                        value={row.allocateBudget.value}
                        updatedInput={updatedInput}
                      />
                    </td>
                  ) : (
                    ""
                  )}
                  {typeSlider ? (
                    <td className="px-6 py-4 min-w-[150px]">
                      <button
                        className="p-1 bg-black text-white rounded-md text-xs"
                        onClick={() => openDrawer(row)}
                      >
                        {row.slider.name}
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                  {row.orderInfo ? (
                    <td className="px-6 py-4 ">
                      <button
                        className="p-1 bg-black text-white rounded-md text-xs"
                        onClick={() => openDrawer(row)}
                      >
                        {/* {row.slider.name} */}
                        <h1>View</h1>
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                  {row.status ? (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.status}
                    </th>
                  ) : (
                    ""
                  )}
                  {row.selectBudgetAprroval ? (
                    <td className="px-6 py-4 w-120">
                      <DoubleCheckbox
                        budgetDecisionF={budgetDecisionF}
                        i={i}
                        row={row}
                      />
                    </td>
                  ) : (
                    ""
                  )}
                  {row.select ? (
                    // <DoubleCheckbox
                    //   budgetDecisionF={budgetDecisionF}
                    //   i={i}
                    //   row={row}
                    // />
                    <td className={`py-4 min-w-[190px] `}>
                      <GroupButton
                      budgetDecisionF={budgetDecisionF}
                      i={i}
                      row={row}
                    />
                    </td>
                  ) : (
                    ""
                  )}

                  {typeAction ? (
                    <td className={`py-4 min-w-[120px] `}>
                      {hideCounter == undefined ? (
                        <span
                          className={`rounded-full text-white py-1 px-2 mr-1.5  ${
                            empProductCount(row.id) > 0
                              ? "counter_bg_color"
                              : "default_counter_bg_color"
                          }`}
                        >
                          {empProductCount(row.id)}
                        </span>
                      ) : (
                        ""
                      )}
                      <button
                        className={`bg-black  "  text-white rounded-md text-xs ${
                          row.status ? "px-8 py-2 add-button" : "p-1"
                        }
                        
                        
                        `}
                        onClick={() => {
                          addItem(row);
                        }}
                        disabled={activeBtnF(row.id) > 0 ? true : false}
                        style={{
                          backgroundColor:
                            activeBtnF(row.id) > 0 ? "gray" : "black",
                        }}
                      >
                        {row.action.name}
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
