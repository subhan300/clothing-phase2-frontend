import React, { useEffect, useState } from "react";
import { useGetAllManagersQuery } from "../../apis/companyManager/index";
import Table from "../../components/table/Table";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux-slice/UserSliceAuth";

function ManagerTabAdmin() {
  const { data, error, isLoading, refetch } = useGetAllManagersQuery();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);

  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };

  useEffect(() => {
    // console.log("get",getLocalStorageCartData)
    if (data != undefined && data.length != 0) {
      let tableDataConvert =
        globalFunctions.managerTableDataFormatConverter(data);
      setTableData(tableDataConvert);
    }
  }, [data, isLoading]);

  return (
    <div>
      <Table
        tableData={tableData}
        setTableData={setTableData}
        columns={tableStructureData.managerColumns}
        tableTitle="Employee Details"
        refresh={refresh}
      />
    </div>
  );
}

export default ManagerTabAdmin;
