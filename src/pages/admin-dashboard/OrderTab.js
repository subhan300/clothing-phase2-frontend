import React, { useState, useEffect } from "react";
import { useGetAllOrdersQuery} from "../../apis/companyManager/index";
import Table from "../../components/table/Table";
import { globalFunctions } from "../../global-functions/GlobalFunctions";
import { tableStructureData } from "../../utils/TableStructureData";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux-slice/UserSliceAuth";
import Drawer from "../../components/drawer/Drawer";
function PastOrderTab() {
  let { data, error, isLoading ,refetch} = useGetAllOrdersQuery();
  const dispatch=useDispatch();
  
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRow,setSelectedRow]=useState({orderInfo:[]});

  
  const refresh = () => {
    refetch();
    dispatch(showPopup({ state: true, message: "Latest Data is Updated " }));
  };
  const openDrawer = (row) => {
    setShowDrawer(!showDrawer);
    setSelectedRow(row);
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
    if (data != undefined && data.length !=0) {
      console.log("past ",data)
      let tableDataConvert =
        globalFunctions.orderTableDataAdminFormatConverter(data);
      tableDataConvert= sortByDateAscending(tableDataConvert)
      console.log("past orders", tableDataConvert);
      setTableData(tableDataConvert);
    }
  }, [data,isLoading]);

  return (
    <div>
      <Table
        tableData={tableData}
        setTableData={setTableData}
        columns={tableStructureData.adminOrderColumns}
        tableTitle="Order Details"
        hideButtons={false}
        refresh={refresh}
        openDrawer={openDrawer}

      ></Table>

        <Drawer
        show={showDrawer}
        setShow={setShowDrawer}
        selectedRow={selectedRow}
      />
    </div>
  );
}

export default PastOrderTab;
