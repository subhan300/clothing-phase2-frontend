import React, { useState, useEffect } from "react";
import {
  useGetBudgetRequestQuery,
  useActionBudgetRequestMutation,
} from "../../apis/companyManager/index";
import Table from "../../components/table/Table";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";

import { showPopup, errorPopup } from "../../redux-slice/UserSliceAuth";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const BudgetRequestTab = () => {
  const { data, error, isLoading, refetch } = useGetBudgetRequestQuery();
  const [actionBudgetRequest, response] = useActionBudgetRequestMutation();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [inputBudget, setInputBudget] = useState(0);

  const [inputSelectedResult, setInputSelectedResult] = useState("pending");
  const [budgetDecisionState, setBudgetDescisionState] = useState(0);
  const updatedInput = (selectedInput) => {
    console.log("selected Input", selectedInput);
    setInputBudget(selectedInput.value);
  };

  const addItem = (row) => {
    debugger
   if(budgetDecisionState !="0"){
    let budgetRequestActionData = {
      requestId: row.id,
      employeeId: row.employeeId,
      approvedAmount: inputBudget,
      status: budgetDecisionState,
    };

    actionBudgetRequest(budgetRequestActionData)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        dispatch(showPopup({ state: true, message: `${budgetDecisionState==1?"Budget Request Accepted":"Budget Request Rejected"} ` }));
      })
      .catch((error) => {
        dispatch(
          errorPopup({ state: true, message: "Try again or refresh page" })
        );
      });
   }else{
    dispatch(
      errorPopup({ state: true, message: "Approve Or Reject" })
    );
   }
  };

  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };

  const budgetDecisionF = (value, row) => {
    let status;
    if (value == 1) {
      status = "approved";
    } else {
      status = "rejected";
    }
    row.status = status;
    let data = [...tableData];
    let filterData = data.filter((val) => val.id != row.id);
    let tableDataConvert = [];
    //  if(filterData.length>0){
    //    tableDataConvert =
    //   globalFunctions.budgetRequestTableDataFormatConverter(filterData);
    //  }
    setTableData([row, ...filterData].sort((a, b) => a.SNO - b.SNO));
    setBudgetDescisionState(value);
  };

  useEffect(() => {
    // console.log("get",getLocalStorageCartData)

    if (data != undefined && data.length != 0) {
      let tableDataConvert =
        globalFunctions.budgetRequestTableDataFormatConverter(data);
      console.log(">>>>>>>>", tableDataConvert);
      setTableData(tableDataConvert);
      tableDataConvert.map((val) => {
        // setInputBudget(val.allocateBudget);
        setInputSelectedResult(val.select.result);
      });
    } else {
      setTableData([]);
    }
  }, [data]);
  return (
    <div>
      <Table
        tableData={tableData}
        setTableData={setTableData}
        columns={tableStructureData.budgetRequestColumns}
        tableTitle="Budget Requests"
        inputBudget={inputBudget}
        setInputBudget={setInputBudget}
        inputSelectedResult={inputSelectedResult}
        setInputSelectedResult={setInputSelectedResult}
        updatedInput={updatedInput}
        addItem={addItem}
        budgetDecisionF={budgetDecisionF}
        refresh={refresh}
        hideCounter={true}
        // updateBudgetF={budgetDecisionF}
      />
    </div>
  );
};

export default BudgetRequestTab;

// <tbody>
//             {filteredData.map((row) => (
//               <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
//                 <td scope="col" className="px-2 py-3">
//                   {row.id}
//                 </td>
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                   {row.name}
//                 </th>
//                 <td className="px-6 py-4">
//                   {row.budget}
//                 </td>
//                 <td className="px-6 py-4">
//                   <input type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" value={row.allocate} />
//                 </td>
//                 <td className="px-6 py-4">
//                   <label className="relative inline-flex items-center mb-5 cursor-pointer">
//                     <input type="checkbox" checked={row.action} className="sr-only peer" />
//                       <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                   </label>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
