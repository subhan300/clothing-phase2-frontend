import React, { useEffect, useState } from "react";
import {  useGetAllEmployeesQuery } from "../../apis/companyManager/index";
import Table from "../../components/table/Table";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux-slice/UserSliceAuth";
function EmployeesTab() {
  const { data, error, isLoading ,refetch} =  useGetAllEmployeesQuery();
  const dispatch=useDispatch();
  
  const [tableData, setTableData] = useState([]);

  
  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };
  useEffect(() => {
      // console.log("get",getLocalStorageCartData)
      if (data != undefined && data.length !=0) {
        let tableDataConvert = globalFunctions.employeeTableAdminDataFormatConverter(data);
        setTableData(tableDataConvert);
      }
  }, [data,isLoading]);

  return (
    <div>
      <Table
        tableData={tableData}
        setTableData={setTableData}
        columns={tableStructureData.employeeColumns}
        tableTitle="Employee Details"
        refresh={refresh}
      />
    </div>
  );
}

export default EmployeesTab;
