import React, { useEffect, useState } from "react";
import { Check } from "../assets/images";
import { showPopup, errorPopup } from "../redux-slice/UserSliceAuth";
import { useDispatch } from "react-redux";
import QuantityInput from "./quantity-input/QuantityInput";

function ProductDrawer(props) {
  const { data, error, isLoading } = props.data2
  console.log("data2",data)
  const {
    addMoreProduct,
    updateProductQuantity,
    selectedEmployee,
    selectedProductsMarked,
    selectedProductForOrder,
  } = props;

  const [selectedImage, setSelectedImage] = useState(null);
  const [allProduct, setAllProducts] = useState([]);

  const dispatch = useDispatch();

  const selectImage = (index) => {
    if (selectedImage === index) {
      setSelectedImage(null);
    } else {
      setSelectedImage(index);
    }
  };
  const checkIsProductSelected = (productId) => {
    const isProductSelected = selectedProductsMarked.filter(
      (val) => val.productId == productId
    );
    if (isProductSelected.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const selectedProduct = (item, isProductRemove) => {
    addMoreProduct(item, isProductRemove);
    if (isProductRemove) {
      dispatch(showPopup({ state: true, message: "Product removed" }));
    } else {
      dispatch(showPopup({ state: true, message: "Product Added" }));
    }
  };

  const checkIsProductSelectedOfProductDrawer = (productId, empId) => {
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
  useEffect(() => {
    if (data != undefined) {
      setAllProducts(data.products);
    }
  }, [isLoading]);

  return (
    <div
      className={`${
        props.show ? "left-0" : "left-[-100%]"
      } fixed top-0 flex z-50 justify-center items-center h-screen w-screen transition-all duration-500 ease-in-out bg-[rgba(0,0,0,.6)]`}
    >
      <div className="relative bg-white h-[90vh] w-[90vw] rounded-lg shadow-2xl p-2">
        <div className="ml-1 mr-2 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Purchase Product</h1>
          <span
            className="material-symbols-rounded font-extrabold cursor-pointer"
            onClick={() => props.setShow(!props.show)}
          >
            close
          </span>
        </div>
        <div className=" relative h-[90%] grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:flex flex-wrap overflow-y-auto justify-center mx-auto ">
          {isLoading ? (
            <h1>Loading....</h1>
          ) : (
            allProduct.map((item, index) => (
              <div
                key={index}
                className="relative max-h-[15rem] max-w-xs rounded-lg m-2 flex justify-center items-center"
              >
                {selectedImage === index && (
                  <div className="absolute top-2 right-2">
                    <img src={Check} alt="" />
                  </div>
                )}
                <img
                  src={item.productImage}
                  className={`h-full w-full cursor-pointer select-none ${
                    selectedImage === index
                      ? "border-2 border-blue-500 ring-1 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => selectImage(index)}
                  alt=""
                />
                <div className="w-full h-full absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-100 flex flex-col justify-center items-center rounded-md transition-all duration-500 ease-in-out">
                  <h1 className="text-white">{item.productName}</h1>
                  <h1 className="text-white">size: {item.productSize}</h1>
                  <h1 className="text-white">price: €{item.productPrice}</h1>
                  <div className="absolute top-2 left-2 bg-black p-1 rounded-md">
                    <span className="text-xs flex text-white text-center font-semibold px-2">
                      Qty:{" "}
                      {
                        <div className="flex items-center ml-1 w-12">
                          <QuantityInput
                            initialQty={1}
                            updateProductQuantity={updateProductQuantity}
                            productId={item._id}
                            rowId={selectedEmployee}
                            checkIsProductSelected={
                              checkIsProductSelectedOfProductDrawer
                            }
                            selectedProductForOrder={selectedProductForOrder}
                            isDrawerProduct={true}
                          />
                        </div>
                      }
                    </span>
                  </div>

                  <div className="absolute w-[90%] bottom-2 bg-black text-white flex items-center rounded-lg">
                    {checkIsProductSelected(item._id) ? (
                      <button
                        className="px-3 py-1.5 mx-auto rounded-l-lg"
                        onClick={() => {
                          selectedProduct(item, true);
                        }}
                      >
                        Remove Product
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1.5 mx-auto rounded-l-lg"
                        onClick={() => {
                          selectedProduct(item, false);
                        }}
                      >
                        Add Product
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDrawer;
