import React, { useState, useEffect } from "react";
import { useGetOrdersQuery } from "../../apis/companyManager/index";
import Table from "../../components/table/Table";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux-slice/UserSliceAuth";

function PastOrderTab() {
  const { data, error, isLoading, refetch } = useGetOrdersQuery();
  const dispatch = useDispatch();
  let pastOrder = true;

  const [tableData, setTableData] = useState([]);

  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };

  function sortByDateAscending(array) {
    debugger
    console.log("array==",array)
    array.sort(function(a, b) {
      const numA = parseInt(a.SNO.substring(4));
      const numB = parseInt(b.SNO.substring(4));
      return numB - numA;
      
    });
    return array;
  }

  useEffect(() => {
    if (data != undefined && data.length != 0) {
     
      let tableDataConvert =
        globalFunctions.orderTableDataFormatConverter(data);
        console.log("data===>",tableDataConvert)
        tableDataConvert=sortByDateAscending(tableDataConvert)
        
      setTableData(tableDataConvert);
    }
  }, [data, isLoading]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-2">Past Orders</h1>
        <button
          onClick={() => {
            refresh();
          }}
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1 ml-2"
        >
          <span className="material-symbols-rounded text-base">refresh</span>
        </button>
      </div>
      {tableData.map((item, index) => {
        console.log("table", item);
        return (
          <div
            key={item.id}
            className="relative flex flex-col sm:flex-row justify-between rounded-lg bg-gray-200 my-2 border-b border-gray-200 py-4 px-2"
          >
            <div className="flex flex-col md:flex-row lg:flex-row">
              <div className="flex flex-col ">
                <p className="text-sm  text-gray-500">
                  Employee Name: {item.name}{" "}
                </p>
                {item?.slider?.showProducts[0]?.products.map((val) => {
                  return (
                    <div>
                      <div className="mt-2">
                        <h2 className="text-lg font-bold text-gray-700">
                          {" "}
                          {val.productName}{" "}
                        </h2>
                        <p className="text-sm text-gray-500 ">
                          Size : {val.productSize}{" "}
                        </p>
                        <p className="text-sm text-gray-500 ">
                          Price : €{val.productPrice}{" "}
                        </p>
                        <p className="text-sm text-gray-500 ">
                        Qty : {val.productQuantity}
                        </p>
                      </div>
                     
                    </div>
                  );
                })}
                <p className="text-sm font-bold  mt-5 ">
                  Total Billed : €{item.bill}{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PastOrderTab;
