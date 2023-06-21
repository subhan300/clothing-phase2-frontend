import { Button, Input, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useEditManagerMutation, useGetAllManagersQuery, useGetManagersByCompanyIdQuery } from "../apis";
import { adminEditGlobalFunctions } from "../global-functions/adminEditGlobalFunction";
import { useDispatch } from "react-redux";
import { errorPopup,showPopup } from "../redux-slice/UserSliceAuth";

export default function ManagerEditComponent({selected}) {
  console.log("selected", selected)
  const { data, error, isLoading, refetch } = useGetManagersByCompanyIdQuery({companyId:selected.record._id});
  const [editManager, response] = useEditManagerMutation();
  const [deleteManager, deleteResponse] = useEditManagerMutation();
  const [managers, setManagers] = useState([]);
  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState({
    state: false,
    record: {},
    updatedValues: {},
  });
  const handleSave = (record) => {
    let values = { ...editingRow.updatedValues };
    editManager({ payload: values, id: editingRow.record._id })
      .unwrap()
      .then((res) => {
        const removeManagers = managers.filter(
          (val) => val._id !== editingRow.record._id
        );

        const sortedData = adminEditGlobalFunctions.sortData(
          [...removeManagers, { ...res.result, SNO: editingRow.record.SNO }],
          "SNO"
        );

        setManagers((prev) => sortedData);
        dispatch(showPopup({ state: true, message: "comany record updated" }));
      })
      .catch((error) => {
        dispatch(
          errorPopup({
            state: true,
            message: `Manager edit  not due to ${error}`,
          })
        );
      });
  };
  const handleEdit = (key, val, selectedRecord) => {
    // debugger;
    console.log("val", val, "selectedRecord", selectedRecord);
    const editRecord = { [key]: val };
    const updatedRecord = { ...editingRow.record, [key]: val };

    // setEditingRow((prev) => ({
    //   ...prev,
    //   state: true,
    //   updatedValues: editRecord,
    //   record: updatedRecord,
    // }));
    // setManagerUpdatedData(updatedRecord, selectedRecord);
  };
  const setManagerUpdatedData = (updatedRecord, selectedRecord) => {
    let filterManagers = managers.filter(
      (val) => val._id === selectedRecord._id
    )[0];
    filterManagers = { ...updatedRecord };
    const removeManagers = managers.filter(
      (val) => val._id !== selectedRecord._id
    );
    const sordtedData = adminEditGlobalFunctions.sortData(
      [...removeManagers, filterManagers],
      "SNO"
    );
    setManagers(sordtedData);
  };

  useEffect(() => {
    if (data) {
      const addSerialNoToData = adminEditGlobalFunctions.addSerialNo(data);
      console.log("data====",addSerialNoToData)
      setManagers(addSerialNoToData);
    }
  }, [isLoading]);

  return (
    <div>
      <Spin
        spinning={isLoading || deleteResponse.isLoading || response.isLoading}
      >
        <Table
          columns={adminEditGlobalFunctions.managerColumns(handleEdit,
            handleSave,
            editingRow,
            setEditingRow)}
          dataSource={data}
          pagination={false}
          rowKey="key"
          className="mt-2"
        />
      </Spin>
    </div>
  );
}
